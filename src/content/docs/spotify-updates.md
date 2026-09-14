---
title: Spotify updates
description: Keep Spotify pinned or update it without leaving Spicetify unpatched.
sidebar_position: 4
---

Spicetify can keep Spotify on its current version and reapply your setup after
an update. On macOS, Manager can run the supported update as one transaction.
Windows and Linux use the manual flow below.

:::note
One-step **Update & Apply** is experimental and currently available only on
macOS. The ordinary block, unblock, status, and apply commands remain available
on supported native Spotify installations on every platform.
:::

## Read the version badges

Open Spotify's profile menu, select **Spicetify Settings**, and find
**Updates**. Manager reports three different facts:

- **installed** is the Spotify version currently on disk.
- **supported** is the newest Spotify version with a verified published
  classmap.
- **available** is the newest Spotify version observed by the project. This
  badge does not prove that Spicetify supports the version.

Manager offers **Update & Apply** only when the daemon supports the transaction,
Spotify exposes its complete updater API, and a newer verified version exists.
The daemon also checks the exact version Spotify offers. It rejects an offer
above the verified support ceiling even if the **available** badge is stale.

## Keep the installed Spotify version

Run the block command while Spotify is closed:

```bash
spicetify spotify-updates block
spicetify spotify-updates status
```

Spicetify records the block in `config.toml`. A Spotify update replaces the
file or directory protection that enforces the block, so each successful
`spicetify apply` restores the recorded setting.

The protection mechanism depends on the platform:

- macOS patches Spotify's update endpoint, signs the changed app bundle, and
  locks the update cache as a secondary measure.
- Windows protects Spotify's update staging directory. Older client layouts
  can use the endpoint patch instead.
- Linux patches Spotify's update endpoint. Your package manager can still
  replace the installed package.

Microsoft Store, Snap, and Flatpak builds are sandboxed and aren't supported.

## Update and apply on macOS

Use Manager when it shows **Update & Apply**:

1. Run `spicetify daemon status` and confirm that the daemon is current.
2. Open **Spicetify Settings** in Spotify and find **Updates**.
3. Confirm that **supported** is newer than **installed**.
4. Select **Update & Apply**.

The daemon temporarily allows Spotify's updater, validates the offered version,
waits for installation, reapplies Spicetify, restores the update block, and
restarts Spotify. If Spotify restarts during the process, Manager reconnects to
the existing job instead of starting another one.

If Manager reports that it couldn't restore the block, fix the reported error
and run:

```bash
spicetify spotify-updates block
```

## Update Spotify manually

Use this flow on Windows, Linux, or macOS when Manager doesn't show
**Update & Apply**:

1. Allow Spotify updates:

   ```bash
   spicetify spotify-updates unblock
   ```

2. Update Spotify through its normal installer or updater.
3. Reapply Spicetify:

   ```bash
   spicetify apply
   ```

4. To pin the new Spotify version, restore the block:

   ```bash
   spicetify spotify-updates block
   ```

If the daemon is running, it normally reapplies Spicetify after it detects the
new stock client. Running `spicetify apply` remains a safe manual check.

## Diagnose an interrupted update

Run these commands before opening an issue:

```bash
spicetify spotify-updates status
spicetify daemon status
spicetify support
```

If Spotify looks stock, run `spicetify apply`. If the update status is allowed
when you expected it to be blocked, run `spicetify spotify-updates block`.

`spicetify self-update` updates the Spicetify CLI and TUI. It does not update
Spotify.
