---
title: FAQ
---

## Where is the config file?

The config file is generally located at:

| Platform            | Path                                       |
| ------------------- | ------------------------------------------ |
| **Windows**         | `%userprofile%\.spicetify\config-xpui.ini` |
| **GNU(Linux)**/**MacOS** | `~/.config/spicetify/config-xpui.ini`      |

However, you can know specifically where it is with:

```
spicetify -c
```

Or you can open the folder where it is located with:

```
spicetify config-dir
```

For detail information of each config field, please run:

```bash
spicetify --help config
```

## My Spotify is blank!

### Windows

1. It is common for this issue to stem from outdated Spotify and/or Spicetify, you can rule this out by checking your "version" and "with" entries inside of your `config-xpui.ini`.
2. If this is the case; go ahead and do a FRESH install of Spicetify + Spotify.
3. If the version of Spotify inside of your `config-xpui.ini` does not correspond with what is actually installed, this could mean your config is out of sync. Delete your config file and run `spicetify` in a new terminal instance. If it’s still reflecting an incorrect entry, delete your "prefs" files inside of `C:\Users\YOUR_USERNAME\AppData\Roaming\Spotify\prefs`.
4. Some themes have had histories of deleting the main view of Spotify by accident, make sure to troubleshoot across multiple themes and extensions.

### GNU/Linux + MacOS

1. Spicetify has a history of incompatibility with Spotify on GNU/Linux, start off by assuring you are not using snap's version of Spotify.
2. It’s possible the regex is broken for the latest versions of Spicetify, unfortunately there is no fix for this, and you'll instead have to downgrade Spotify and Spicetify to ensure they work together.
3. Ask around in the Spicetify discord server, there are lots of active GNU/Linux and macOS users ready to give you pointers.

## Cannot use term "Spicetify" in my terminal.

### Universal

1. This is almost always an issue with your $path on GNU/Linux and mac, or your PATH on Windows.
2. Google how to add the corresponding paths to your path based on your OS-
  - **Windows**: `%USERPROFILE%/spicetify-cli` --> `C:\Users\tomfi\spicetify-cli`
  - **GNU/Linux**: `$HOME/.spicetify`
  - **MacOS**: `$HOME/.spicetify`

## Why can’t I open devtools anymore?
#### *Thanks to Spotify loving the ricing/modding community, in later versions of Spotify they have decided to REMOVE debugging tools such as inspect element. However remote debugging can bypass this limitation*

### Windows

1. Start by finding your preferred Spotify shortcut. Right click this shortcut and enter properties, inside of the "target" text box, at the very end of the path, add a space and type in "--remote-debugging-port=9222". Apply and close.
2. Navigate to Google Chrome and in the address tab type "chrome://inspect", click on the box that says 
"port forwarding". In the new menu there will be a table of values, on a new line, in the first box input the port "9222" and the second box "localhost:9222", leave port forwarding DISABLED and press done.
3. After that providing you have Spotify open; you should see it in the list of connected targets. Press the inspect button and voila!

### GNU/Linux + MacOS
1. Locate your Spicetify config using the command `spicetify config-dir` and enter `spotify_launch_flags = --remote-debugging-port=9222`
2. Open google chrome and go to "chrome://inspect" and Spotify should pop up, from there press inspect.
3. If Spotify does not pop up click on the box that says, "port forwarding". In the new menu there will be a table of values, on a new line, in the first box input the port "9222" and the second box "localhost:9222", leave port forwarding DISABLED and press done.

## How do I uninstall Spicetify?

### Windows

1. Ensure you have no running Spotify or Spicetify processes.
2. Open a terminal of your choice (Command Prompt is recommended) with administrator permissions and type `spicetify restore` to ensure that nothing is leftover in your Spotify installation.
3. Type each command 1 after another ensuring they are executed correctly; `cd %userprofile%`, `rmdir .spicetify\ /S`, `rmdir spicetify-cli\ /S`.
4. Lastly in your start menu search bar type the word "environment" an application should appear that says, "edit environment variables for your account" once opened double click on the "path" header, select path "C:\Users\!!USERNAME!!\spicetify-cli" and press the delete button. make sure to press okay in both windows and not cancel.

## Cannot find `pref_file`

### Windows

1. There is great chance that you are using Windows Store Spotify. Please double check that in Spotify About page.
2. If you are actually using Windows Store Spotify, remove it completely. Go to Spotify website to download normal version installer.
3. If you are not using the Windows Store Spotify, and are using the one from the Spotify website, check to see if you have a "prefs" file in `C:\Users\YOUR_USERNAME\AppData\Roaming\Spotify`. 
4. If you do not have a "prefs" file under that path; open Spotify, login, and waiting 30 seconds for one to be created.
5. If so, open your `config-xpui.ini` and set `prefs_path` to the absolute path of that prefs file. (e.g. `C:\Users\YOUR_USERNAME\AppData\Roaming\Spotify\prefs`) Then try running `spicetify` again. 

### GNU/Linux

1. In `bash`, run `cd ~` and `find | grep "spotify/prefs$"`
2. If it returns a path to prefs file, copy its absolute path to `prefs_path` field in `config-xpui.ini`.

## After Spotify's update, running `spicetify apply` or `spicetify update` breaks Spotify.

After any Spotify update, always run `spicetify backup apply`.  
Optionally, make Spotify shortcut to run `spicetify auto` (instead of direct path to spotify executable), so that Spicetify can backup and apply, when it needs to, then launch Spotify automatically.

It may be the case that Spicetify is not supporting this new Spotify update yet. In that case, check our issue tracker.

## I can't play some songs after downgrading spotify

Delete all files in the following folder and launch spotify again.

- **Windows**: `%LOCALAPPDATA%\Spotify`
- **GNU/Linux**: `~/.config/spotify`
- **MacOS**: `~/Library/Application Support/Spotify`

## Sometimes **Popup Lyrics** and/or **Lyrics Plus** seem to not work

This problem happens in the extension [Popup Lyrics](https://github.com/spicetify/spicetify-cli/wiki/Extensions#pop-up-lyrics) and custom app [Lyrics Plus](https://github.com/spicetify/spicetify-cli/wiki/Custom-Apps#lyrics-plus) mostly because your MusicXMatch token has been flagged for doing too many requests. This can be fixed by just waiting without skipping songs too much, however, if it is still a problem for you, all you need to do is to install the Musixmatch official app, which is also web based app as Spotify.

1. **GNU/Linux:** https://download-app.musixmatch.com/download  
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
