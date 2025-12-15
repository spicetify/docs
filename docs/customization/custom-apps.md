---
title: Custom Apps
description: Add new pages to Spotify's sidebar with custom apps.
---

Custom Apps are JavaScript applications that add entirely new pages to Spotify's sidebar. Unlike extensions (which modify existing behavior), custom apps create standalone experiences within Spotify.

## Installing Custom Apps

### Via Marketplace

Some custom apps are available through the **[Marketplace](./marketplace.md)**. Open Marketplace from Spotify's sidebar to browse.

### Manual Installation

1. Download or create the custom app folder (must contain at minimum `index.js` and `manifest.json`)

2. Place it in your CustomApps folder:

   | Platform | Path |
   |----------|------|
   | **Windows** | `%appdata%\spicetify\CustomApps\` |
   | **Linux / macOS** | `~/.config/spicetify/CustomApps/` |

3. Enable the custom app:

   ```bash
   spicetify config custom_apps <folder-name>
   spicetify apply
   ```

:::tip
The `config custom_apps` command **appends** to your existing custom apps. It doesn't replace them.
:::

## Removing Custom Apps

To remove a custom app, append a `-` after the folder name:

```bash
spicetify config custom_apps <folder-name>-
spicetify apply
```

## Manual Config Editing

You can also edit the config file directly. Custom apps are listed in the `custom_apps` key, separated by `|`:

```ini
[AdditionalOptions]
custom_apps = reddit|lyrics-plus|new-releases
```

After editing, run `spicetify apply`.

---

## Built-in Custom Apps

These custom apps ship with Spicetify and are available immediately.

### Lyrics Plus

Advanced lyrics display with multiple providers (Musixmatch, Netease, LRCLIB).

**Folder:** `lyrics-plus`

```bash
spicetify config custom_apps lyrics-plus
spicetify apply
```

**Features:**
- Synced lyrics display
- Multiple lyrics sources
- Customizable colors and providers (via profile menu)

![Lyrics Plus](/images/apps/lyrics-plus.png)

:::note
If lyrics aren't loading, see the [FAQ](/docs/faq#sometimes-popup-lyrics-andor-lyrics-plus-seem-to-not-work) for Musixmatch token instructions.
:::

Learn more: [Lyrics Plus on GitHub](https://github.com/spicetify/cli/tree/main/CustomApps/lyrics-plus)

---

### New Releases

Aggregates new releases from artists and podcasts you follow.

**Folder:** `new-releases`

```bash
spicetify config custom_apps new-releases
spicetify apply
```

**Features:**
- Filter by time range and release type
- Customizable date format (based on your locale)
- Settings in profile menu

![New Releases](/images/apps/new-releases.png)

---

### Reddit

Browse Spotify-related subreddits and discover music shared by the community.

**Folder:** `reddit`

```bash
spicetify config custom_apps reddit
spicetify apply
```

**Features:**
- Fetch posts from music subreddits
- Add, remove, and arrange subreddits
- Customize post display (via profile menu)

![Reddit](/images/apps/reddit.png)

---

## Creating Custom Apps

Want to build your own custom app? See the **[Custom Apps Development Guide](/docs/development/custom-apps)**.

Custom apps are React applications. A basic app needs:

- `index.js`: Main application code with a `render()` function
- `manifest.json`: Metadata including name, icons, and optional subfiles

For a streamlined development experience, check out **[Spicetify Creator](/docs/development/spicetify-creator)** which supports TypeScript, JSX, and hot reloading.

---

## Troubleshooting

### Custom app not showing in sidebar

1. Verify the folder is in the correct CustomApps location
2. Check that `manifest.json` exists and has valid JSON
3. Run `spicetify apply`
4. Restart Spotify

### App shows but doesn't load

1. Check the browser console for errors (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>)
2. Verify `index.js` exports a `render()` function
3. Check for JavaScript syntax errors

### Settings menu not appearing

Custom app settings appear in the profile menu (top-right). Make sure the app implements settings correctly. Check the app's documentation.
