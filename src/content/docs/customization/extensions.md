---
title: Extensions
description: Add features to Spotify with extensions.
---

Extensions are JavaScript files that add new features to Spotify. They run alongside Spotify's main code and can add buttons, modify behavior, and integrate with external services.

## Installing Extensions

### Via Marketplace

The easiest way to install extensions is through the **[Marketplace](./marketplace.md)**. Open Marketplace from Spotify's sidebar and browse the Extensions tab.

### Manual Installation

For extensions not in Marketplace, or for Spicetify's built-in extensions:

1. Place the extension file in your Extensions folder:

   | Platform | Path |
   |----------|------|
   | **Windows** | `%appdata%\spicetify\Extensions\` |
   | **Linux / macOS** | `~/.config/spicetify/Extensions/` |

2. Enable the extension:

   ```bash
   spicetify config extensions <filename.js>
   spicetify apply
   ```

:::tip
The `config extensions` command **appends** to your existing extensions. It doesn't replace them.
:::

## Removing Extensions

To remove an extension, append a `-` after the filename:

```bash
spicetify config extensions <filename.js>-
spicetify apply
```

## Manual Config Editing

You can also edit the config file directly. Extensions are listed in the `extensions` key, separated by `|`:

```ini
[AdditionalOptions]
extensions = fullAppDisplay.js|keyboardShortcut.js|trashbin.js
```

After editing, run `spicetify apply`.

---

## Built-in Extensions

These extensions ship with Spicetify and are available immediately after installation.

### Full App Display

A minimal, full-screen album art display with blur effect background.

**Filename:** `fullAppDisplay.js`

```bash
spicetify config extensions fullAppDisplay.js
spicetify apply
```

**Usage:** Click the button in the top bar to activate. Double-click anywhere to exit. Right-click to open settings.

![Full App Display](/images/extensions/full-app-display.png)

---

### Keyboard Shortcut

Extends Spotify's keyboard shortcuts with vim-like navigation.

**Filename:** `keyboardShortcut.js`

```bash
spicetify config extensions keyboardShortcut.js
spicetify apply
```

**Shortcuts:**
- <kbd>Ctrl</kbd> + <kbd>Tab</kbd> / <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Tab</kbd>: Navigate sidebar items
- <kbd>Page Up</kbd> / <kbd>Page Down</kbd>: Scroll the main page
- <kbd>J</kbd> / <kbd>K</kbd>: Scroll down/up (vim-style)
- <kbd>G</kbd> / <kbd>Shift</kbd> + <kbd>G</kbd>: Jump to top/bottom
- <kbd>F</kbd>: Open keyboard-driven navigation

![Keyboard Shortcut](/images/extensions/keyboard-demo.png)

---

### Bookmark

Save and quickly access pages, tracks, or specific timestamps.

**Filename:** `bookmark.js`

```bash
spicetify config extensions bookmark.js
spicetify apply
```

**Usage:** Useful for bookmarking artists, albums, or playlists to check out later without following them.

![Bookmark](/images/extensions/bookmark.png)

---

### Trash Bin

Skip songs or artists automatically. They'll never play again.

**Filename:** `trashbin.js`

```bash
spicetify config extensions trashbin.js
spicetify apply
```

**Usage:** Right-click any track or artist and select "Throw to Trashbin". Trashed items are automatically skipped.

![Trash Bin](/images/extensions/trash.png)

---

### Shuffle+

True shuffle using the Fisher-Yates algorithm (zero bias).

**Filename:** `shuffle+.js`

```bash
spicetify config extensions shuffle+.js
spicetify apply
```

**Usage:** Right-click any album, playlist, or artist and select "Play with Shuffle+". Also works with multi-selected tracks.

![Shuffle+](/images/extensions/shuffle.png)

---

### Loopy Loop

Loop a specific portion of a track.

**Filename:** `loopyLoop.js`

```bash
spicetify config extensions loopyLoop.js
spicetify apply
```

**Usage:** Mark start and end points on the progress bar to loop that section automatically.

![Loopy Loop](/images/extensions/loopy-loop.png)

---

### Pop-up Lyrics

Display lyrics in a separate pop-up window.

**Filename:** `popupLyrics.js`

```bash
spicetify config extensions popupLyrics.js
spicetify apply
```

**Usage:** Click the microphone icon in the top bar. Right-click for settings and lyrics provider options.

![Pop-up Lyrics](/images/extensions/popup-lyrics.png)

:::note
If lyrics aren't loading, see the [FAQ](/docs/faq#sometimes-popup-lyrics-andor-lyrics-plus-seem-to-not-work) for Musixmatch token instructions.
:::

---

### Auto Skip Videos

Automatically skip video content that can't play in your region.

**Filename:** `autoSkipVideo.js`

```bash
spicetify config extensions autoSkipVideo.js
spicetify apply
```

**Why:** Some video content is region-locked. Without this extension, playback just stops instead of moving to the next track.

---

### Christian Spotify

Automatically skip explicit tracks.

**Filename:** `autoSkipExplicit.js`

```bash
spicetify config extensions autoSkipExplicit.js
spicetify apply
```

**Usage:** Toggle in the profile menu (top-right button).

![Christian Spotify](/images/extensions/christian-demo.png)

---

### Web Now Playing

Send track metadata to Rainmeter's WebNowPlaying plugin.

**Filename:** `webnowplaying.js`

```bash
spicetify config extensions webnowplaying.js
spicetify apply
```

**For minimal setup** (no UI changes):

```bash
spicetify config inject_css 0 replace_colors 0
spicetify config extensions webnowplaying.js
spicetify apply
```

---

## Creating Extensions

Want to build your own extension? See the **[Development Guide](/docs/development)** and **[Spicetify Creator](/docs/development/spicetify-creator)** for tools and tutorials.
