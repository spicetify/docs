---
title: FAQ
---

## Where is the config file?

The config file is generally located at:

| Platform            | Path                                       |
| ------------------- | ------------------------------------------ |
| **Windows**         | `%appdata%\spicetify\config-xpui.ini`      |
| **Linux**/**macOS** | `~/.config/spicetify/config-xpui.ini`      |

However, you can know specifically where it is with:

```
spicetify -c
```

Or, you can open the folder where it is located by entering the following in your terminal:

```
spicetify config-dir
```

For details about each config field, please run:

```bash
spicetify --help config
```

## Cannot find `pref_file`

### Windows

1. There is a great chance that you are using Microsoft Store Spotify. Please double check that in Spotify About page.
2. If you are actually using Microsoft Store Spotify, remove it completely. Go to Spotify website to download the normal version installer.
3. If you are not using the Microsoft Store Spotify, and are using the one from the Spotify website, check to see if you have a "prefs" file in `C:\Users\YOUR_USERNAME\AppData\Roaming\Spotify`.
4. If so, open your `config-xpui.ini` and set `prefs_path` to the absolute path of that prefs file. (e.g. `C:\Users\YOUR_USERNAME\AppData\Roaming\Spotify\prefs`) Then try running `spicetify` again.

### Linux

1. In `bash`, run `cd ~` and `find | grep "spotify/prefs$"`
2. If it returns a path to prefs file, copy its absolute path to `prefs_path` field in `config-xpui.ini`.

## After Spotify's update, running `spicetify apply` or `spicetify update` breaks Spotify.

After any Spotify update, always run `spicetify backup apply`.  
Optionally, set the Spotify shortcut to run `spicetify auto` (instead of direct path to Spotify executable), so that Spicetify can backup and apply, when it needs to, then launch Spotify automatically.

It may be the case that Spicetify does not yet support a new Spotify update. In that case, please check the Spicetify issue tracker.

## I can't play some songs after downgrading Spotify

Delete all files in the following folder and launch spotify again.

- **Windows**: `%LOCALAPPDATA%\Spotify`
- **Linux**: `~/.config/spotify`
- **macOS**: `~/Library/Application Support/Spotify`

## Sometimes **Popup Lyrics** and/or **Lyrics Plus** seem to not work

This problem happens in the extension [Popup Lyrics](https://github.com/spicetify/cli/wiki/Extensions#pop-up-lyrics) and custom app [Lyrics Plus](https://github.com/spicetify/cli/wiki/Custom-Apps#lyrics-plus) mostly because your Musixmatch token has been flagged for doing too many requests. This can be fixed by just waiting without skipping songs too much, however, if it is still a problem for you, all you need to do is to install the Musixmatch official app, which is a web-based app like Spotify.

1. **Linux:** find an archive online
   **Windows:** go to [store.rg-adguard.net](https://store.rg-adguard.net/) and then select ProductID and enter `9wzdncrfj235` and click done. Download the .appxbundle and install.

2. **You don't need to log in!**

3. Now in Musixmatch app, hit `Ctrl + Shift + i` to bring up DevTools.

![mxm1](https://i.imgur.com/jMGMgCc.png)

4. Switch to Network tab. Hit `Ctrl + R`. Filter results with "apic":

![mxm2](https://i.imgur.com/QdwqtQa.png)

5. Click on any result. Click on the Headers tab. Scroll all the way down. Note down `usertoken`

![mxm3](https://i.imgur.com/ZsGwKG3.png)

It should look like this:

```
200501593b603a3fdc5c9b4a696389f6589dd988e5a1cf02dfdce1
```

6. You can open the config for Popup Lyrics by right clicking on the Popup Lyrics button. Or if you're using Lyrics Plus, open the config by clicking on Lyrics in the sidebar and clicking on the profile menu and then clicking 'Lyrics Plus config'. You can then paste your personal token in the input field in the Musixmatch section and turn the switch on.

![mxm4](https://i.imgur.com/yvrkllb.png)
