---
title: CLI reference
description: How the Spicetify v3 command line works, its global options, and the two commands you use most.
sidebar_position: 1
category_index: true
---

The `spicetify` command patches Spotify, manages modules, and controls the daemon. You need two commands most of the time:

```bash
spicetify apply     # patch Spotify, and the first fix for anything that looks wrong
spicetify restore   # put stock Spotify back
```

On a new install, `apply` does the whole setup, with no separate backup or config step. Running `spicetify` with no command opens an interactive menu with the common actions. [Commands](/docs/cli/commands) lists every command.

## Getting help

Every command prints its own usage with `--help`, as in `spicetify pkg install --help`. If this page and the binary disagree, the binary is right.

## Global options

These options work on any command:

| Option | Meaning |
| --- | --- |
| `-m`, `--mirror [true\|false]` | Mirror mode for this command. `--mirror` alone means `true`. |
| `--spotify-data-dir <path>` | Spotify's install folder, the one that holds `Apps/` |
| `--spotify-exec <path>` | The Spotify executable |
| `--offline-bnk-dir <path>` | The folder that holds Spotify's `offline.bnk` |
| `-h`, `--help` | Print help |
| `-V`, `--version` | Print the version |

Use the path options when auto-detection picks the wrong Spotify. They override [`config.toml`](/docs/modules/config-file) for one command and don't change the file, as in `spicetify --spotify-exec /opt/spotify/spotify apply`.

## Coming from v2

If Spicetify v2 patched your client, `apply` and `restore` first put Spotify back from v2's backup, as [upgrade from v2](/docs/whats-new#upgrade-from-v2) describes.
