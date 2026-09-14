---
title: Commands
description: Every command in the Spicetify v3 CLI.
sidebar_position: 2
---

Every command accepts the [global options](/docs/cli#global-options), so they are not repeated below. `spicetify <command> --help` is the authority if this page ever falls behind the binary.

## Core

### `apply`

```bash
spicetify apply
```

Patches Spotify. This is the whole setup on a fresh install, and the fix for almost anything that looks wrong afterwards.

It stops Spotify, unpacks the client, renames Spotify's own archive to `xpui.spa.backup` (that rename is the backup), injects Spicetify's payload, fetches the mapping for your exact Spotify version, stages every enabled module, installs and starts the daemon, registers the `spicetify://` handler, and starts Spotify again.

On a fresh install, where no modules are present yet, it first seeds the standard library and the store from the registry, so the client can manage itself instead of booting empty. Once they exist, the store updates them, and this step does nothing.

Safe to run repeatedly. If the fetch for a new Spotify version fails, whatever is already cached still applies, so `apply` works offline.

### `restore`

```bash
spicetify restore
```

Puts stock Spotify back from the backup taken at apply time. Restore with the same CLI that applied: v2 and v3 keep their backups differently.

### `restart`

```bash
spicetify restart
```

Restarts the Spotify client. No patching.

### `init`

```bash
spicetify init [--yes]
```

Writes a fresh `config.toml` from what it detects, and **deletes `hooks/`, `modules/` and `store/`**, so every installed module goes with it. It asks first unless you pass `--yes`. This is a clean slate, not a repair.

## Modules

### `pkg list`

```bash
spicetify pkg list
```

What is installed, read from disk, with each module's version.

### `pkg install`

```bash
spicetify pkg install <id>
spicetify pkg install <id> <url>
```

Resolves the id in the registry, downloads the artifact, verifies it against the checksum the registry recorded, and unpacks it. A mismatch aborts the install. If the entry lists mirrors, a host that has gone away costs an attempt rather than the install.

With a URL, the registry is bypassed entirely: nothing verifies those bytes, and the CLI says so and prints the digest it got.

Installing does not enable. Follow with `pkg enable` and `apply`.

### `pkg enable`

```bash
spicetify pkg enable <id>@<version>
```

Points the client at that version, by linking it into the modules directory. This is also how you roll back: enable the older version you still have and re-apply.

### `pkg delete`

```bash
spicetify pkg delete <id>
```

Removes the module and its store entry.

## Configuration

### `config`

```bash
spicetify config        # print the resolved configuration
spicetify config open   # open the configuration folder
```

With no subcommand it prints what Spicetify actually resolved: mirror mode, the config file, the config root, and the Spotify data directory, executable and offline cache it is using. That is the first thing to check when Spicetify is patching a Spotify you did not expect.

There is no `config <key> <value>` in v3. Edit [`config.toml`](/docs/modules/config-file).

### `path`

```bash
spicetify path
```

Prints the paths Spicetify uses.

### `support`

```bash
spicetify support
```

Prints diagnostics to paste into a bug report. Start here before opening an issue.

## Daemon

The daemon is what re-applies Spicetify after Spotify updates itself, and it serves the local proxy the client uses for hosts it cannot fetch directly. `apply` installs and starts it unless `daemon = false` in your config.

```bash
spicetify daemon status      # running? which version?
spicetify daemon start
spicetify daemon stop        # also unloads the service, so it does not come back on its own
spicetify daemon install     # install the service
spicetify daemon uninstall   # remove it
```

`daemon status` reports the version it is running. If you have just updated Spicetify and behaviour has not changed, check that first: an old daemon serving old behaviour looks exactly like a fix that did not work.

## Spotify updates

```bash
spicetify spotify-updates block     # keep Spotify on the build you have
spicetify spotify-updates unblock
spicetify spotify-updates status
```

Blocking patches Spotify's own binary, so Spotify has to be stopped to do it. Run from the terminal it stops the client and leaves it stopped; run from inside the client (through the store) it starts it again for you.

The exact protection is platform-specific. Current Windows clients protect the
update staging directory. macOS and Linux patch the update endpoint, and macOS
also signs the changed app bundle. One-step **Update & Apply** in Manager is
currently available only on macOS.

Read [Spotify updates](/docs/spotify-updates) before unblocking a pinned client.

## Development

### `dev`

```bash
spicetify dev
```

Enables developer mode in the client, which is what gives you Inspect Element.

### `protocol`

```bash
spicetify protocol "spicetify:<id>:<action>"
```

Handles a `spicetify://` URI. You rarely type this: `apply` registers a handler so links and in-client actions reach it. Actions are `add`, `install`, `enable`, `fast-install`, `fast-enable`, `delete`, `remove`, `fast-delete`, `fast-remove`, `apply`, `block-updates` and `unblock-updates`.

On macOS the handler is a small app bundle, because macOS delivers URL activations as an Apple Event that a bare binary cannot receive. Its output goes to `protocol.log` in the config folder, which is the only place to see what an invocation did.

### `self-update`

```bash
spicetify self-update
```

Updates the Spicetify CLI and TUI to the latest release. It does not update
Spotify. Downloads are checksum-verified. If you installed through a package
manager, update through that instead. See
[Spotify updates](/docs/spotify-updates) to update the client.
