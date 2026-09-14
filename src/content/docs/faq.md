---
title: FAQ
sidebar_position: 7
---

Answers for v3. If you are running the released v2 CLI, see the [v2 FAQ](/docs/legacy/faq).

## Where is the config file?

`config.toml`, in Spicetify's config folder. To see exactly where:

```bash
spicetify config        # prints the resolved paths
spicetify config open   # opens the folder
spicetify path
```

Every key is documented in the [configuration reference](/docs/modules/config-file). v3 has no `spicetify config <key> <value>`: edit the file.

## Spotify updated and my client looks stock again

Usually it fixes itself. The daemon notices Spotify updating and re-applies afterwards, so give it a moment and restart Spotify.

If it does not:

```bash
spicetify daemon status   # running? which version?
spicetify apply
```

`daemon status` first is worth the extra second: a daemon that is not running, or one still on an old version after you updated Spicetify, looks exactly like an apply that did not work.

To stay on the build you have:

```bash
spicetify spotify-updates block
```

## A new Spotify version came out. Do I have to wait for a Spicetify release?

Usually not. v3 fetches the mapping for your exact Spotify version at apply time rather than baking it into the binary, so a new client build normally works with the Spicetify you already have. When something genuinely is not supported yet, the client tells you which part is degraded instead of looking silently wrong.

Manager's **available** badge only reports the newest version the project has
observed. The **supported** badge comes from verified classmaps and decides
whether Spicetify can offer an update. A missing exact map can fall back to an
older patch in the same Spotify minor release, but it never falls back across a
minor release.

## Can Manager update Spotify for me?

On macOS, Manager shows **Update & Apply** when the daemon, Spotify's updater
API, and a verified target are all available. The daemon validates the exact
offered version, reapplies Spicetify, and restores the update block.

Windows and Linux don't offer the one-step action yet. Follow the
[manual Spotify update flow](/docs/spotify-updates#update-spotify-manually)
instead.

## Spicetify cannot find Spotify

Check what it resolved:

```bash
spicetify config
```

If the Spotify path is wrong, set `spotify_data_dir` and `spotify_exec` in `config.toml`, or pass `--spotify-exec` for one command.

If you installed Spotify from the Microsoft Store, Snap or Flatpak, that is the problem: those builds are sandboxed and Spicetify cannot patch them. Remove it and install Spotify from Spotify's own installer.

## I installed a module and nothing happened

From the CLI, installing is only the first of three steps:

```bash
spicetify pkg install <id>
spicetify pkg enable <id>@<version>
spicetify apply
```

`pkg install` unpacks the module, `pkg enable` points the client at it, and `apply` stages it. From the store inside Spotify all three happen for you.

## A module broke my client

Disable it from the store's Installed tab, or:

```bash
spicetify pkg delete <id>
spicetify apply
```

If the client is too broken to reach the store, `spicetify restore` returns stock Spotify, and re-applying afterwards brings back the modules you kept.

## Can I go back to an older version of a module?

Yes. Installed versions are kept side by side:

```bash
spicetify pkg enable my-module@1.2.0
spicetify apply
```

## Why did my theme stop when I enabled another one?

Exactly one theme is active at a time. Enabling a theme unloads the previous one, so you never end up with two fighting over the same client chrome.

## Do my v2 themes and extensions work?

No. v3 modules are a different format, and v2's themes, extensions and custom apps are all modules now. Most popular ones already exist as modules in the store. See [what changes in v3](/docs/whats-new).

## Can I install something that is not in the store?

Yes, by naming its artifact:

```bash
spicetify pkg install my-module https://example.com/my-module@1.0.0.zip
```

Nothing verifies those bytes, because there is no registry entry with a checksum to hold them to, and the CLI says so. Prefer the store for anything you did not build yourself.

## I can't play some songs after downgrading Spotify

Delete everything in Spotify's own cache folder and start Spotify again:

- **Windows**: `%LOCALAPPDATA%\Spotify`
- **Linux**: `~/.config/spotify`
- **macOS**: `~/Library/Application Support/Spotify`

## How do I report a bug?

```bash
spicetify support
```

Paste that output into the issue. It carries the versions and paths that most questions would otherwise be about.
