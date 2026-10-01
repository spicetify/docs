---
title: What changes in v3
description: How Spicetify v3 differs from v2, and how to upgrade an existing v2 install.
sidebar_position: 2
---

Spicetify v3 has one kind of add-on, the module, and you install modules from a store inside Spotify. A daemon patches Spotify again after it updates. Upgrading from v2 takes one `apply` (see [upgrade from v2](#upgrade-from-v2)).

## Modules replace themes, extensions, custom apps, and snippets

In v2, themes, extensions, custom apps, and CSS snippets each had their own folder and `config-xpui.ini` entry. In v3, all four are modules. A module is a folder with a `metadata.json`, optional JavaScript and CSS, and the dependencies it needs, such as the standard library. Libraries are modules too.

You can enable, disable, update, and reload modules while Spotify runs, and most changes, including theme switches, need no restart. Each module removes the UI, styles, and listeners it created when it unloads. If a module fails to load, Spicetify reports it for that module and keeps loading the rest.

Each module declares version ranges for its dependencies, which the Module Store installs and the loader loads first. Spicetify keeps installed versions side by side, so you can [roll back](/docs/modules#from-the-terminal) by enabling an earlier one.

## The Module Store is built in

In v2, the [Marketplace](/docs/legacy/customization/marketplace) was a custom app you installed separately. v3 installs the Module Store with Spicetify, in Spotify's top bar, and `spicetify pkg` does the same from a terminal. Every module comes from one checksummed registry, described in [the Module Store](/docs/modules#the-module-store). A module ID stays with the account that first published it.

## Spotify updates no longer leave a stock client

In v2, a Spotify update left you with a stock client until you ran `spicetify backup apply`, and often until a Spicetify release supported the new build.

In v3, the daemon notices a stock client and applies Spicetify again. Support for a new Spotify build comes from classmaps, which Spicetify downloads on each apply, so it doesn't need a new Spicetify release. If no classmap exists for your exact build, Spicetify uses the newest one for an older patch of the same minor release and logs a warning. It never uses a map from another minor release. You can also block Spotify updates, and on macOS run Update & Apply (see [Spotify updates](/docs/spotify-updates)).

## Module development

`npm create spicetify-module` scaffolds a typed project, and `spicetify-kit dev` pushes each build into a running Spotify. `MAP.*` class references let one build run on several Spotify versions. `spicetify-kit from-theme` converts a classic theme into a module, and [porting a v2 extension](/docs/development/migrating-v2-extensions) covers extensions.

## Command changes

This table maps v2 commands to their v3 equivalents.

| v2 | v3 |
| --- | --- |
| `spicetify backup apply` | `spicetify apply` |
| `spicetify restore backup apply` | `spicetify apply` |
| `spicetify upgrade` | `spicetify self-update` |
| `spicetify config <key> <value>` | edit `config.toml` |
| `spicetify config-dir` | `spicetify config open` |
| `spicetify enable-devtools` | `spicetify dev` |
| `spicetify watch`, `spicetify update` | `spicetify-kit dev <module>` |
| `spicetify auto` | not needed, the daemon applies again |
| Marketplace | Module Store, or `spicetify pkg` |

`spicetify restore` and `spicetify path` work as before. The [command reference](/docs/cli/commands) lists every v3 command.

## Upgrade from v2

You don't need to restore with v2 first:

1. Install v3 (see [getting started](/docs/getting-started)).
2. Run `spicetify apply`. When it finds a client that v2 patched, it restores Spotify from v2's backup, then applies v3.
3. Install your modules again from the Module Store. v2 themes, extensions, and Marketplace snippets don't carry over, so install their v3 versions.

`apply` and `spicetify restore` look for v2's backup in its `Backup` folder: `~/.local/state/spicetify/Backup` on macOS and Linux, `%APPDATA%\spicetify\Backup` on Windows. They refuse before changing anything when the backup is for a different Spotify version than the one installed:

```text
Spotify was patched by Spicetify v2, but v2's backup at <path> is of Spotify <version>, not the installed <version>. Reinstall Spotify, then run spicetify apply again.
```

If there's no v2 backup, they stop with "This client was patched by another tool". In both cases, reinstall Spotify from its own installer, then run `spicetify apply`.

v3 doesn't read v2's `config-xpui.ini` and leaves it in place. To switch back to v2, see [going back to v2](/docs/uninstallation#going-back-to-v2).

## Not in v3 yet

Two v2 features have no full v3 equivalent:

- Source transforms are off by default, so v2 extensions that rewrote the client bundle lose those features.
- Spicetify Creator is replaced by [`spicetify-kit`](/docs/development/building-a-module). The [Creator guides](/docs/legacy/spicetify-creator/the-basics) remain for v2.

The [v2 documentation](/docs/legacy) is still available.
