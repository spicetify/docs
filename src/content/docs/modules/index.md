---
title: Modules and the store
description: Find, install and manage modules, the one kind of add-on in Spicetify v3.
sidebar_position: 1
category_index: true
---

Everything you add to Spotify in v3 is a **module**. A theme, a small tweak like skipping explicit tracks, a whole extra page in the sidebar: same format, same install path, same lifecycle. Modules are tagged so you can still tell them apart in the store, but there is nothing different about installing one over another.

---

## The store

The store ships with Spicetify. Open Spotify and click **Module Store** in the sidebar.

- **Browse** by tab (extensions, themes, snippets, apps), search, or sort by installs.
- **Install** with one click. Most modules load immediately; a module that has to run before the client boots says it needs a restart.
- **Manage** what you have from the Installed tab: enable, disable, update or remove.
- **Details** shows the description, authors, the source repository, and the license the code is published under.

Every module in the store comes from a single registry, and every entry in it was validated before it merged: the artifact is downloaded and re-hashed, the card is checked against the module's own metadata, and a published version can never be repointed at different bytes afterwards. The store verifies the checksum again when it installs, and refuses the install on a mismatch.

### Updates

The store shows what has a newer version, and **Update all** installs them in dependency order. Nothing updates behind your back.

### Backups

Export writes a small file listing your preferences and which modules you have installed. Import restores the preferences and reinstalls those modules from the registry, verified the same way as any other install. The file never contains module code, so importing one cannot install something the registry does not carry.

---

## From the terminal

The same catalog, without leaving the shell:

```bash
spicetify pkg install trashbin        # unpack it
spicetify pkg enable trashbin@0.2.0   # point the client at that version
spicetify apply                        # stage it into the client
```

`pkg install` on its own is inert. It unpacks the module and marks it installed, but nothing points at it until `pkg enable`, and nothing reaches the client until `apply`.

```bash
spicetify pkg list                     # what is installed, with versions
spicetify pkg delete trashbin          # remove it
```

To install something that is not in the store, name the artifact directly:

```bash
spicetify pkg install my-module https://example.com/my-module@1.0.0.zip
```

That bypasses the registry, so there is no checksum to hold it to and no review behind it. The CLI says so, and prints the digest it got.

---

## Themes

Themes are modules tagged `theme`, with one rule of their own: **exactly one theme is active at a time**. Enabling a theme unloads the previous one, so there is never an overlap and never a half-applied look.

Many themes ship several colour **schemes**. Switch scheme from the theme's entry in the store, or from the Spicetify section of Spotify's own settings page. Scheme changes apply immediately, with no re-apply and no restart.

If a theme leaves the client looking wrong, disable it from the Installed tab and the client returns to its stock appearance straight away.

---

## Rolling back

Installed versions are kept side by side, so going back to a version that worked is one command:

```bash
spicetify pkg enable my-module@1.2.0
spicetify apply
```

---

## When a module is withdrawn

The registry can revoke a module (a security problem, a takedown). A revoked module stops being offered, and the store disables it in your client and tells you why rather than leaving it running quietly.

---

## Where modules live on disk

```bash
spicetify path
```

Under the config folder, `store/<id>/<version>/` holds the unpacked releases and `modules/<id>` points at the one that is enabled. `config.toml` sits beside them. If `modules/<id>` is a real directory rather than a link, it is a local build you staged yourself, and `apply` uses that instead of anything the store installed.
