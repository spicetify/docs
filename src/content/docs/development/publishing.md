---
title: Publishing a module
description: Submit a module to the Spicetify store, and what gets checked before it merges.
sidebar_position: 3
---

The store reads one registry: `vault.json` in [spicetify/modules](https://github.com/spicetify/modules). Your code stays in your own repository under your own license; what you submit is the entry that points at it. That is what makes every module in the store reviewable, checksummed and revocable.

## Submit

Build, pack, upload the zip to your own release, then record the entry:

```bash
spicetify-kit build
spicetify-kit pack dist/my-module@1.0.0
# upload my-module@1.0.0.zip to your release, then:
spicetify-kit vault add dist/my-module@1.0.0 --artifact <url> --zip my-module@1.0.0.zip
```

That writes `vault/my-module.json`, one file holding your module and nothing else. Open a pull request with it.

Your `metadata.json` needs four things the registry will not accept an entry without:

| Field | Why |
| --- | --- |
| `preview` | an absolute https URL to a screenshot. Store cards are artwork-first, and an entry with no preview renders no card at all |
| `repository` | an https URL to the source |
| `license` | an SPDX identifier, shown next to the install button |
| `name`, `version` | must match the entry, and the id is permanent |

## Automate it

Call the publish action from your own release workflow instead:

```yaml
- uses: spicetify/modules/.github/actions/submit@main
  with:
    dist: dist/my-module@1.0.0
    release-tag: ${{ github.ref_name }}
    token: ${{ secrets.SPICETIFY_SUBMIT_TOKEN }}
```

The token is one with `public_repo` scope on your own account: the action pushes a branch to your fork and opens the pull request with it. Leave it out and the action prints the exact entry for you to submit by hand, which is a fine way to start.

## What gets checked

Nothing in the pull request is taken on trust. CI downloads the artifact and checks the entry against what is actually inside it:

- the checksum matches the bytes, and the artifact is served over https
- the `metadata.json` inside the artifact declares the same id and version as the entry
- the store card matches the artifact: an entry cannot claim a description, repository or license the code does not declare, and cannot invent fields either
- the artifact was produced by the toolchain rather than assembled by hand
- every dependency it names is already in the registry
- the zip contains no absolute paths, no `..` traversal and no symlinks
- **published versions are immutable**: an existing version cannot be rewritten or removed, and a new one has to be higher than every published one
- **an id stays with the account that first published it**: later artifacts must come from the same owner

A red check is something to fix, not a conversation to have. First submission gets a human review as well; after that a green check is the gate.

## Updating

Same flow with a new version key. The old versions stay exactly as they are, which is what makes rolling back possible for the people who installed them.

## After the merge

1. CI rebuilds the aggregate registry, and your module appears in the store.
2. Your artifact is copied to a mirror release in the registry repository and the mirror URL is appended to your entry. Installers try your host first and fall back to the mirror, so a release asset that disappears later does not break every install of that version.

## Choosing an id

Ids are global and permanent. The first submission binds the id to your account and nothing else can publish it afterwards, so pick something you would be happy to keep. Make it describe what the module does; suffix themes with `-theme` and snippet collections with `-snippets`.

## Snippets

A CSS-only module small enough to have no artifact can ship inline in the registry entry. Inline entries install with no download, so they are restricted to `.css` files: anything executable arrives as a checksummed zip.

## Distributing outside the store

You do not have to use the store. Anyone can install a packed module directly:

```bash
spicetify pkg install my-module https://example.com/my-module@1.0.0.zip
```

That bypasses the registry, so nothing verifies those bytes and the CLI tells the user as much. It is the right path for private builds, betas and testing, and the wrong one for anything you want people to find.
