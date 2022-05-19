---
title: Uninstallation
description: 🗑 How to remove Spicetify.
---

## Windows

### Command Prompt (Administrator)
```cmd
spicetify restore
rmdir %userprofile%\.spicetify\ /S
rmdir %userprofile%\spicetify-cli\ /S
```

## Linux and MacOS
```bash
spicetify restore
rm -rf ~/.spicetify
rm -rf ~/.config/spicetify
```
