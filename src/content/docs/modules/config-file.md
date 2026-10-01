---
title: Configuration reference
description: Every key in Spicetify v3's config.toml, and the flags that override them.
sidebar_position: 2
---

Spicetify v3 keeps its settings in `config.toml`. v3 has no `spicetify config <key> <value>` command, so you edit the file. Every key has a default, and a missing or empty file is valid.

## Where the file is

The file is in Spicetify's config folder:

- macOS: `~/.config/spicetify`
- Linux: `$XDG_CONFIG_HOME/spicetify`, usually `~/.config/spicetify`
- Windows: `%LOCALAPPDATA%\Spicetify`, or a portable install's `config` folder when it exists

`spicetify path` prints the folder Spicetify uses, and `spicetify config open` opens it.

## Keys

This example shows each key with its default:

```toml
daemon = true
auto_update = true
mirror = false

# block_spotify_updates = true
# spotify_data_dir = "/path/to/spotify"
# spotify_exec = "/path/to/spotify/binary"
# offline_bnk_dir = "/path/to/folder/with/offline.bnk"
```

### `daemon`

Whether `apply` installs and starts the [daemon](/docs/cli/commands#daemon). With `daemon = false`, you run `spicetify apply` yourself after each Spotify update.

### `auto_update`

Whether the daemon installs new Spicetify releases once a day. Only an install in the official installer's folder updates itself. [`spicetify auto-update`](/docs/cli/commands#auto-update) and Manager's **Install Spicetify updates automatically** setting change this key.

### `mirror`

Mirror mode writes the patched client to `apps/` in the config folder and leaves Spotify's `xpui.spa` in place. A Microsoft Store install always uses it. The `--mirror` flag sets it for one command.

### `block_spotify_updates`

Whether Spotify's own updater stays blocked. The key is absent until you run `spicetify spotify-updates block` or `unblock`. A Spotify update removes the block, and `apply` restores it when the key is `true`. See [Spotify updates](/docs/spotify-updates).

### `spotify_data_dir`, `spotify_exec`, `offline_bnk_dir`

Spotify's install folder (the one with `Apps/`), its executable, and the folder with `offline.bnk`. Spicetify detects all three, so set them only for a non-standard install. With only `spotify_exec` set, Spicetify uses the executable's folder as the data folder. If a configured `spotify_exec` or `spotify_data_dir` doesn't exist, Spicetify warns and detects Spotify instead. `spicetify config` prints what it resolved.

## Overriding for one command

Each key except `daemon`, `auto_update`, and `block_spotify_updates` has a [global option](/docs/cli#global-options) that overrides the file for one command without changing it, as in `spicetify --mirror true apply`.

## Resetting

[`spicetify init`](/docs/cli/commands#init) writes a new `config.toml` with defaults and the detected Spotify paths. It also removes every installed module.

## What happened to `config-xpui.ini`

v3 doesn't read or change v2's `config-xpui.ini`, and has no keys that list themes and extensions, because the CLI and the Module Store track installed modules. For v2's keys, see [the v2 reference](/docs/legacy/customization/config-file).
