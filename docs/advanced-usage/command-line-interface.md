---
title: Command Line Interface (CLI)
description: 👾 Using Spicetify from the command line.
---

Run with no command once to generate config file

```bash
spicetify
```

If you just want to use Custom Apps and Extensions head over to each specific section, if you want to create your own theme, keep reading below.

Make sure config file is created successfully and there is no error, then run:

```bash
spicetify backup apply enable-devtools
```

From now, after changing colors in `color.ini` or CSS in `user.css`, you just need to run:

```bash
spicetify update
```

to update your theme.

In Spotify, hit <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>R</kbd> / <kbd>Command</kbd> <kbd>Shift</kbd> <kbd>R</kbd> to reload and receive visual update of your theme.

For other commands and additional flags information, please run:

```bash
spicetify --help
```
