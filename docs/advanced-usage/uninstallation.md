---
title: Uninstallation
description: ⚡ An advanced view on how to uninstall Spicetify.
---

## Windows

### Command Prompt (Administrator) - removal of spicetify
```cmd
spicetify restore
rmdir %userprofile%\.spicetify\ /S
rmdir %userprofile%\spicetify-cli\ /S
```

### Powershell (Administrator) - removal of paths
```powershell
$path = [System.Environment]::GetEnvironmentVariable("PATH", "User")
$replacement = ([System.Environment]::GetEnvironmentVariable("PATH", "User").Split(";") | Where-Object { $_.TrimEnd("") -ne "${HOME}\spicetify-cli" }) -join ";"
if ("$path".Contains("${HOME}\spicetify-cli")) {[Environment]::SetEnvironmentVariable("PATH", "${replacement}", "User")}
```

## Linux and MacOS
TBA
