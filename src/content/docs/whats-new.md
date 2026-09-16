---
title: What changes in v3
description: How Spicetify v3 differs from v2, and what to do with an existing v2 install.
sidebar_position: 2
---

v3 is a different model, not a faster v2. The short version: one kind of add-on instead of four, a store inside Spotify instead of a CLI-only flow, and a daemon that can repair the client after Spotify updates.

## Modules replace themes, extensions, custom apps and snippets

In v2 you managed four things in four ways: a theme folder, an extension `.js`, a custom app directory, and CSS snippets, each wired up through `config-xpui.ini` and re-applied by hand.

In v3 all four are the same thing, a **module**: a directory with a `metadata.json`, optionally some JavaScript, optionally some CSS, and declared dependencies on the standard library or other modules. Reusable libraries are modules too. One format, one install path, one lifecycle. A module can add a button, register a whole route, restyle the client, or all three.

What that buys you: modules can be enabled, disabled, updated and reloaded at runtime, so most changes take effect without restarting Spotify. Themes and colour schemes switch live too. Each module owns the UI, styles, listeners and other state it creates, and removes them again when it unloads. Ordinary load failures are reported per module so an unrelated module does not have to take the client with it.

## Dependencies have versions and an order

Modules declare compatible dependency ranges in `metadata.json`. The store resolves those ranges and installs or updates dependencies before the modules that use them; the loader follows the same dependency order. Missing or incompatible dependencies are reported rather than leaving authors to coordinate load order by hand.

## A store inside Spotify

The [Marketplace](/docs/legacy/customization/marketplace) was a custom app you installed separately. In v3 the store ships with Spicetify, opens from the **Module Store** button in Spotify's top bar, and is the normal way to find and install things. The CLI (`spicetify pkg`) is the equivalent path for people who prefer a terminal.

Every module in the store comes from one registry, and every entry in it was checked before it merged: the artifact is downloaded and re-hashed, published versions can never be rewritten, and a module id stays with the account that first published it. Installs verify the checksum before unpacking.

## Spotify updates are recoverable

In v2, Spotify updating itself left you with a stock client until you re-ran `spicetify backup apply`, and often waiting for a new Spicetify release that understood the new build.

v3 installs a small daemon that notices a stock client and normally re-applies after Spotify exits. Support for a new Spotify build no longer needs a new Spicetify release either: semantic classmaps are distributed independently and fetched per apply. A compatible patch release can inherit the previous map after verification, while a genuinely changed client only needs a new map rather than a new CLI binary. When something is not supported yet, the client reports the limitation instead of silently applying an unrelated map.

Spicetify can also pin the installed client. macOS has an experimental one-step
**Update & Apply** transaction; Windows and Linux use the manual flow. See
[Spotify updates](/docs/spotify-updates) for the platform boundaries and
recovery commands.

## A module developer workflow

`npm create spicetify-module` scaffolds a typed project. The kit can hot-push a build into a running Spotify client in about a second, and stdlib provides shared registers for routes, settings, menus, top-bar and playbar controls, panels and overlays. UI primitives give modules native-looking controls without copying Spotify's generated classes, while semantic `MAP.*` references let one artifact target multiple Spotify builds.

Classic themes can start from the theme template or migrate `color.ini` and `user.css` with `spicetify-kit from-theme`. Existing v2 extensions have a separate [migration guide](/docs/development/migrating-v2-extensions).

If a port needs repeated DOM polling, copied class hashes, private webpack searches or another workaround that feels hacky, [report the missing capability](https://github.com/spicetify/cli/issues). The right fix may be a new typed client capability, register, primitive or classmap path that every module can share.

## Going back is cheap

Installed versions are kept side by side. If an update misbehaves:

```bash
spicetify pkg enable my-module@1.2.0
spicetify apply
```

No hunting for an old download.

## Command changes

| v2 | v3 |
| --- | --- |
| `spicetify backup apply` | `spicetify apply` |
| `spicetify restore backup apply` | `spicetify apply` |
| `spicetify update` | `spicetify self-update` |
| `spicetify upgrade` | `spicetify self-update` |
| `spicetify config <key> <value>` | edit `config.toml` |
| `spicetify config-dir` | `spicetify config open` |
| `spicetify enable-devtools` | `spicetify dev` |
| `spicetify watch` | `spicetify-kit dev <module>` |
| `spicetify auto` | not needed; the daemon re-applies |
| Marketplace | the built-in store, or `spicetify pkg` |

`spicetify restore` still restores stock Spotify, and `spicetify path` still prints where things live.

## Upgrading from v2

v3 is a reinstall, not an in-place upgrade, and the two must never share a client.

1. **Restore with v2 first.** Run `spicetify restore` with the v2 binary you have installed. This matters: v2 consumes `xpui.spa` while v3 renames it, so v3 cannot undo a v2 apply and vice versa.
2. **Install v3** ([getting started](/docs/getting-started)).
3. **Apply**: `spicetify apply`.
4. **Reinstall what you had** from the store. Your v2 themes and extensions do not carry over: they are a different format, and most popular ones already exist as modules.

Your v2 config (`config-xpui.ini`) is left alone. v3 reads `config.toml` and ignores it, so nothing is lost if you go back.

## What is not in v3 yet

- **Source transforms.** v2 extensions that rewrote the client bundle are off by default; features built on that degrade.
- **Spicetify Creator.** Superseded by [`spicetify-kit`](/docs/development/building-a-module). The [old guides](/docs/legacy/spicetify-creator/the-basics) stay for v2.

The [v2 documentation](/docs/legacy) remains available for as long as v2 is the released binary.
