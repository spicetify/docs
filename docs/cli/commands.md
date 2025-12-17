---
title: Commands
description: Complete Spicetify command reference.
---

This page documents all Spicetify CLI commands.

## Core Commands

### `spicetify` (no arguments)

Run with no arguments to generate the config file on first run, or verify your setup.

```bash
spicetify
```

### `backup`

Create a backup of vanilla Spotify files. Required before applying Spicetify for the first time.

```bash
spicetify backup
```

### `apply`

Apply Spicetify modifications to Spotify.

```bash
spicetify apply
```

This injects your theme, extensions, custom apps, and other modifications into Spotify.

### `restore`

Remove all Spicetify modifications and restore Spotify to vanilla state.

```bash
spicetify restore
```

Your config file and customization files are preserved.

### `update`

Hot-reload theme changes without full restart. Use this during theme development.

```bash
spicetify update
```

After running, press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> (or <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> on macOS) in Spotify to see changes.

### `upgrade`

Upgrade Spicetify to the latest version (only works with script-based installations).

```bash
spicetify upgrade
```

---

## Configuration Commands

### `config`

View or modify configuration values.

**View all settings:**

```bash
spicetify config
```

**View a specific setting:**

```bash
spicetify config current_theme
```

**Set a value:**

```bash
spicetify config current_theme Sleek
```

**Set multiple values:**

```bash
spicetify config current_theme Sleek color_scheme Dark
```

**Add to a list (extensions, custom_apps):**

```bash
spicetify config extensions fullAppDisplay.js
```

This appends to existing extensions, not replaces.

**Remove from a list:**

```bash
spicetify config extensions fullAppDisplay.js-
```

Note the trailing `-`.

### `config-dir`

Open the Spicetify config directory in your file manager.

```bash
spicetify config-dir
```

### `-c` / `--config`

Print the config file path.

```bash
spicetify -c
```

---

## Utility Commands

### `enable-devtools`

Enable Chromium DevTools in Spotify. Useful for debugging themes and extensions.

```bash
spicetify enable-devtools
```

Access DevTools with <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>.

### `watch`

Watch for theme changes and auto-apply. Useful during development.

```bash
spicetify watch
```

Monitors `color.ini` and `user.css` in your current theme folder.

### `path`

Print various Spicetify-related paths.

```bash
spicetify path
spicetify path userdata   # Config directory
spicetify path spotify    # Spotify installation
```

### `auto`

Automatically backup (if needed) and apply, then launch Spotify.

```bash
spicetify auto
```

Useful as a shortcut target instead of the Spotify executable.

---

## Combined Commands

Commands can be combined in a single call:

```bash
# First-time setup
spicetify backup apply enable-devtools

# After Spotify updates
spicetify backup apply

# Full restore and reapply
spicetify restore backup apply
```

---

## Flags

### `--help` / `-h`

Show help for a command.

```bash
spicetify --help
spicetify --help config
```

### `--version` / `-v`

Show Spicetify version.

```bash
spicetify --version
```

### `--no-restart`

Apply changes without restarting Spotify.

```bash
spicetify apply --no-restart
```

### `--quiet` / `-q`

Suppress non-error output.

```bash
spicetify apply -q
```

### `--extension` / `-e`

Specify a single extension to apply (useful for testing).

```bash
spicetify apply -e myExtension.js
```

---

## Examples

### Fresh Install Workflow

```bash
# Install Spicetify (see Installation page)
# Generate config
spicetify

# First-time setup
spicetify backup apply enable-devtools
```

### Enable an Extension

```bash
spicetify config extensions fullAppDisplay.js
spicetify apply
```

### Change Theme

```bash
spicetify config current_theme Sleek color_scheme Dark
spicetify apply
```

### After Spotify Updates

```bash
spicetify backup apply
```

### Theme Development

```bash
# One-time: apply your theme
spicetify config current_theme MyTheme
spicetify apply

# During development: watch for changes
spicetify watch
```
