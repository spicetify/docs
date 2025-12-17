---
title: Themes
description: Change Spotify's visual appearance with themes.
---

Themes let you customize Spotify's colors, fonts, and visual styling. From subtle tweaks to complete visual overhauls, themes are one of the most popular Spicetify features.

## Installing Themes

### Via Marketplace

The easiest way to install themes is through the **[Marketplace](./marketplace.md)**. Open Marketplace from Spotify's sidebar and browse the Themes tab.

### Manual Installation

For themes not in Marketplace:

1. Download the theme folder (should contain `color.ini` and `user.css`)

2. Place it in your Themes folder:

   | Platform | Path |
   |----------|------|
   | **Windows** | `%appdata%\spicetify\Themes\` |
   | **Linux / macOS** | `~/.config/spicetify/Themes/` |

3. Apply the theme:

   ```bash
   spicetify config current_theme <theme-folder-name>
   spicetify apply
   ```

### Color Schemes

Many themes include multiple color schemes. To use a specific scheme:

```bash
spicetify config current_theme <theme-folder-name> color_scheme <scheme-name>
spicetify apply
```

Check the theme's `color.ini` file to see available schemes (each `[SectionName]` is a scheme).

## Removing Themes

To go back to Spotify's default appearance, set the theme to an empty value:

```bash
spicetify config current_theme ""
spicetify apply
```

Or set a different theme name.

---

## Community Themes

The Spicetify community has created many themes. Here are some popular repositories:

### Official Repository

The official collection, open for contributions:

- **[spicetify/spicetify-themes](https://github.com/spicetify/spicetify-themes)**

### Popular Third-Party Themes

| Theme | Description |
|-------|-------------|
| [Comfy](https://github.com/NYRI4/Comfy-spicetify) | Comfortable, modern design |
| [Fluent](https://github.com/williamckha/spicetify-fluent) | Windows 11 Fluent Design style |
| [Catppuccin](https://github.com/catppuccin/spicetify) | Soothing pastel color palette |
| [Bloom](https://github.com/nimsandu/spicetify-bloom) | Gradient-heavy, vibrant look |
| [Lucid](https://github.com/sanoojes/spicetify-lucid) | Clean, minimal aesthetic |
| [Gruvify](https://github.com/Skaytacium/Gruvify) | Gruvbox color scheme |
| [Spotify Dark](https://github.com/SyndiShanX/Spotify-Dark) | Enhanced dark theme |
| [Throwback](https://github.com/bluedrift/Spicetify-Throwback) | Classic Spotify look |
| [SpicetifyCat](https://github.com/Adrien5902/SpicetifyCat) | Cat-themed customization |
| [RetroPlayer](https://github.com/Seglats/Spicetify-retro) | Retro aesthetic |
| [Dracula (m0squdev)](https://github.com/m0squdev/dracula-spicetify-theme) | Dracula color palette |

### Unmaintained (May Not Work)

These themes may not work with current Spotify versions:

- [Nord-Spotify](https://github.com/Tetrax-10/Nord-Spotify)
- [Dribbblish Dynamic](https://github.com/JulienMaille/dribbblish-dynamic-theme)
- [Dracula (official)](https://github.com/dracula/spicetify)

---

## Creating Themes

Want to create your own theme? See the **[Theme Development Guide](/docs/development/themes)**.

A basic theme needs two files:

- `color.ini`: Color values that become CSS variables
- `user.css`: Custom CSS rules

Example `color.ini`:

```ini
[Base]
main           = 121212
sidebar        = 000000
player         = 181818
card           = 282828
shadow         = 000000
selected-row   = 797979
button         = 1db954
button-active  = 1ed760
text           = ffffff
subtext        = b3b3b3
```

---

## Troubleshooting

### Theme not applying

1. Make sure the theme folder name matches what you used in `spicetify config`
2. Verify the folder contains both `color.ini` and `user.css`
3. Run `spicetify apply` after any config changes

### Theme looks broken after Spotify update

After Spotify updates, themes may need adjustment. Try:

```bash
spicetify restore backup apply
```

If issues persist, check the theme's repository for updates or reported issues.

### Colors not changing

Make sure you're setting both the theme and color scheme:

```bash
spicetify config current_theme MyTheme color_scheme Dark
spicetify apply
```
