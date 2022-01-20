---
title: Simple Installation
sidebar_position: 1
---

## Windows

This is the installation method what we recommend for most users. It is the fastest and most reliable way to install Spicetify. It also includes the **Spicetify Marketplace** that gives you access to a tab in Spotify's sidebar that allows you to search for and install _themes_, _extensions_ and _snippets_.

### Powershell (pre-built binary)

```powershell
Invoke-WebRequest -UseBasicParsing "https://raw.githubusercontent.com/khanhas/spicetify-cli/master/install.ps1" | Invoke-Expression
Invoke-WebRequest -UseBasicParsing "https://raw.githubusercontent.com/CharlieS1103/spicetify-marketplace/master/install.ps1" | Invoke-Expression
```

## Linux and MacOS

### Shell (pre-built binary)

```bash
curl -fsSL https://raw.githubusercontent.com/khanhas/spicetify-cli/master/install.sh | sh
curl -fsSL https://raw.githubusercontent.com/CharlieS1103/spicetify-marketplace/main/install.sh | sh
```

<hr/>

- ⚠️ Sometimes Spotify upgrades things that break Spicetify.<br/>
- ⚠️ When this happens we need to update Spicetify, and you may need to run `spicetify upgrade`.<br/>
- ⚠️ After this command, run `spicetify restore backup apply` to have everything back where it was.
