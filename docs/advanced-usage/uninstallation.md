---
title: Uninstallation
description: 🗑 How to remove Spicetify.
---

## Windows

### Powershell
```cmd
spicetify restore
rmdir -r -fo $env:USERPROFILE\.spicetify
rmdir -r -fo $env:USERPROFILE\spicetify-cli
```

## Linux and MacOS
```bash
spicetify restore
rm -rf ~/.spicetify
rm -rf ~/.config/spicetify
```
