---
title: Themes
description: ✨ Creating Themes for Spicetify.
---

There are 2 places you can put your themes:

1. `Themes` folder in Home directory

| Platform            | Path                              |
| ------------------- | --------------------------------- |
| **Windows**         | `%appdata%\spicetify\Themes`      |
| **Linux**/**MacOS** | `~/.config/spicetify/Themes`      |

2. `Themes` folder in Spicetify executable directory

If there are 2 themes with the same name, the theme in the Home directory is prioritized.

Every theme should contain:

- `color.ini`: stores colors values that later will be converted to CSS variables
- `user.css`: set of custom CSS rules to manipulate, hide, move UI elements.

Color value can be in several formats and forms:

- Hex: e.g `#FF0000`, `#1258F6`, `#F55`
- Decimal: e.g `255,255,255`, `50,80,120`
- Environment variables can be used in place of color.

  - Syntax: `${<variable name>}`
  - Example usage: `text = ${LIGHT_GREY}`

- **[Linux]** You can use XResources variable in place of color. Extremely useful for who uses `pywal` to generate color scheme.
  - Syntax: `${xrdb:<variable name>}` or `${xrdb:<variable name>:<fallback value>}`
  - Example usage:

```
[Base]
text     = ${xrdb:color14}
subtext  = ${xrdb:foreground:#FFF}
player   = ${xrdb:background}
...
```
