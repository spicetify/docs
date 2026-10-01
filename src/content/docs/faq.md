---
title: FAQ
description: Answers and fixes for common Spicetify v3 problems.
sidebar_position: 7
---

These answers are for Spicetify v3. For v2, see the [v2 FAQ](/docs/legacy/faq).

## Where is the config file?

`spicetify config` prints the path to `config.toml`, and `spicetify config open` opens its folder. v3 has no `spicetify config <key> <value>`, so edit the file using the [configuration reference](/docs/modules/config-file).

## Spotify updated and my client looks stock again

The daemon applies Spicetify again after a Spotify update, so wait a moment and restart Spotify. If it still looks stock, run `spicetify daemon status`, because a stopped or outdated daemon looks the same as a failed apply, then run `spicetify apply`. To keep Spotify on its current version, [block Spotify updates](/docs/spotify-updates#block-spotify-updates).

## Do I have to wait for a Spicetify release when Spotify updates?

Usually not. `apply` downloads the classmap for your Spotify version, so a new build works with the Spicetify you have once its classmap is published. Until then, Spicetify falls back to an [older patch's classmap](/docs/whats-new#spotify-updates-no-longer-leave-a-stock-client), and Manager says it's running on a fallback classmap.

## A published fix still looks broken after applying

A download cache can serve old compatibility files for a short time after a fix is published. Run `apply` without caches:

```bash
spicetify apply --no-cache
```

If a download fails, `apply` stops before it touches Spotify. If the fix also needs a new theme or module version, update that in the Module Store too. [`apply`](/docs/cli/commands#apply) explains what `--no-cache` refreshes.

## Spotify didn't open again after `apply`

Older v3 builds could wait on a Spotify process that wouldn't exit. Current builds kill Spotify if it hasn't closed after 15 seconds, and start a new one even if the old process survives. Update with `spicetify self-update`, then run `spicetify restart`.

## Spicetify can't find Spotify

Run `spicetify config` to see the paths it found. If they're wrong, set [`spotify_data_dir` and `spotify_exec`](/docs/modules/config-file#spotify_data_dir-spotify_exec-offline_bnk_dir) in `config.toml`, or pass `--spotify-data-dir` and `--spotify-exec` for one command. Spicetify can't patch Spotify from the Microsoft Store, Snap, or Flatpak, so install it from Spotify's own installer.

## "This client was patched by another tool"

`apply` and `restore` print this when Spotify's `xpui.spa` is gone and only an unpacked `xpui` folder is left, with no v2 backup to restore from. Spicetify v2 leaves a client in that state. Reinstall Spotify from its own installer, then run `spicetify apply` (see [upgrade from v2](/docs/whats-new#upgrade-from-v2)).

## I installed a module and nothing happened

A module installed with `spicetify pkg install` stays disabled until you run `spicetify pkg enable <id>@<version>` and `spicetify apply`. The Module Store does all three steps for you.

## A module broke my client

Disable the module in the Installed section of the Module Store. If you can't reach the Module Store, delete the module from the terminal (`spicetify pkg list` shows its version):

```bash
spicetify pkg delete <id>@<version>
spicetify apply
```

If Spotify is too broken for that, `spicetify restore` returns stock Spotify. The next `apply` loads the modules you kept.

## "Update all" left some updates behind

A `stdlib` update needs a restart, so **Update all** installs it first and holds back the rest. After you apply the `stdlib` update and Spotify restarts, the Module Store finishes the held-back updates without another **Update all** (see [updates](/docs/modules#updates)).

## Why did my theme turn off when I enabled another one?

Spicetify runs one theme at a time, so enabling a theme unloads the previous one.

## Do my v2 themes and extensions work?

No. v3 uses a different module format, so install the v3 versions from the Module Store.

## Can I install something that isn't in the Module Store?

Yes. Give `spicetify pkg install` the module's `id@version` and the artifact's URL or path, as [from the terminal](/docs/modules#from-the-terminal) shows. Nothing verifies those bytes, so install only artifacts you trust.

## I can't play some songs after downgrading Spotify

Delete everything in Spotify's cache folder and start Spotify again:

- Windows: `%LOCALAPPDATA%\Spotify`
- Linux: `~/.config/spotify`
- macOS: `~/Library/Application Support/Spotify`

## How do I report a bug?

Run `spicetify support` and paste its output into a [new issue](https://github.com/spicetify/cli/issues). It prints these details:

- The Spicetify and Spotify versions, and the classmap in use
- Who patched the client: `v3`, `Spicetify v2 or another tool`, or `no`
- v2's backup folder and its Spotify version, and whether v2 files are in the config folder
- The CSS map in use, a file path or `embedded`
- How many modules are staged, whether Spotify updates are blocked, and the main paths
