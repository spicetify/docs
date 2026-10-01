// Compares the commands documented in src/content/docs/cli/commands.md with
// the command tree of a spicetify binary, read from its recursive `--help`.
//
// Usage: node scripts/check-cli-commands.mjs <path-to-spicetify>
//        (or set SPICETIFY_BIN)
//
// A command path counts as documented when commands.md has either:
// - a heading made of one code span, such as ### `pkg update`
// - a line in a bash/sh/shell/console code block that starts with
//   `spicetify`, read word by word until the first token that is not a
//   lowercase command word (an option, <placeholder>, [optional], quoted
//   value or # comment). Write arguments in examples as placeholders so they
//   are not read as subcommands.
// A parent command (such as `pkg`) is covered when one of its subcommands is.

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const DOCS_PAGE = 'src/content/docs/cli/commands.md';

// Commands that are intentionally left out of the command reference.
// Add a reason next to each entry.
const ALLOWLIST = new Set([]);

// Top-level commands that only exist in the Linux build. When the binary is
// not a Linux build, documented paths under them are reported but not failed.
const LINUX_ONLY = new Set(['spotify']);

const COMMAND_WORD = /^[a-z][a-z0-9-]*$/;

function help(bin, args) {
  return execFileSync(bin, [...args, '--help'], {
    encoding: 'utf8',
    env: { ...process.env, NO_COLOR: '1' },
    timeout: 15_000,
  });
}

function subcommands(helpText) {
  const names = [];
  let inSection = false;
  for (const line of helpText.split('\n')) {
    if (/^(Sub)?[Cc]ommands:\s*$/.test(line)) {
      inSection = true;
      continue;
    }
    if (!inSection) continue;
    const match = /^ {2}(\S+)/.exec(line);
    if (!match) break;
    if (match[1] !== 'help') names.push(match[1].replace(/,$/, ''));
  }
  return names;
}

function cliCommands(bin) {
  const paths = new Set();
  const walk = (prefix) => {
    for (const name of subcommands(help(bin, prefix))) {
      const next = [...prefix, name];
      paths.add(next.join(' '));
      walk(next);
    }
  };
  walk([]);
  if (paths.size === 0) {
    throw new Error(`${bin} --help listed no commands`);
  }
  return paths;
}

function documentedCommands(markdown) {
  const paths = new Set();
  let fence = null;
  for (const line of markdown.split('\n')) {
    const fenceMatch = /^\s*(`{3,}|~{3,})\s*(\S*)/.exec(line);
    if (fenceMatch) {
      if (fence === null) {
        fence = { marker: fenceMatch[1], lang: fenceMatch[2].toLowerCase() };
      } else if (line.trim().startsWith(fence.marker)) {
        fence = null;
      }
      continue;
    }
    if (fence === null) {
      const heading = /^#{2,6}\s+`([^`]+)`\s*$/.exec(line);
      if (heading) {
        const words = heading[1].trim().replace(/^spicetify\s+/, '');
        paths.add(words.split(/\s+/).join(' '));
      }
      continue;
    }
    if (!['bash', 'sh', 'shell', 'console'].includes(fence.lang)) continue;
    const tokens = line
      .trim()
      .replace(/^\$\s+/, '')
      .split(/\s+/);
    if (tokens[0] !== 'spicetify') continue;
    const words = [];
    for (const token of tokens.slice(1)) {
      if (!COMMAND_WORD.test(token)) break;
      words.push(token);
    }
    if (words.length > 0) paths.add(words.join(' '));
  }
  return paths;
}

function main() {
  const bin = process.argv[2] ?? process.env.SPICETIFY_BIN;
  if (!bin) {
    console.error(
      'Usage: node scripts/check-cli-commands.mjs <path-to-spicetify>',
    );
    process.exit(2);
  }

  const cli = cliCommands(path.resolve(bin));
  const docs = documentedCommands(
    readFileSync(path.resolve(process.cwd(), DOCS_PAGE), 'utf8'),
  );
  const isLinuxBuild = [...LINUX_ONLY].every((name) => cli.has(name));

  const covered = (command) =>
    [...docs].some((doc) => doc === command || doc.startsWith(`${command} `));
  const missing = [...cli].filter(
    (command) => !covered(command) && !ALLOWLIST.has(command),
  );
  const stale = [];
  const unverifiable = [];
  for (const doc of docs) {
    if (cli.has(doc)) continue;
    if (!isLinuxBuild && LINUX_ONLY.has(doc.split(' ')[0])) {
      unverifiable.push(doc);
    } else {
      stale.push(doc);
    }
  }

  for (const entry of ALLOWLIST) {
    if (!cli.has(entry)) {
      console.warn(`warning: allowlisted command "${entry}" no longer exists`);
    } else if (covered(entry)) {
      console.warn(`warning: allowlisted command "${entry}" is documented`);
    }
  }
  if (unverifiable.length > 0) {
    console.warn(
      `warning: not a Linux build, skipped Linux-only commands: ${unverifiable.sort().join(', ')}`,
    );
  }

  console.log(
    `CLI commands: ${cli.size}, documented in ${DOCS_PAGE}: ${docs.size}`,
  );
  if (missing.length > 0) {
    console.error(`\nMissing from ${DOCS_PAGE}:`);
    for (const command of missing.sort())
      console.error(`  spicetify ${command}`);
  }
  if (stale.length > 0) {
    console.error(`\nDocumented but not in the CLI:`);
    for (const command of stale.sort()) console.error(`  spicetify ${command}`);
  }
  if (missing.length > 0 || stale.length > 0) process.exit(1);
  console.log('CLI command reference is in sync.');
}

main();
