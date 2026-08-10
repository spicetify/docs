---
title: Uninstallation
description: Remove Spicetify v3 and put stock Spotify back.
sidebar_position: 6
---

## Put Spotify back

```bash
spicetify restore
```

That undoes the patch and returns the stock client. Restore with the same CLI that applied: v2 and v3 keep their backups differently, so the v2 binary cannot undo a v3 apply.

If you only wanted to stop a module misbehaving, you do not need any of this: disable it from the store's Installed tab, or `spicetify pkg delete <id>`.

---

## Stop the daemon

```bash
spicetify daemon stop
spicetify daemon uninstall
```

`stop` also unloads the service, so it does not come back on its own. `uninstall` removes it entirely.

---

## Remove the files

`spicetify path` prints where everything is. Removing the config folder removes your configuration, every installed module and the store's record of them.

```bash
rm -rf ~/.config/spicetify   # Linux and macOS, if that is what `spicetify path` reported
```

On Windows, delete the folder `spicetify path` names.

:::note
If you plan to reinstall, keep the folder. Reinstalling with it intact brings back every module you had, at the versions you had.
:::

---

## Remove the binary

If you installed with the script, everything lives in one directory:

```bash
rm -rf ~/.spicetify
```

Then remove the `PATH` entry the installer added to your shell profile. If you installed through a package manager, uninstall through it instead.

On macOS, `apply` also created `~/Applications/Spicetify.app`, the small bundle that receives `spicetify://` links. Delete it too.

---

## Going back to v2

Restore with v3 first, then install v2 and apply with it. Your v2 configuration (`config-xpui.ini`) was never touched, so it is exactly as you left it. See the [v2 guide](/docs/legacy/getting-started).
