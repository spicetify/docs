---
title: Modules and the Module Store
description: Find, install, update, and manage modules, the one kind of add-on in Spicetify v3.
sidebar_position: 1
category_index: true
---

Everything you add to Spotify in v3 is a module. Each module has a kind: extension, theme, snippet, or app. All kinds install and update the same way.

## The Module Store

The Module Store ships with Spicetify. Select **Module Store** in Spotify's top bar, where you can:

- Filter by kind, search, and sort by **Most installed**, **Name A-Z**, **Name Z-A**, or **Recently updated**.
- Install a module from its card. Most modules load at once, and the rest tell you to restart Spotify.
- Open a module's details for its README, authors, source repository, and license.
- **Enable**, **Disable**, or **Remove** modules in the **Installed** section. A module you installed with the CLI has a `cli` badge and an **Uninstall** button, which needs the daemon and restarts Spotify. The `stdlib`, `store`, and `manager` modules have a `core` badge and can't be disabled or removed.

Every module comes from one registry, whose checks re-hash each artifact before its entry merges and keep published versions immutable (see [what CI checks](/docs/development/publishing#what-ci-checks)). The Module Store checks the checksum again at install and refuses a mismatch. It installs the dependencies a module declares first, and reports a set of versions it can't satisfy.

### Updates

When Spotify starts, the Module Store shows a "N module updates available in the Module Store" toast, once for each new set of updates. It installs nothing until you select **Update all**.

Most updates take effect at once. A `stdlib` update needs a restart because other modules share its running code, so the Module Store installs it alone and holds the other updates back. To finish it:

1. Select **Update all**.
2. If the Module Store shows **Apply stdlib update**, select it, then select **Apply and restart**. Playback stops while Spicetify rebuilds the client.
3. Wait for Spotify to start again. The Module Store then installs the held-back updates on its own.

Without the daemon, the Module Store installs `stdlib` inside Spotify and asks you to restart, and the held-back updates install the same way. `spicetify apply` also updates `stdlib`, `store`, and `manager`, and `spicetify pkg update` updates the rest from the terminal.

### Snippets

A snippet is a CSS-only module. Select **New snippet** to write one, and **Edit** in the **Installed** section to change it. The registry never updates your own snippets.

### Backups

**Export** downloads `spicetify-store-backup.json`, which holds your preferences (active theme, color schemes, disabled modules, filter, and sort), the registry modules you installed from the Module Store, and your snippets' CSS. It leaves out CLI installs and `stdlib`, `store`, and `manager`. **Import** restores the preferences and snippets and reinstalls the modules from the registry, verified like any install, so a backup file can't install code the registry doesn't carry.

**Reset** removes your Module Store installs, snippets, and preferences, and takes effect after a Spotify restart.

## Spicetify Settings

Manager is the **Spicetify Settings** page in Spotify's profile menu, where modules' settings appear. Its **Updates** section has the **Install Spicetify updates automatically** toggle, which tells you when your install is outside the official installer's folder and doesn't update itself. [Keep Spicetify up to date](/docs/getting-started#keep-spicetify-up-to-date) and [Spotify updates](/docs/spotify-updates) cover the rest of the section.

## From the terminal

The CLI installs the same modules. A module stays disabled until you enable a version, and Spotify loads it on the next `apply`:

```bash
spicetify pkg install trashbin           # download it and print its version
spicetify pkg enable trashbin@<version>  # enable that version
spicetify apply                          # stage it into Spotify
```

Spicetify keeps installed versions side by side, so to roll back, enable an older version, as in `spicetify pkg enable my-module@1.2.0`, and apply.

To install a module that isn't in the registry, give an `id@version` and the artifact's URL or local path. No checksum or review covers it, so the CLI warns you and prints its SHA-256 digest:

```bash
spicetify pkg install my-module@1.0.0 https://example.com/my-module@1.0.0.zip
```

[Commands](/docs/cli/commands#modules) documents every `pkg` command.

## Themes

Only one theme is active at a time, and enabling a theme unloads the previous one. The active theme appears in a bar at the top of the Module Store, where a color scheme you pick applies at once. If a theme makes the client look wrong, select **Disable** in that bar to get the stock look back.

## When a module is withdrawn

The registry can revoke a module, for example after a security problem or a takedown. The Module Store stops offering it, disables it in your client, and shows the reason on its card.

## Where modules live on disk

These folders are in the config folder that `spicetify path` prints:

- `store/<id>/<version>/` holds each installed version.
- `modules/<id>` links to the enabled version.

A real folder at `modules/<id>` is a local build you staged yourself. `apply` uses it, and no update replaces it.
