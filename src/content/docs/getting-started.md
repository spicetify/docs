---
title: Getting started
description: Install Spicetify v3, patch Spotify, and add your first module.
sidebar_position: 1
---

Spicetify customizes the official Spotify desktop client. In v3, everything you add to Spotify is a module: themes, extensions, and whole apps. You install modules from the Module Store inside Spotify. If you use Spicetify v2 today, read [what changes in v3](/docs/whats-new) first.

:::caution
v3 is a release candidate (`v3.0.0-rc.1`), published as a GitHub prerelease. [Report anything that breaks](https://github.com/spicetify/cli/issues), especially during the first install or after a Spotify update.
:::

## Requirements

The Spotify client you patch must meet these conditions:

- It's Spotify 1.2.80 or newer.
- It came from Spotify's own installer. Spicetify can't patch the sandboxed Microsoft Store, Snap, and Flatpak builds. On Linux, `spicetify spotify install` gives you a copy it can patch (see [Spotify updates](/docs/spotify-updates)).
- If you just installed Spotify, you opened it and signed in once.

## Install

Each install method puts two binaries on your `PATH`: `spicetify` and `spicetify-daemon`.

### macOS and Linux

Run the install script with `--v3`. Without the flag, it installs v2.

```bash
curl -fsSL https://raw.githubusercontent.com/spicetify/cli/v3-beta/install.sh | sh -s -- --v3
```

The script installs the newest v3 release into `~/.spicetify`, adds it to your `PATH` in your shell profile, and sets up shell completion. It needs `zstd` (`brew install zstd` or `apt install zstd`). To pick a release, add its version, for example `--v3 3.0.0-rc.1`.

Builds exist for macOS on x86_64 and arm64, and Linux on x86_64. On other systems, [compile Spicetify](/docs/development/compiling).

### Windows

Run this in PowerShell. Without `$v3 = $true`, the script installs v2.

```powershell
$v3 = $true; iwr -useb https://raw.githubusercontent.com/spicetify/cli/v3-beta/install.ps1 | iex
```

The script downloads the x86_64 or ARM64 build that matches your Spotify, checks its SHA-256, and installs it into `%LOCALAPPDATA%\spicetify`. It adds that folder to your `PATH`, sets up PowerShell completion, and runs `spicetify apply`. It also deletes the `css-map.json`, `globals.d.ts`, and `jsHelper` files that v2 left in that folder.

To install by hand, download the `windows-x86_64` or `windows-aarch64` zip from the [releases page](https://github.com/spicetify/cli/releases), unpack it into a permanent folder, and add that folder to your `PATH`. Each asset has a `.sha256` file next to it.

### mise

With [mise](https://mise.jdx.dev), run:

```bash
mise use -g 'packslip:github.com/spicetify/cli[prerelease=true]'
```

mise skips prereleases unless you set `prerelease=true`, so drop it once 3.0.0 ships. To pin a version, use `packslip:github.com/spicetify/cli@3.0.0-rc.1`. mise verifies the download against the release's signed packslip manifest. A copy installed with mise doesn't update itself, so run `mise upgrade` instead.

## Apply

Run `apply` to patch Spotify:

```bash
spicetify apply
```

`apply` closes Spotify, patches it, starts the daemon, registers the `spicetify://` link handler, and opens Spotify again. The first run also installs the Module Store and the standard library.

`apply` renames Spotify's `xpui.spa` to `xpui.spa.backup`, and `spicetify restore` renames it back, so there's no separate backup step. If Spicetify v2 patched this client, `apply` first restores Spotify from v2's backup (see [upgrade from v2](/docs/whats-new#upgrade-from-v2)).

## Add your first module

In Spotify, select **Module Store** in the top bar and install a module. Most modules work right away, and one that needs a restart says so.

To install from the terminal, use `spicetify pkg install`, then enable the version it prints and apply, as [from the terminal](/docs/modules#from-the-terminal) shows. A module you don't enable does nothing.

## Keep Spicetify up to date

The daemon updates Spicetify by default. It checks 10 minutes after it starts and then once a day, and runs `spicetify self-update` when a release is out. It only updates a copy in the installer's folder (`~/.spicetify` or `%LOCALAPPDATA%\spicetify`), and it waits while an apply or an Update & Apply runs. The last run's output is in `self-update.log` in the config folder.

The update doesn't restart Spotify, and the new client code reaches Spotify on your next apply. Until then, **Spicetify Settings** shows "Spicetify X is installed. Apply to use it in Spotify." with an **apply** button.

To turn automatic updates off, use one of these:

- `spicetify auto-update off` (`spicetify auto-update status` shows the setting)
- **Install Spicetify updates automatically** in **Spicetify Settings**, which you open from Spotify's profile menu
- `auto_update = false` in `config.toml`

To update by hand, run [`spicetify self-update`](/docs/cli/commands#self-update).

To control Spotify's own updates, see [Spotify updates](/docs/spotify-updates).

## Next steps

- [Modules and the Module Store](/docs/modules)
- [CLI reference](/docs/cli)
- [Building a module](/docs/development/building-a-module)
