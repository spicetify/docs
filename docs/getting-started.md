---
title: Getting Started
sidebar_position: 1
---

Spicetify is a multiplatform command-line tool to customize the official Spotify client.

## Installation

### Windows

This is the installation method what we recommend for most users. It is the fastest and most reliable way to install Spicetify. It also includes the [**Spicetify Marketplace**](https://github.com/spicetify/spicetify-marketplace) that gives you access to a tab in Spotify's sidebar that allows you to search for and install _themes_, _extensions_ and _snippets_.

#### Powershell (pre-built binary)

```powershell
Invoke-WebRequest -UseBasicParsing "https://raw.githubusercontent.com/spicetify/spicetify-cli/master/install.ps1" | Invoke-Expression
Invoke-WebRequest -UseBasicParsing "https://raw.githubusercontent.com/spicetify/spicetify-marketplace/master/install.ps1" | Invoke-Expression
```

### Linux and MacOS

#### Shell (pre-built binary)

```bash
curl -fsSL https://raw.githubusercontent.com/spicetify/spicetify-cli/master/install.sh | sh
curl -fsSL https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/install.sh | sh
```

<hr/>

- ⚠️ Sometimes Spotify upgrades things that break Spicetify.<br/>
- ⚠️ When this happens we need to update Spicetify, and you may need to run `spicetify upgrade`.<br/>
- ⚠️ After this command, run `spicetify restore backup apply` to have everything back where it was.

## Basic Usage

After installing Spicetify, and the Spicetify's Marketplace, you can now use it to customize your Spotify client using all the available **extensions** and **themes** found in the Marketplace.

### Updating

Spotify, every now and then, updates its client. Since we have no power over this process, you will likely need to re-apply Spicetify. 

However, the update might have major changes to the client, which means you will need to run run `spicetify upgrade` every time you update Spotify, if no update for Spicetify is available, it means that it either still works by simply running `spicetify backup apply`, or that we are still working on updating Spicetify.

After running `spicetify upgrade`, you will be prompted to run `spicetify restore backup apply` to have everything back where it was.
