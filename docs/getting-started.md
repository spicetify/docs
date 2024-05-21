---
title: Getting Started
sidebar_position: 1
---

Spicetify is a multiplatform command-line tool to customize the official Spotify client.

## Installation

### Windows

This is the installation method we recommend for most users. It is the fastest and most reliable way to install Spicetify. 

#### Powershell (pre-built binary)

```powershell
iwr -useb https://raw.githubusercontent.com/spicetify/cli/main/install.ps1 | iex
```

Also run the following if you would like to install the [**Spicetify Marketplace**](https://github.com/spicetify/marketplace), which gives you access to a tab in Spotify's sidebar that allows you to search for and install _themes_, _extensions_, and _snippets_.
```powershell
iwr -useb https://raw.githubusercontent.com/spicetify/marketplace/main/resources/install.ps1 | iex
```

### Linux and MacOS

#### Shell (pre-built binary)
Spicetify CLI
```sh
curl -fsSL https://raw.githubusercontent.com/spicetify/cli/main/install.sh | sh
```
Spicetify Marketplace
```sh
curl -fsSL https://raw.githubusercontent.com/spicetify/marketplace/main/resources/install.sh | sh
```

<hr/>

## Basic Usage

After installing Spicetify and Spicetify's Marketplace, you can use it to customize your Spotify client using all the available **extensions** and **themes** found in the Marketplace.

### Updating

**_Spotify_**, every now and then, **updates** its client. Since we have no power over this process, you will likely need to **re-apply Spicetify**.

However, the update might have major changes to the client, which means you will need to run `spicetify update` (`spicetify upgrade` in Spicetify versions **below 2.27.0**) every time you update Spotify. If no update for Spicetify is available, it means that it either still works by simply running `spicetify backup apply`, or that we are still **working on updating Spicetify** to work on the new version.
