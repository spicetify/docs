---
title: Publishing a module
description: Submit a module to the Module Store, release new versions, and know what CI checks.
sidebar_position: 3
---

The Module Store and `spicetify pkg` read one registry, `vault.json` in [spicetify/modules](https://github.com/spicetify/modules). You keep your source and release files in your own repository and submit an entry that points at them. A module in Spicetify's maintained collection lives in that repository instead (see [Modules in the spicetify/modules repository](#modules-in-the-spicetifymodules-repository)).

## Prepare the metadata

The registry rejects an artifact whose `metadata.json` lacks any of these fields:

| Field | Requirement |
| --- | --- |
| `preview` | An absolute https URL to a screenshot. The store hides entries without one, with no error. |
| `repository` | An https URL to the source. On GitHub, its owner must be the account that hosts the artifact. |
| `license` | An SPDX identifier, shown next to the install button |
| `name`, `version` | Must match the entry |

The id in `name` is global and permanent, and the first submission binds it to your account. Make it describe what the module does, and end theme ids with `-theme` and snippet collections with `-snippets`.

## Submit a module

A submission is a pull request to spicetify/modules that adds one file, `vault/<id>.json`. To create it:

1. Set `version` in `metadata.json`.
2. [Build and pack](/docs/development/building-a-module#build-and-sideload) the module. Rebuild after every metadata change, because the next steps read `dist/`.
3. Upload `my-module@1.0.0.zip` to a release in your repository.
4. In a clone of your fork of spicetify/modules, write the entry:

   ```bash
   npx spicetify-kit vault add path/to/dist/my-module@1.0.0 \
     --artifact https://github.com/you/my-module/releases/download/v1.0.0/my-module@1.0.0.zip \
     --zip path/to/my-module@1.0.0.zip
   ```

   This writes `vault/my-module.json`, or the path you pass to `--vault`. Without `--zip`, the kit downloads the artifact to compute its sha256.
5. Commit that file and open a pull request.

The entry holds the store card, copied from the built `metadata.json`, and one key per version with the artifact URL and checksum. To change the card, edit `metadata.json` and rebuild. Never edit `vault.json`, which CI builds from the `vault/` files.

## Automate the submission

The `spicetify/actions/publish` action packs the build, uploads the zip, and opens the pull request. Add it to your release workflow after the step that runs `npm run build`:

```yaml
- uses: spicetify/actions/publish@v1
  with:
    dist: dist/my-module@1.0.0
    release-tag: ${{ github.ref_name }}
    token: ${{ secrets.SPICETIFY_SUBMIT_TOKEN }}
```

With `release-tag`, the action uploads the zip to that release with the workflow token, which needs `contents: write`. To host the zip yourself, pass `artifact: <url>` instead. `token` is a personal token with `public_repo` scope, which the action uses to fork spicetify/modules, push a branch, and open the pull request. Without it, the action prints the entry for you to submit by hand.

## What CI checks

CI downloads the artifact and checks the entry against its contents:

- The checksum matches the bytes, and the artifact URL is https.
- The artifact's `metadata.json` has the fields in [Prepare the metadata](#prepare-the-metadata).
- The card claims nothing the artifact's metadata doesn't declare.
- The artifact has the `spicetify-module.json` file `spicetify-kit build` writes.
- Every dependency is already in the registry.
- The zip has no absolute paths, no `..` segments, and no symlinks.
- Published versions are immutable, and a new version is higher than every published one.
- Later artifacts come from the account that first published the id.

A maintainer reviews your first submission. After that, a passing check is enough to merge.

## Release a new version

Each release adds a version key, and earlier versions stay so users can roll back. Repeat the submission steps with a higher `version`, running `vault add` against the same `vault/my-module.json`. It adds the new key, refreshes the card, and refuses to change the checksum of a version already in the file.

## After the merge

CI rebuilds `vault.json` and commits it, and your module appears in the store. CI also copies your artifact to a `mirror/<id>` release in spicetify/modules and appends that URL to the entry. Installers try your URL first, so a release file you delete later doesn't break installs.

[Updates](/docs/modules#updates) covers how users get the new version. For private builds and betas, users can install a packed zip from a URL, which skips the registry and its checks (see [from the terminal](/docs/modules#from-the-terminal)).

## Modules in the spicetify/modules repository

Modules under `modules/` in spicetify/modules use pnpm scripts from the repository root:

```bash
pnpm new my-module          # scaffold modules/my-module
pnpm dev modules/my-module  # run the dev loop
pnpm verify my-module       # build, then run every check and the module's tests
```

You don't pack, upload, or write a vault entry for these. When a version bump lands on `main`, the release workflow tags the module, creates its GitHub release, and writes its vault entry, in dependency order.

The bump goes in the same pull request as the change, because CI fails a change to a module whose current version is already published. Run one of these and commit the `metadata.json` files it writes:

- `node scripts/release.ts autobump` sets each changed module's level from its conventional commits (`feat` is minor, `!` or `BREAKING` is major, the rest are patch). It also raises the range in each dependent module and bumps that module too.
- `node scripts/release.ts bump <id> <major|minor|patch>` bumps one module.

These modules inherit the repository's license, so they don't set `license`.

## CSS snippets

A stylesheet-only module can ship inline in its vault entry, with no artifact. In a clone of spicetify/modules, run:

```bash
node scripts/vault.ts snippet <name> --css <file> --preview <url> \
  [--author <name>] [--github <user>] [--description <text>]
```

Inline entries install with no download, so they can only contain `.css` files.

