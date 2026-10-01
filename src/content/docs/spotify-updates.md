---
title: Spotify updates
description: Keep Spotify on its current version, or update it without losing Spicetify.
sidebar_position: 4
---

A Spotify update replaces the patched client, and the daemon applies Spicetify again. To update Spicetify itself, see [keep Spicetify up to date](/docs/getting-started#keep-spicetify-up-to-date).

## Read the version badges

In Spotify, open the profile menu and select **Spicetify Settings**. The **Updates** section shows three versions:

- **installed** is the Spotify version on disk.
- **supported** is the newest Spotify version with a verified classmap.
- **available** is the newest Spotify version the project has seen. It doesn't mean Spicetify supports it.

## Block Spotify updates

Run `spicetify spotify-updates block` to keep the installed version, and `spicetify spotify-updates status` to check the setting. `block` may close Spotify to patch it, and `unblock` allows updates again. Manager's **block** and **allow** buttons do the same. Spicetify saves your choice in `config.toml` and sets it again on every apply, because a Spotify update removes the block. Each platform blocks updates differently:

- macOS patches Spotify's update endpoint, signs the app bundle again, and locks the update cache.
- Windows protects Spotify's update staging folder. Older clients get the endpoint patch instead. The Microsoft Store manages its own updates.
- Linux patches Spotify's update endpoint. Your package manager can still replace the package.

## Update & Apply on macOS

On macOS, Manager can update Spotify and apply Spicetify in one step. In **Spicetify Settings**, under **Updates**, select **update & apply**. Manager shows the button when the daemon and Spotify support it and **supported** is newer than **installed**.

The daemon allows Spotify's updater, refuses an offer newer than **supported**, waits for the install, applies Spicetify, blocks updates again, and restarts Spotify. If Spotify restarts during the update, Manager reconnects to the same job.

Spotify must be signed in. A signed-out Spotify restarts to its login screen, and within about 3 minutes the job stops and tells you to sign in and choose Update & Apply again.

If Manager reports that it couldn't block updates again, fix the reported error, then run `spicetify spotify-updates block`.

## Managed Spotify on Linux

On Linux, `spicetify spotify install` installs a copy of Spotify from Spotify's official Debian repository, separate from your system packages, and patches it. It points the Spotify desktop entry and `~/.local/bin/spotify` at that copy. Manager then shows **Update Spotify & Apply** when a newer package has a verified classmap. [Spotify on Linux](/docs/cli/commands#spotify-on-linux) lists the commands and channels.

## Update Spotify manually

Use these steps on Windows and Linux, or when Manager doesn't offer **update & apply**:

1. Allow Spotify updates with `spicetify spotify-updates unblock`.
2. Update Spotify with its own updater or installer.
3. The daemon applies Spicetify for you. To make sure, run `spicetify apply`.
4. To stay on the new version, run `spicetify spotify-updates block`.

## Check an interrupted update

Include the output of these commands when you open an issue:

```bash
spicetify spotify-updates status
spicetify daemon status
spicetify support
```

If Spotify looks stock, run `spicetify apply`. If `status` says updates are allowed and you expected them blocked, run `spicetify spotify-updates block`.
