---
title: Spotify CLI Flags
description: 🚩 Flags to alter the behavior of the Spotify.
---

## List of flags

**When adding flags to your spicetify config, separate each one with `|`.**

| Flag                                   | Description                                                                                                                                                                                          |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--allow-upgrades`                     |                                                                                                                                                                                                      |
| `--append-log-file`                    |                                                                                                                                                                                                      |
| `--app-directory=<path>`               | Specify the "Apps" directory path. Used by spicetify for modifying Spotify from Microsoft Store.                                                                                                      |
| `--app-icon-overlay`                   |                                                                                                                                                                                                      |
| `--apr`                                |                                                                                                                                                                                                      |
| `--audio-api`                          |                                                                                                                                                                                                      |
| `--autostart`                          |                                                                                                                                                                                                      |
| `--bridge-log-filename`                |                                                                                                                                                                                                      |
| `--cache-path=<path>`                  | Use as root for the cache directory.                                                                                                                                                                 |
| `--campaign-id`                        |                                                                                                                                                                                                      |
| `--connect-debug-level`                |                                                                                                                                                                                                      |
| `--disable-cef-views`                  |                                                                                                                                                                                                      |
| `--disable-crash-reporting`            |                                                                                                                                                                                                      |
| `--disable-update-restarts`            |                                                                                                                                                                                                      |
| `--disallow-multiple-instances`        |                                                                                                                                                                                                      |
| `--enable-audio-graph`                 |                                                                                                                                                                                                      |
| `--enable-cef-views`                   |                                                                                                                                                                                                      |
| `--enable-chrome-runtime`              | Switches runtime from Alloy to Chrome on Spotify versions below 1.2.34. See [this issue on GitHub](https://github.com/chromiumembedded/cef/issues/3685) for details about the differences.           |
| `--enable-developer-mode`              | Used to enable the developer mode like `spicetify enable-devtools`. Stopped working long time ago.                                                                                                   |
| `--event-sender-send-interval`         |                                                                                                                                                                                                      |
| `--experimental-languages`             |                                                                                                                                                                                                      |
| `--experimental-network`               |                                                                                                                                                                                                      |
| `--force-auto-update`                  |                                                                                                                                                                                                      |
| `--force-cef-http`                     |                                                                                                                                                                                                      |
| `--immediate-widevine-cdm-download`    |                                                                                                                                                                                                      |
| `--log-detailed-request-account`       |                                                                                                                                                                                                      |
| `--log-file=<path>`                    | Save log output to file (extension needs to be '.log').                                                                                                                                              |
| `--maximized`                          |                                                                                                                                                                                                      |
| `--minimum-update-request-interval`    |                                                                                                                                                                                                      |
| `--minimized`                          | Start the app with the window minimized. Only works on Windows.                                                                                                                                      |
| `--mu=<value>`                         | Start with a special cache directory. Allows you to run multiple clients at the same time. Value can be anything (will be used as part of the cache name).                                           |
| `--password=<password>`                | Use to automatically sign in on startup. Use together with `--username`. No longer works.                                                                                                            |
| `--performance-tracing`                |                                                                                                                                                                                                      |
| `--product-version`                    |                                                                                                                                                                                                      |
| `--protocol-uri=<uri>`                 | Identical to --uri, but only used from the Windows protocol handler, so we can apply extra security restrictions.                                                                                    |
| `--remote-allow-origins=<url>`         | Required to use remote debugging since Spotify 1.2.8 due to security changes in Chromium 111. Example configuration: `--remote-debugging-port=8088 \| --remote-allow-origins=http://localhost:8088`. |
| `--remote-app-config`                  |                                                                                                                                                                                                      |
| `--remote-debugging-port=<port>`       | Enable remote debugging. Use together with `--remote-allow-origins`.                                                                                                                                 |
| `--remember-cmd-login`                 |                                                                                                                                                                                                      |
| `--show-console`                       | Show more log output.                                                                                                                                                                                |
| `--startup-success-file-path`          |                                                                                                                                                                                                      |
| `--test-auto-update-success-file-path` |                                                                                                                                                                                                      |
| `--trace-file=<path>`                  | Save a trace file to this path.                                                                                                                                                                      |
| `--trigger-ta-crash`                   |                                                                                                                                                                                                      |
| `--update-endpoint-override=<url>`     | Can be used to disable Spotify updates. Example configuration: `--update-endpoint-override=http://localhost`.                                                                                        |
| `--update-immediately`                 |                                                                                                                                                                                                      |
| `--upgrade-failed`                     |                                                                                                                                                                                                      |
| `--uri=<uri>`                          | Start the client normally, but automatically navigate to the URI when initialized.                                                                                                                   |
| `--use-event-sender-test-transport`    |                                                                                                                                                                                                      |
| `--user-agent-product`                 |                                                                                                                                                                                                      |
| `--username=<username>`                | Use to automatically sign in on startup. Use together with `--password`. No longer works.                                                                                                            |
| `--weblogin-endpoint`                  |                                                                                                                                                                                                      |

**When added to spicetify config, the flags will only be applied when you launch Spotify using spicetify.** But you can also add them to the Spotify shortcut (on Windows) or `.desktop` file (on Linux) and use it to launch Spotify.

Most of the flags with some descriptions are taken directly from the Spotify executable.

## See also

- [General documentation on Chromium command-line switches](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)

- [List of Chromium command-line switches](https://peter.sh/experiments/chromium-command-line-switches)

- List of CEF command-line switches in the source code: [1](https://github.com/chromiumembedded/cef/blob/master/tests/shared/common/client_switches.cc), [2](https://github.com/chromiumembedded/cef/blob/master/libcef/common/cef_switches.cc)

Don't expect every switch to work.

## Experimental features

Some Chromium experimental features can be enabled with `--enable-features=<comma-separated feature list>`, some require both a switch and a feature. Smooth scrolling is an example: `--enable-smooth-scrolling | --enable-features=WindowsScrollingPersonality`.
There is no list of experimental features and they vary from version to version.

To enable experimental features in **Spotify newer than 1.2.33**:

1. Launch it in the developer mode
2. Press *Ctrl + Shift + T*
3. Press *Ctrl + N*
4. Navigate to the `chrome://flags` page using the address bar
5. Enable the ones you want
6. Press the "Relaunch" button

If you are using **Spotify older than 1.2.34**:

1. Launch it with the `--enable-chrome-runtime` switch and developer mode enabled
2. Press *Ctrl + Shift + T*
3. Press *Ctrl + N*
4. Navigate to the `chrome://flags` page using the address bar
5. Enable the ones you want
6. Press the "Relaunch" button
7. Restart Spotify with the `--enable-chrome-runtime` switch and developer mode enabled
8. Press *Ctrl + Shift + T*
9. Click the `chrome://version` link
10. Copy and paste the flags between `--flag-switches-begin` `--flag-switches-end` into your spicetify config and/or the shortcut/`.desktop` file you use to launch Spotify

The `--enable-chrome-runtime` switch and developer mode are not required for experimental features to work.
