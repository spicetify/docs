---
title: FAQ
sidebar_position: 3
---

## Cannot find `pref_file`

- **Windows**:

  1. There is great chance that you are using Windows Store Spotify. Please double check that in Spotify About page.
  2. If you are actually using Windows Store Spotify, remove it completely. Go to Spotify website to download normal version installer.

- **Linux**
  1. In `bash`, run `cd ~` and `find | grep "spotify/prefs$"`
  2. If it returns a path to prefs file, copy its absolute path to `prefs_path` field in `config-xpui.ini`.

## Spotify got an update. I ran `spicetify apply` or `spicetify update`, now my Spotify is totally messed up.

Reinstall Spotify and run `spicetify backup apply`.
After any Spotify update, always run `spicetify backup apply`.  
Optionally, make Spotify shortcut to run `spicetify auto` (instead of direct path to spotify executable), so that Spicetify can backup and apply, when it needs to, then launch Spotify automatically.

## I can't play some songs after downgrading spotify

Delete all files in the following folder and launch spotify again.

- **Windows**: `%LOCALAPPDATA%\Spotify`
- **Linux**: `~/.config/spotify`
- **MacOS**: `~/Library/Application Support/Spotify`

## Sometimes **Popup Lyrics** and/or **Lyrics Plus** seem to not work

This problem happens in the extension [Popup Lyrics](https://github.com/khanhas/spicetify-cli/wiki/Extensions#pop-up-lyrics) and custom app [Lyrics Plus](https://github.com/khanhas/spicetify-cli/wiki/Custom-Apps#lyrics-plus) mostly because your MusicXMatch token has been flagged for doing too many requests. This can be fixed by just waiting without skipping songs too much, however, if it is still a problem for you, all you need to do is to install the Musixmatch official app, which is also web based app as Spotify.

1. **Linux:** https://download-app.musixmatch.com/download  
   **Windows:** install it via Windows Store.

2. **You don't have to log in!**

3. Now in Musixmatch app, hit `Ctrl + Shift + i` to bring up DevTools.

![mxm1](https://i.imgur.com/jMGMgCc.png)

4. Switch to Network tab. Hit `Ctrl + R`. Filter results with "apic":

![mxm2](https://i.imgur.com/QdwqtQa.png)

5. Click at any result, it will show up request detail panel. Scroll all the way down. Note down `usertoken`

![mxm3](https://i.imgur.com/ZsGwKG3.png)

It should look like this:

```
200501593b603a3fdc5c9b4a696389f6589dd988e5a1cf02dfdce1
```

6. Open Popup Lyrics setting menu, paste your personal token in input field under Musixmatch section and turn the switch on.

![mxm4](https://i.imgur.com/yvrkllb.png)
