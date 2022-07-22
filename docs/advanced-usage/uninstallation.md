---
title: Uninstallation
description: 🗑 How to remove Spicetify.
---

## Windows

### Powershell
```cmd
spicetify restore
rmdir -r -fo $env:APPDATA\spicetify
rmdir -r -fo $env:LOCALAPPDATA\spicetify
```

## Linux and MacOS
```bash
spicetify restore
rm -rf ~/.spicetify
rm -rf ~/.config/spicetify
```
