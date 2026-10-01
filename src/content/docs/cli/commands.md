---
title: Commands
description: Every command in the Spicetify v3 CLI.
sidebar_position: 2
---

Every command also accepts the [global options](/docs/cli#global-options), and `spicetify <command> --help` prints its usage.

## Core

These commands patch, restore, and restart Spotify.

### `apply`

```bash
spicetify apply [--no-cache]
```

Patches Spotify. Run it after setup, after `pkg` changes, and whenever the client looks wrong. It's safe to repeat.

`apply` downloads the compatibility files for your Spotify version, stops Spotify, renames `xpui.spa` to `xpui.spa.backup`, and writes the patched client. It installs or updates the `stdlib`, `store`, and `manager` modules from the registry unless you disabled them, pinned an older version, or replaced them with a local build. It then stages every enabled module, restores a Spotify update block you set, installs and starts the daemon, registers the `spicetify://` handler, and starts Spotify.

When a download fails, `apply` uses the cached copy, so it works offline. It refuses Spotify versions older than 1.2.80 before changing anything. It also undoes a Spicetify v2 apply first (see [upgrade from v2](/docs/whats-new#upgrade-from-v2)).

Use `--no-cache` when a newly published compatibility fix hasn't reached your client. It skips the local and CDN caches for the compatibility index, classmap, CSS-map overlay, verification metadata, and exposure patches, and checks each file against the index's checksum. If the refresh fails, `apply` exits before it stops or changes Spotify. It doesn't update modules, Spotify, or Spicetify, or clear Spotify's music cache. It refuses to run while `SPICETIFY_CLASSMAPS_DIR` is set, and local CSS-map and exposure-patch overrides still win over the downloaded files.

### `restore`

```bash
spicetify restore
```

Stops the daemon, removes its login item, and puts stock Spotify back from `xpui.spa.backup`. In mirror mode it deletes the patched copy instead. It also undoes a Spicetify v2 apply from v2's backup.

### `restart`

```bash
spicetify restart
```

Restarts Spotify without patching it.

### `init`

```bash
spicetify init [--yes]
```

Writes a new `config.toml` with default settings and the detected Spotify paths, and deletes `hooks/`, `modules/`, and `store/`, which removes every installed module. It asks first unless you pass `--yes`.

## Modules

The `pkg` commands manage modules. Changes reach Spotify on the next `spicetify apply`. [Modules](/docs/modules#from-the-terminal) shows a full install.

### `pkg list`

```bash
spicetify pkg list
```

Lists the enabled modules and local builds in `modules/`, with their versions.

### `pkg install`

```bash
spicetify pkg install <id>
spicetify pkg install <id>@<version> <url-or-path>
```

With an id, it downloads the registry's current version and refuses it if the checksum doesn't match. If one mirror fails, it tries the next. With a URL or local path, it skips the registry, warns that nothing verifies the files, and prints their SHA-256 digest. Installing doesn't enable the module.

### `pkg enable`

```bash
spicetify pkg enable <id>@<version>
```

Enables an installed version by linking it into `modules/`. To roll back, enable an older version you still have.

### `pkg update`

```bash
spicetify pkg update [id]
```

Updates installed modules to the registry's version, including a rollback the registry pins. Without an id, it skips and names disabled modules, pinned modules (enabled at an older version while a newer one is installed), local builds (a real folder in `modules/` or a link outside `store/`), modules installed from a URL or path, and modules the registry doesn't list.

Naming a module overrides a pin or a URL install, and naming one that is disabled, a local build, or not in the registry is an error. The command fails when any module couldn't be updated. To pick a version, use `pkg enable`.

### `pkg delete`

```bash
spicetify pkg delete <id>@<version>
```

Deletes that version and its store entry. Deleting the enabled version disables the module.

## Configuration and diagnostics

These commands print what Spicetify uses and change nothing.

### `config`

```bash
spicetify config        # print the resolved configuration
spicetify config open   # open the config folder
```

`config` prints mirror mode, the config file and folder, and the Spotify data folder, executable, and `offline.bnk` folder in use. To change a setting, edit [`config.toml`](/docs/modules/config-file).

### `path`

```bash
spicetify path
```

Prints the config folder, config file, `modules/`, `hooks/`, Spotify's `Apps/` folder, and the patched client's location.

### `support`

```bash
spicetify support
```

Prints diagnostics for a bug report. [How do I report a bug?](/docs/faq#how-do-i-report-a-bug) lists what it includes.

## Updates

These commands update Spicetify and control Spotify's updater.

### `self-update`

```bash
spicetify self-update
```

Updates the `spicetify` and `spicetify-daemon` binaries to the latest release, checking the download against the release's checksum file when there is one. Spotify uses the new version after your next `spicetify apply`. It waits up to 30 minutes for a running apply or Spotify update to finish. A daemon that launchd or systemd manages restarts through that service manager, and any other running daemon is stopped and started again. If a package manager installed Spicetify, update with it instead.

### `auto-update`

```bash
spicetify auto-update on
spicetify auto-update off
spicetify auto-update status
```

Sets `auto_update` in `config.toml`, which is on by default. `status` also says when your install is outside the installer's folder and doesn't update itself. [Keep Spicetify up to date](/docs/getting-started#keep-spicetify-up-to-date) describes the daily check.

### `spotify-updates`

```bash
spicetify spotify-updates block
spicetify spotify-updates unblock
spicetify spotify-updates status
```

Blocks or allows Spotify's own updater and saves the choice as `block_spotify_updates`, which `apply` restores after an update. Spotify must stop for the change, and it stays stopped when you run the command from a terminal. [Spotify updates](/docs/spotify-updates) explains each platform's method.

## Daemon

The daemon applies Spicetify again after Spotify updates itself, once you close Spotify. It also runs automatic updates and answers the client on `127.0.0.1:7967`, including a proxy for hosts the client can't reach. `apply` installs and starts it unless `daemon = false`.

```bash
spicetify daemon status      # running, version, uptime, and login item
spicetify daemon start
spicetify daemon stop        # also removes the login item until the next apply
spicetify daemon install     # add the login item
spicetify daemon uninstall   # remove the login item
```

The login item is a launchd agent on macOS, a systemd user service on Linux, and a `Run` registry entry on Windows. If an update seems to change nothing, check the version in `daemon status`, because an old daemon runs until `apply` replaces it.

## Spotify on Linux

On Linux x86_64 only, these commands install a Spotify your user owns from Spotify's official Debian packages.

```bash
spicetify spotify install [--channel stable|testing]
spicetify spotify update [--channel stable|testing]
spicetify spotify status
```

`install` verifies and unpacks the package under `~/.local/share/spicetify/spotify/`, applies Spicetify, points `config.toml` at it, and adds a desktop launcher. New installs use `stable`. `update` keeps the current channel unless you pass one. Both refuse a downgrade and a version without a verified classmap. `status` shows the installed version and channel and the latest official package.

## Development

These commands are for module authors and the client itself.

### `dev`

```bash
spicetify dev
```

Turns on Spotify's developer mode, which adds Inspect Element. It patches `offline.bnk`, so Spotify restarts. If it can't find the marker, log out of Spotify and back in, then run it again.

### `protocol`

```bash
spicetify protocol "<spicetify-uri>"
```

Internal. The `spicetify://` handler that `apply` registers runs it for links and for Module Store and Manager actions. On macOS the handler is an app bundle that logs to `protocol.log` in the config folder.
