// Compares the top-level members of `declare namespace Spicetify` in the
// CLI's globals.d.ts with the API wrapper reference.
//
// Usage: node scripts/check-api-wrapper.mjs [path-or-url-to-globals.d.ts]
//        (defaults to the v3-beta branch of spicetify/cli)
//
// Members are the namespaces, functions, classes, enums and consts declared
// directly in the namespace. Type aliases and interfaces are types and are
// not checked. Members tagged @deprecated and members whose name starts with
// an underscore are skipped.
//
// A member counts as documented when, under development/api-wrapper (outside
// types/):
// - a page's frontmatter title is the member name, such as `title: Player`
// - a heading is a code span naming it, such as ## `Spicetify.Daemon`
// - a table row's first cell names it, such as | `Spicetify.React` | ... |
// Pages and headings that name something globals.d.ts does not declare fail
// as stale. Pages under legacy/ live outside this directory.

import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const DEFAULT_SOURCE =
  'https://raw.githubusercontent.com/spicetify/cli/v3-beta/globals.d.ts';
const DOCS_DIR = 'src/content/docs/development/api-wrapper';
const INDEX_PAGES = new Set(['index.md', 'modules.md']);

// Members that are intentionally left out of the reference.
const ALLOWLIST = new Map([
  ['test', 'debug helper that logs missing wrapper members'],
]);

async function readSource(source) {
  if (!/^https?:\/\//.test(source)) return readFileSync(source, 'utf8');
  const response = await fetch(source);
  if (!response.ok) {
    throw new Error(`Fetching ${source} failed: ${response.status}`);
  }
  return response.text();
}

function isDeprecated(node) {
  return ts.getJSDocTags(node).some((tag) => tag.tagName.text === 'deprecated');
}

function declaredMembers(sourceText) {
  const file = ts.createSourceFile(
    'globals.d.ts',
    sourceText,
    ts.ScriptTarget.Latest,
    true,
  );
  const members = new Map();
  const add = (name, node) => {
    const deprecated = isDeprecated(node);
    const previous = members.get(name);
    members.set(name, {
      deprecated: previous ? previous.deprecated && deprecated : deprecated,
    });
  };

  let found = false;
  for (const statement of file.statements) {
    if (
      !ts.isModuleDeclaration(statement) ||
      statement.name.text !== 'Spicetify' ||
      !statement.body ||
      !ts.isModuleBlock(statement.body)
    ) {
      continue;
    }
    found = true;
    for (const node of statement.body.statements) {
      if (ts.isVariableStatement(node)) {
        for (const declaration of node.declarationList.declarations) {
          if (ts.isIdentifier(declaration.name)) {
            add(declaration.name.text, node);
          }
        }
      } else if (
        (ts.isFunctionDeclaration(node) ||
          ts.isClassDeclaration(node) ||
          ts.isEnumDeclaration(node) ||
          ts.isModuleDeclaration(node)) &&
        node.name
      ) {
        add(node.name.text, node);
      }
    }
  }
  if (!found) throw new Error('No `declare namespace Spicetify` block found');
  return members;
}

function markdownFiles(dir) {
  return readdirSync(dir, { recursive: true })
    .map(String)
    .filter(
      (file) => /\.mdx?$/.test(file) && !file.startsWith(`types${path.sep}`),
    );
}

function documentedMembers(root) {
  const pages = new Map();
  const headings = new Map();
  const tableRows = new Map();
  const memberRef = /^`Spicetify\.([A-Za-z_$][\w$]*)[^`]*`$/;

  for (const file of markdownFiles(path.join(root, DOCS_DIR))) {
    const where = path.join(DOCS_DIR, file);
    const text = readFileSync(path.join(root, DOCS_DIR, file), 'utf8');

    if (!INDEX_PAGES.has(file)) {
      const frontmatter = /^---\n([\s\S]*?)\n---/.exec(text)?.[1] ?? '';
      const title = /^title:\s*['"]?(.+?)['"]?\s*$/m.exec(frontmatter)?.[1];
      if (title) pages.set(title.replace(/^Spicetify\./, ''), where);
    }

    let inFence = false;
    for (const line of text.split('\n')) {
      if (/^\s*(`{3,}|~{3,})/.test(line)) {
        inFence = !inFence;
        continue;
      }
      if (inFence) continue;
      const heading = /^#{1,6}\s+(`[^`]+`)\s*$/.exec(line);
      const headingMember = heading && memberRef.exec(heading[1]);
      if (headingMember) headings.set(headingMember[1], where);
      const cell = /^\|\s*(`[^`]+`)\s*\|/.exec(line);
      const cellMember = cell && memberRef.exec(cell[1]);
      if (cellMember) tableRows.set(cellMember[1], where);
    }
  }
  return { pages, headings, tableRows };
}

async function main() {
  const source = process.argv[2] ?? DEFAULT_SOURCE;
  const members = declaredMembers(await readSource(source));
  const { pages, headings, tableRows } = documentedMembers(process.cwd());
  const documented = (name) =>
    pages.has(name) || headings.has(name) || tableRows.has(name);

  const skipped = [];
  const missing = [];
  for (const [name, { deprecated }] of members) {
    if (documented(name)) continue;
    if (name.startsWith('_') || ALLOWLIST.has(name)) continue;
    if (deprecated) skipped.push(name);
    else missing.push(name);
  }

  const stale = [];
  for (const [kind, entries] of [
    ['page', pages],
    ['heading', headings],
  ]) {
    for (const [name, where] of entries) {
      if (!members.has(name)) stale.push(`${name} (${kind} in ${where})`);
    }
  }

  for (const name of ALLOWLIST.keys()) {
    if (members.has(name) && documented(name)) {
      console.warn(`warning: allowlisted member "${name}" is documented`);
    }
  }
  if (skipped.length > 0) {
    console.log(`Skipped deprecated members: ${skipped.sort().join(', ')}`);
  }

  console.log(`Spicetify members in ${source}: ${members.size}`);
  if (missing.length > 0) {
    console.error(`\nUndocumented in ${DOCS_DIR}:`);
    for (const name of missing.sort()) console.error(`  Spicetify.${name}`);
  }
  if (stale.length > 0) {
    console.error('\nDocumented but not declared in globals.d.ts:');
    for (const entry of stale.sort()) console.error(`  Spicetify.${entry}`);
  }
  if (missing.length > 0 || stale.length > 0) process.exit(1);
  console.log('API wrapper reference is in sync.');
}

await main();
