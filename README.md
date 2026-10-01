# Spicetify docs

This repository is the source of [spicetify.app](https://spicetify.app), built with Astro. Pages are Markdown files in `src/content/docs`, and the sidebar is in `src/config/sidebar.ts`.

To run the site locally, install the dependencies with pnpm and start the dev server:

```bash
pnpm install
pnpm dev
```

To fix or add a page, open an issue or a pull request.

## Reference checks

Two scripts check that the reference pages match the code, and the `Reference checks` workflow runs them on every pull request and weekly:

- `pnpm run check:cli-commands <path-to-spicetify>` compares `src/content/docs/cli/commands.md` with the commands in the binary's `--help`. CI uses the Linux x86_64 build of the newest v3 release, which includes the Linux-only `spotify` commands.
- `pnpm run check:api-wrapper [path-or-url]` compares the `development/api-wrapper` pages with the members of `declare namespace Spicetify` in the CLI's `globals.d.ts`, fetched from the `v3-beta` branch by default.

The rules each check uses, and their allowlists, are at the top of the scripts in `scripts/`.
