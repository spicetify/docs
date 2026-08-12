---
title: Getting Started
description: Install Spicetify v3, patch Spotify, and add your first module.
sidebar_position: 1
---

Spicetify customizes the official Spotify desktop client. v3 is a rewrite: everything you add to Spotify (themes, extensions, whole apps) is a **module**, and you browse and install modules from a store inside Spotify itself.

If you are coming from v2, read [what changes in v3](/docs/whats-new) first: it is a reinstall rather than an upgrade, and the two must not share a client.

:::caution
v3 is currently a beta. Expect rough edges and [report anything that breaks or feels unsupported](https://github.com/spicetify/cli/issues), especially during first installation, after a Spotify update, or while porting an existing extension or theme.
:::

## Requirements

- The official Spotify desktop client, from Spotify's own installer. Sandboxed builds (Microsoft Store, Snap, Flatpak) hide the files Spicetify has to patch.
- If Spotify is a fresh install, open it and log in for a minute before running Spicetify, so it writes the files that get patched.

## Install

### macOS and Linux

```bash
curl -fsSL https://raw.githubusercontent.com/spicetify/cli/v3-beta/install.sh | sh -s -- --v3
```

The script installs into `~/.spicetify`, and prints the two lines to add to your shell profile if it cannot put itself on your `PATH`. It needs `zstd` to unpack the archive: `brew install zstd` or `apt install zstd`.

Builds are published for macOS on x86_64 and arm64, and Linux on x86_64. On any other architecture, [build from source](#build-from-source).

### Windows

```powershell
$v3 = $true; iwr -useb https://raw.githubusercontent.com/spicetify/cli/v3-beta/install.ps1 | iex
```

Setting `$v3` before piping is what selects v3; without it the script installs the v2 release. It unpacks into `%LOCALAPPDATA%\spicetify` and adds that folder to your `PATH`.

Windows builds are published for x86_64. On ARM, [build from source](#build-from-source).

To install by hand instead, download `spicetify-<version>-windows-x86_64.zip` from the [releases page](https://github.com/spicetify/cli/releases), unpack it somewhere permanent, and add that folder to your `PATH`. Every asset ships a `.sha256` beside it if you want to check the download first.

### Build from source

Works on any platform Rust supports:

```bash
git clone --branch v3-beta https://github.com/spicetify/cli
cd cli
pnpm install && pnpm build:payload
cargo build --release -p cli -p daemon
```

The binaries land in `rust/target/release/` as `spicetify` and `spicetify-daemon`. Put that directory on your `PATH`, or call the binary by its full path.

:::note
`pnpm build:payload` is not optional. The browser-side payload is compiled into the binary, so a build without it refuses to apply rather than patching Spotify with nothing in it.
:::

### Staying up to date

```bash
spicetify self-update
```

Downloads are checksum-verified. If you installed through a package manager, update through that instead.

## Apply

```bash
spicetify apply
```

That is the whole setup. `apply` stops Spotify, patches the client, installs and starts the background daemon, registers the `spicetify://` handler, and starts Spotify again.

On a fresh install it also downloads the store and the standard library from the registry, so the **Module Store** button is waiting in Spotify's top bar the first time it reopens. Nothing to install by hand.

There is no separate backup step. v3 renames Spotify's own `xpui.spa` to `xpui.spa.backup` in place, and that rename **is** the backup, which is why `spicetify restore` needs nothing from you.

:::warning
Never point the v2 (Go) and v3 (Rust) binaries at the same client. They keep their backups differently, and running one over the other's state corrupts the install. Both detect a foreign apply and refuse, but restore with the same CLI that applied before switching.
:::

## Add your first module

Open Spotify and click **Module Store** in the top bar. Browse, click install, and most modules take effect immediately. The few that need a restart say so.

From the terminal instead:

```bash
spicetify pkg install trashbin        # prints the version it unpacked
spicetify pkg enable trashbin@<version>
spicetify apply
```

:::warning
Installing does not enable. `pkg install` unpacks the module and prints its version, `pkg enable` points the client at that version, and `apply` stages it. An install with no enable sits on disk doing nothing.
:::

## Keeping it working

A Spotify update no longer breaks your client. The daemon notices Spotify updating itself and re-applies afterwards, so in the normal case there is nothing to do.

If something does look wrong after an update:

```bash
spicetify apply          # re-patch
spicetify daemon status  # is the daemon running, and which version
spicetify support        # diagnostics to paste into a bug report
```

To keep Spotify on the build you have:

```bash
spicetify spotify-updates block
```

## Where things live

```bash
spicetify path
```

Configuration lives in `config.toml` under Spicetify's config folder, with `modules/` and `store/` beside it. `spicetify config open` opens that folder.

## Next

- [What changes in v3](/docs/whats-new) if you are coming from v2
- [Modules and the store](/docs/modules) for what you can install and how to manage it
- [CLI reference](/docs/cli) for every command
- [Building a module](/docs/development/building-a-module) if you want to make one
