---
title: Configuration reference
description: Every key in Spicetify v3's config.toml, and the flags that override them.
sidebar_position: 2
---

v3 keeps its configuration in `config.toml`, in Spicetify's config folder. There is no `spicetify config <key> <value>` command any more: open the file and edit it.

```bash
spicetify config open   # open the folder in your file manager
spicetify path          # print the paths spicetify is using
```

The file is written for you by `spicetify init`, and every key has a working default, so an empty file is a valid file.

---

## Keys

```toml
# Re-apply automatically after Spotify updates itself. On by default: this is
# what keeps a Spotify update from leaving you with a stock client.
daemon = true

# Mirror mode. Off by default.
mirror = false

# Only set these when auto-detection gets it wrong.
# spotify_data_dir = "/path/to/spotify/data"
# spotify_exec = "/path/to/spotify/binary"
# offline_bnk_dir = "/path/to/offline/bnk"
```

### `daemon`

Whether `apply` installs and starts the background daemon. The daemon watches for Spotify updating itself and re-applies afterwards, and it serves the local proxy the client uses to reach hosts it cannot fetch directly.

Set it to `false` if you would rather re-apply by hand. `spicetify apply` then leaves the daemon alone.

### `mirror`

Mirror mode, off by default. Also settable per invocation with `--mirror`.

### `spotify_data_dir`, `spotify_exec`, `offline_bnk_dir`

Where Spotify's data folder, executable and offline cache are. Spicetify finds all three on its own; set them only when it cannot, which usually means a non-standard install location. `spicetify path` prints what it resolved.

---

## Overriding for one command

Every path key has a matching flag, which takes precedence over the file for that invocation and does not change it:

```bash
spicetify --spotify-exec /opt/spotify/spotify apply
spicetify --spotify-data-dir ~/custom/spotify apply
spicetify --offline-bnk-dir ~/custom/bnk apply
spicetify --mirror true apply
```

---

## Resetting

```bash
spicetify init
```

`init` writes a fresh `config.toml` from what it detects and **deletes `hooks/`, `modules/` and `store/`**, which means every installed module goes with it. It asks first; `--yes` skips the prompt. Use it to start clean, not to fix a config typo.

---

## What happened to `config-xpui.ini`

That is v2's configuration, and v3 does not read it. It stays on disk untouched, so switching back to v2 finds it exactly as it was. The v2 keys that listed your themes and extensions have no v3 equivalent by design: what is installed is now recorded in the store, not in a config file you hand-edit.

See [the v2 reference](/docs/legacy/customization/config-file) if you are still running v2.
