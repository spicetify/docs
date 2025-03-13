---
title: Installation
description: ⚡ An advanced view on how to install Spicetify.
---

## Windows

### Powershell (pre-built binary) - Recommended

```powershell
iwr -useb https://raw.githubusercontent.com/spicetify/cli/main/install.ps1 | iex
```

### Chocolatey

Follow this guide: https://chocolatey.org/packages/spicetify-cli

### Scoop

```powershell
scoop install spicetify-cli
```

#### Spotify installed from Scoop

- To find the location of your Spotify installation, run `scoop prefix spotify`.

```console
$ scoop prefix spotify
C:\Users\<username>\scoop\apps\spotify\current
```

After you have located it, set `spotify_path` to that directory in Spicetify's config file:

![scoop-spotify-path](https://user-images.githubusercontent.com/56180050/158084602-99428adf-93bb-4983-968f-14e1f4f5b253.png)

### Winget

```powershell
winget install Spicetify.Spicetify
```

## Linux and MacOS

### Shell (pre-built binary) - Recommended

```bash
curl -fsSL https://raw.githubusercontent.com/spicetify/cli/main/install.sh | sh
```

### Homebrew or LinuxBrew

```bash
brew install spicetify-cli
```

On macOS, you will need to set `spotify_path` to `/Applications/Spotify.app/Contents/Resources` in the `~/.config/spicetify/config-xpui.ini` config file.

### AUR

```bash
yay -S spicetify-cli
```

### Note for Linux users

#### Spotify installed from AUR

Before applying Spicetify, you need to gain write permission on Spotify files, by running command:

```bash
sudo chmod a+wr /opt/spotify
sudo chmod a+wr /opt/spotify/Apps -R
```

**Note:** Your Spotify client location might be different.

#### Spotify installed via `spotify-launcher` package (Arch Linux)

If Spotify is installed through the `spotify-launcher` package, then Spotify won't install to `/opt/spotify` and is instead in this folder: `$HOME/.local/share/spotify-launcher/install/usr/share/spotify/`

This directory will need to be added to the `spotify-path` section of the config (and you won't need to change any permissions like the AUR method). 

**Note:** `spotify-path` must be an absolute path. Do not use `~` to reference the home folder.

#### Spotify installed from Snap

Apps installed from Snap **cannot be modified** so you need to follow these steps to get Spicetify working:

1. Uninstall Spotify in Snap or run command `snap remove spotify`
2. Install Spotify using `apt`:

```sh
curl -sS https://download.spotify.com/debian/pubkey_C85668DF69375001.gpg | sudo gpg --dearmor --yes -o /etc/apt/trusted.gpg.d/spotify.gpg
echo "deb http://repository.spotify.com stable non-free" | sudo tee /etc/apt/sources.list.d/spotify.list
sudo apt-get update && sudo apt-get install spotify-client
```

3. After Spotify is installed successfully, you need to gain read write permissions on Spotify files, by running commands:

```bash
sudo chmod a+wr /usr/share/spotify
sudo chmod a+wr /usr/share/spotify/Apps -R
```

**Note:** Your Spotify client location might be different.

#### Spotify installed from Flatpak

- You need to find where Flatpak stores your Spotify client. In Manjaro and Fedora, it is stored in:

```
/var/lib/flatpak/app/com.spotify.Client/x86_64/stable/active/files/extra/share/spotify/
```

- In some distros it is stored in:
```
~/.local/share/flatpak/app/com.spotify.Client/x86_64/stable/active/files/extra/share/spotify/
```

- Yours might be different, try these steps:

1. Find flatpak installation place with command: `flatpak --installations`
2. Go to that directory and dig in until you find folder which contain items like these:

![flat2](https://user-images.githubusercontent.com/26436809/57563050-81408780-73dc-11e9-92e8-d0cc60502ff3.png)

After you have Spotify location, set `spotify_path` in config file to that directory:

![flat2](https://user-images.githubusercontent.com/26436809/57563057-9ddcbf80-73dc-11e9-82d8-d31cdf7e9cef.png)

3. Find your `prefs` file:
   It could be either in these two locations:

- `~/.config/spotify/prefs`
- `~/.var/app/com.spotify.Client/config/spotify/prefs`

Check both, expand the right one to absolute path and set it to `prefs_path` in config file.

```bash
spicetify config prefs_path ~/.var/app/com.spotify.Client/config/spotify/prefs
```

4. Finally in terminal, set read/write permission for it:

```bash
sudo chmod a+wr /var/lib/flatpak/app/com.spotify.Client/x86_64/stable/active/files/extra/share/spotify
sudo chmod a+wr -R /var/lib/flatpak/app/com.spotify.Client/x86_64/stable/active/files/extra/share/spotify/Apps
```

## Legacy Installations

If, for some reason, you are not using the most up to date Spotify client, you may need to install a specific version of Spicetify.
This is not recommended as our prime focus will always be the latest Spotify version.

As such, you will need to run either of the below commands with the desired version.
If you wish to use old Spotify client v1.1.56 or older, you have to install spicetify v1.2.1.

**Windows**: In powershell

```powershell
$v="1.2.1"; Invoke-WebRequest -UseBasicParsing "https://raw.githubusercontent.com/spicetify/cli/main/install.ps1" | Invoke-Expression
```

**Linux/MacOS:** In bash

```bash
curl -fsSL https://raw.githubusercontent.com/spicetify/cli/main/install.sh -o /tmp/install.sh
sh /tmp/install.sh 1.2.1
```

spicetify v1 code is available in branch [`legacy`](https://github.com/spicetify/cli/tree/legacy) if you want to build from source.

If you want legacy themes, you can find them [here](https://github.com/spicetify/spicetify-themes/tree/legacy).
