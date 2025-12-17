---
title: Getting Started
sidebar_position: 1
---

Spicetify is a multiplatform command-line tool to customize the official Spotify client.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation

### Windows

<Tabs>
<TabItem value="powershell" label="PowerShell (Recommended)" default>

```powershell
iwr -useb https://raw.githubusercontent.com/spicetify/cli/main/install.ps1 | iex
```

</TabItem>
<TabItem value="winget" label="Winget">

```powershell
winget install Spicetify.Spicetify
```

</TabItem>
<TabItem value="scoop" label="Scoop">

```powershell
scoop install spicetify-cli
```

</TabItem>
<TabItem value="chocolatey" label="Chocolatey">

```powershell
choco install spicetify-cli
```

See the [Chocolatey package page](https://chocolatey.org/packages/spicetify-cli) for more details.

</TabItem>
</Tabs>

#### Spotify from Scoop

If you installed Spotify via Scoop, find its location and set it in your config:

```console
$ scoop prefix spotify
C:\Users\<username>\scoop\apps\spotify\current
```

```powershell
spicetify config spotify_path "C:\Users\<username>\scoop\apps\spotify\current"
```

### Linux

<Tabs>
<TabItem value="shell" label="Shell Script (Recommended)" default>

```bash
curl -fsSL https://raw.githubusercontent.com/spicetify/cli/main/install.sh | sh
```

</TabItem>
<TabItem value="homebrew" label="Homebrew">

```bash
brew install spicetify-cli
```

</TabItem>
<TabItem value="aur" label="AUR (Arch)">

```bash
yay -S spicetify-cli
```

</TabItem>
</Tabs>

#### Linux-Specific Setup

Depending on how you installed Spotify, you may need additional configuration.

<details>
<summary>Spotify from AUR</summary>

Grant write permissions to Spotify's directory:

```bash
sudo chmod a+wr /opt/spotify
sudo chmod a+wr /opt/spotify/Apps -R
```

</details>

<details>
<summary>Spotify from spotify-launcher (Arch)</summary>

The `spotify-launcher` package installs Spotify to a user directory. Set the path in your config:

```bash
spicetify config spotify_path "$HOME/.local/share/spotify-launcher/install/usr/share/spotify"
```

:::warning
When setting config values, use the full absolute path (e.g., `/home/username/...`). The `~` shortcut works in shell commands but not in config values.
:::

</details>

<details>
<summary>Spotify from Snap</summary>

Snap apps cannot be modified. You'll need to switch to the apt version:

1. Remove Snap Spotify:

   ```bash
   snap remove spotify
   ```

2. Install via apt:

   ```bash
   curl -sS https://download.spotify.com/debian/pubkey_C85668DF69375001.gpg | sudo gpg --dearmor --yes -o /etc/apt/trusted.gpg.d/spotify.gpg
   echo "deb http://repository.spotify.com stable non-free" | sudo tee /etc/apt/sources.list.d/spotify.list
   sudo apt-get update && sudo apt-get install spotify-client
   ```

3. Grant permissions:

   ```bash
   sudo chmod a+wr /usr/share/spotify
   sudo chmod a+wr /usr/share/spotify/Apps -R
   ```

</details>

<details>
<summary>Spotify from Flatpak</summary>

1. Find your Flatpak Spotify location:

   ```bash
   flatpak --installations
   ```

   Common locations:
   - `/var/lib/flatpak/app/com.spotify.Client/x86_64/stable/active/files/extra/share/spotify/`
   - `~/.local/share/flatpak/app/com.spotify.Client/x86_64/stable/active/files/extra/share/spotify/`

2. Set the path:

   ```bash
   spicetify config spotify_path "/var/lib/flatpak/app/com.spotify.Client/x86_64/stable/active/files/extra/share/spotify"
   ```

3. Find and set your prefs file (check both locations):

   ```bash
   # Check which exists:
   ls ~/.config/spotify/prefs
   ls ~/.var/app/com.spotify.Client/config/spotify/prefs

   # Set whichever exists (use the full absolute path):
   spicetify config prefs_path /home/username/.var/app/com.spotify.Client/config/spotify/prefs
   ```

4. Grant permissions:

   ```bash
   sudo chmod a+wr /var/lib/flatpak/app/com.spotify.Client/x86_64/stable/active/files/extra/share/spotify
   sudo chmod a+wr -R /var/lib/flatpak/app/com.spotify.Client/x86_64/stable/active/files/extra/share/spotify/Apps
   ```

</details>

### macOS

<Tabs>
<TabItem value="shell" label="Shell Script (Recommended)" default>

```bash
curl -fsSL https://raw.githubusercontent.com/spicetify/cli/main/install.sh | sh
```

</TabItem>
<TabItem value="homebrew" label="Homebrew">

```bash
brew install spicetify-cli
```

After installing via Homebrew, set the Spotify path:

```bash
spicetify config spotify_path "/Applications/Spotify.app/Contents/Resources"
```

</TabItem>
</Tabs>

---

## Before First Run

:::tip
If this is a fresh Spotify install, open Spotify and log in for at least 60 seconds before running Spicetify. This allows Spotify to generate the files that Spicetify needs to function.
:::

---

## Marketplace

The [Spicetify Marketplace](https://github.com/spicetify/marketplace) gives you a tab in Spotify's sidebar to browse and install themes, extensions, and snippets.

<Tabs>
<TabItem value="windows-mp" label="Windows" default>

```powershell
iwr -useb https://raw.githubusercontent.com/spicetify/marketplace/main/resources/install.ps1 | iex
```

</TabItem>
<TabItem value="linux-macos-mp" label="Linux / macOS">

```bash
curl -fsSL https://raw.githubusercontent.com/spicetify/marketplace/main/resources/install.sh | sh
```

</TabItem>
</Tabs>

---

## Basic Usage

After installing Spicetify and Marketplace, you can customize Spotify using themes and extensions from the Marketplace tab in Spotify's sidebar.

### Updating

Spotify updates periodically. After a Spotify update, you'll need to re-apply Spicetify:

```bash
spicetify backup apply
```

If that doesn't work, Spicetify itself may need an upgrade:

```bash
spicetify upgrade
```

If you updated Spicetify via a package manager (Homebrew, AUR, etc.) or the upgrade command didn't fully apply changes, run:

```bash
spicetify restore backup apply
```

If no Spicetify upgrade is available yet, the team is likely still working on compatibility with the new Spotify version.

---

## Legacy Versions

If you need an older Spicetify version (e.g., for Spotify v1.1.56 or older):

<Tabs>
<TabItem value="windows-legacy" label="Windows" default>

```powershell
$v="1.2.1"; Invoke-WebRequest -UseBasicParsing "https://raw.githubusercontent.com/spicetify/cli/main/install.ps1" | Invoke-Expression
```

</TabItem>
<TabItem value="linux-legacy" label="Linux / macOS">

```bash
curl -fsSL https://raw.githubusercontent.com/spicetify/cli/main/install.sh -o /tmp/install.sh
sh /tmp/install.sh 1.2.1
```

</TabItem>
</Tabs>

Legacy resources:
- [Spicetify v1 source (legacy branch)](https://github.com/spicetify/cli/tree/legacy)
- [Legacy themes](https://github.com/spicetify/spicetify-themes/tree/legacy)
