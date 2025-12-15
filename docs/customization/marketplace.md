---
title: Marketplace
description: Browse and install themes, extensions, and snippets from Spotify.
---

The Spicetify Marketplace is a built-in store that lets you browse, install, and manage customizations directly from Spotify.

## Installation

If you followed the [Getting Started](/docs/getting-started) guide, Marketplace is already installed. If not:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="windows" label="Windows" default>

```powershell
iwr -useb https://raw.githubusercontent.com/spicetify/marketplace/main/resources/install.ps1 | iex
```

</TabItem>
<TabItem value="linux-macos" label="Linux / macOS">

```bash
curl -fsSL https://raw.githubusercontent.com/spicetify/marketplace/main/resources/install.sh | sh
```

</TabItem>
</Tabs>

## Using Marketplace

After installation, you'll see a **Marketplace** item in Spotify's sidebar. Click it to open the store.

### Browsing

The Marketplace has several tabs:

- **Extensions**: Add features like lyrics display, keyboard shortcuts, and more
- **Themes**: Change Spotify's visual appearance
- **Snippets**: Small CSS tweaks for minor visual adjustments

Use the search bar to find specific items, or browse by category.

### Installing

1. Click on any item to see its details
2. Click **Install** to add it to your Spotify
3. The change takes effect immediately (no restart needed for most items)

### Managing Installed Items

Click the **Installed** tab to see everything you've added. From here you can:

- **Enable/Disable**: Toggle items on and off without uninstalling
- **Uninstall**: Remove items completely
- **Update**: Apply updates when available (indicated by a badge)

## Marketplace vs Manual

| Feature | Marketplace | Manual |
|---------|-------------|--------|
| One-click install | Yes | No |
| Automatic updates | Yes | No |
| Built-in extensions | Some | All |
| Custom/local files | No | Yes |
| Fine-grained control | Limited | Full |

For built-in extensions that ship with Spicetify (like Full App Display, Keyboard Shortcuts, etc.), see the **[Extensions](./extensions.md)** page for manual installation instructions.

## Troubleshooting

### Marketplace not showing in sidebar

1. Make sure you ran the Marketplace install script
2. Run `spicetify apply` to ensure changes are applied
3. Restart Spotify

### Items not installing

1. Check your internet connection
2. Try running `spicetify restore backup apply` to refresh the installation
3. Check the [GitHub Issues](https://github.com/spicetify/marketplace/issues) for known problems

### Marketplace disappeared after Spotify update

After Spotify updates, you may need to re-apply Spicetify:

```bash
spicetify backup apply
```
