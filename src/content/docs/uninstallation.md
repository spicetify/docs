---
title: Uninstallation
description: Remove Spicetify v3 and put stock Spotify back.
sidebar_position: 6
---

To remove Spicetify, restore Spotify, then delete Spicetify's files. If you only want to stop one module, disable it in the Module Store instead.

## Restore Spotify

Run `restore`:

```bash
spicetify restore
```

`restore` stops the daemon, removes its auto-start entry, and puts back the stock client, including one that Spicetify v2 patched. The v2 CLI can't undo a v3 apply.

If Spotify is already stock, `restore` says so and leaves the daemon in place. Run `spicetify daemon stop` to stop it and remove its auto-start entry.

## Remove the files

`spicetify path` prints the config folder. Delete these:

1. The config folder: `~/.config/spicetify` on macOS and Linux. It holds `config.toml`, every installed module, and the Module Store's records. To reinstall later with the same modules, keep it.
2. The install folder: `~/.spicetify`, or `%LOCALAPPDATA%\spicetify` on Windows. On Windows, this is also the config folder. If you installed with mise, run `mise unuse -g 'packslip:github.com/spicetify/cli[prerelease=true]'` instead.
3. The `PATH` entry the installer added to your shell profile. On Windows, it's in your user `PATH` environment variable.
4. The `spicetify://` link handler that `apply` registered:
   - macOS: `~/Applications/Spicetify.app`
   - Linux: `~/.local/share/applications/spicetify-protocol.desktop`
   - Windows: the registry key `HKEY_CURRENT_USER\Software\Classes\spicetify`

## Going back to v2

Restore with v3 first, then install v2 and apply with it. v3 never changes v2's `config-xpui.ini`. See the [v2 guide](/docs/legacy/getting-started).
