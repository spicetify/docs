---
title: Compiling
description: 🧰 Compiling Spicetify.
---

### Requirements

- [Go](https://golang.org/dl/)

Clone repo and download dependencies:

```bash
cd $HOME
mkdir spicetify
cd spicetify
git clone https://github.com/spicetify/cli
```

### Build

#### Windows

```powershell
cd $HOME\spicetify\cli
go build -o spicetify.exe
```

#### Linux and MacOS

```bash
cd ~/spicetify/cli
go build -o spicetify
```
