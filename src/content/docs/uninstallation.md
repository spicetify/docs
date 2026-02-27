---
title: Uninstallation
description: How to remove Spicetify from your system.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Quick Uninstall

<Tabs>
<TabItem value="windows" label="Windows" default>

```powershell
spicetify restore
rmdir -r -fo $env:APPDATA\spicetify
rmdir -r -fo $env:LOCALAPPDATA\spicetify
```

</TabItem>
<TabItem value="linux-macos" label="Linux / macOS">

```bash
spicetify restore
rm -rf ~/.spicetify
rm -rf ~/.config/spicetify
```

</TabItem>
</Tabs>

## Step by Step

### 1. Restore Spotify

First, remove Spicetify modifications from Spotify:

```bash
spicetify restore
```

This returns Spotify to its vanilla state.

### 2. Remove Spicetify Files

<Tabs>
<TabItem value="windows-files" label="Windows" default>

Remove the config and data directories:

```powershell
rmdir -r -fo $env:APPDATA\spicetify
rmdir -r -fo $env:LOCALAPPDATA\spicetify
```

</TabItem>
<TabItem value="linux-macos-files" label="Linux / macOS">

Remove the config and data directories:

```bash
rm -rf ~/.spicetify
rm -rf ~/.config/spicetify
```

</TabItem>
</Tabs>

### 3. Remove the Binary (Optional)

If you installed via a package manager, use it to uninstall:

| Method | Uninstall Command |
|--------|-------------------|
| Scoop | `scoop uninstall spicetify-cli` |
| Winget | `winget uninstall Spicetify.Spicetify` |
| Chocolatey | `choco uninstall spicetify-cli` |
| Homebrew | `brew uninstall spicetify-cli` |
| AUR | `yay -R spicetify-cli` |

If you used the install script, the binary is in your PATH. You can find and remove it:

<Tabs>
<TabItem value="windows-binary" label="Windows" default>

```powershell
where spicetify
# Remove the file shown
```

</TabItem>
<TabItem value="linux-macos-binary" label="Linux / macOS">

```bash
which spicetify
# Remove the file shown, e.g.:
rm $(which spicetify)
```

</TabItem>
</Tabs>

## Keeping Configuration

If you might reinstall later and want to keep your settings:

```bash
spicetify restore
```

This removes Spicetify from Spotify but preserves your config file, themes, and extensions.
