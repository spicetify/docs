---
title: CLI Reference
description: The Spicetify v3 command line, and the handful of commands you actually need.
sidebar_position: 1
category_index: true
---

The v3 CLI patches Spotify, manages modules, and controls the daemon. Day to day you need two commands.

```bash
spicetify apply     # patch Spotify (also the fix for anything that looks wrong)
spicetify restore   # put stock Spotify back
```

Everything else is for a specific situation. [Commands](/docs/cli/commands) documents all of them.

## First run

```bash
spicetify apply
```

There is no backup step and no config generation step to remember. `apply` stops Spotify, patches it, sets up the daemon, registers the `spicetify://` handler and starts Spotify again. The backup is Spotify's own archive renamed in place, which is why `restore` needs nothing from you.

## Getting help

Every command prints its own usage, and that output is the authority if this page and the binary ever disagree:

```bash
spicetify --help
spicetify pkg --help
spicetify pkg install --help
```

## Global options

These work on any command:

| Option | Meaning |
| --- | --- |
| `-m`, `--mirror [true\|false]` | Mirror mode for this invocation |
| `--spotify-data-dir <path>` | Where Spotify's data folder is |
| `--spotify-exec <path>` | Which Spotify binary to use |
| `--offline-bnk-dir <path>` | Where the offline cache is |
| `-h`, `--help` | Print help |
| `-V`, `--version` | Print the version |

The path options exist because auto-detection can be wrong on unusual installs. They override [`config.toml`](/docs/modules/config-file) for that one command without changing it.

## Do not mix v2 and v3

The two CLIs keep their backups differently and must never be pointed at the same client. Both refuse when they detect the other's work, but restore with whichever one you applied with before switching.
