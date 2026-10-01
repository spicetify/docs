---
title: Spotify CLI flags
description: Command-line flags that change how the Spotify client behaves.
---

Spotify accepts command-line flags that change how the client starts. Most names and descriptions here come from the Spotify executable.

## Pass a flag

Spicetify v3 has no setting for launch flags, so you add them where you start Spotify:

- On macOS, run `open -a Spotify --args --remote-debugging-port=9229`.
- On Windows, add the flags to the end of the Target field of your Spotify shortcut.
- On Linux, add them to the `Exec` line of your Spotify `.desktop` file, or pass them when you start `spotify` from a terminal.

`spicetify-kit dev` starts Spotify with `--remote-debugging-port` for you.

## List of flags

These flags have a known effect:

| Flag | Description |
| --- | --- |
| `--app-directory=<path>` | Sets the Apps directory path. v2 used it to patch Spotify from the Microsoft Store. |
| `--cache-path=<path>` | Uses this path as the root of the cache directory. |
| `--enable-chrome-runtime` | Switched the runtime from Alloy to Chrome on Spotify versions older than 1.2.34, which v3 doesn't support. See [this CEF issue](https://github.com/chromiumembedded/cef/issues/3685) for the differences. |
| `--enable-developer-mode` | Turned on developer mode. It no longer works, so use `spicetify dev`. |
| `--log-file=<path>` | Saves log output to this file. The extension must be `.log`. |
| `--minimized` | Starts with the window minimized. Windows only. |
| `--mu=<value>` | Starts with a separate cache directory named after the value, so you can run several clients at once. |
| `--password=<password>` | Signed in on startup together with `--username`. It no longer works. |
| `--protocol-uri=<uri>` | The same as `--uri`, but used only by the Windows protocol handler so Spotify can apply extra security restrictions. |
| `--remote-allow-origins=<url>` | Since Spotify 1.2.8 (Chromium 111), the debugging port rejects connections from a web page unless its origin is listed here, for example `--remote-allow-origins=http://localhost:8088`. Tools that connect without an origin, such as `spicetify-kit dev`, don't need it. |
| `--remote-debugging-port=<port>` | Opens the Chrome DevTools Protocol on this port. The dev loop uses 9229. |
| `--show-console` | Shows more log output. |
| `--trace-file=<path>` | Saves a trace file to this path. |
| `--update-endpoint-override=<url>` | Points Spotify's updater at another server. `--update-endpoint-override=http://localhost` stops updates. |
| `--uri=<uri>` | Starts the client and opens the URI once it loads. |
| `--username=<username>` | Signed in on startup together with `--password`. It no longer works. |

These flags have no documented effect: `--allow-upgrades`, `--append-log-file`, `--app-icon-overlay`, `--apr`, `--audio-api`, `--autostart`, `--bridge-log-filename`, `--campaign-id`, `--connect-debug-level`, `--disable-cef-views`, `--disable-crash-reporting`, `--disable-update-restarts`, `--disallow-multiple-instances`, `--enable-audio-graph`, `--enable-cef-views`, `--event-sender-send-interval`, `--experimental-languages`, `--experimental-network`, `--force-auto-update`, `--force-cef-http`, `--immediate-widevine-cdm-download`, `--log-detailed-request-account`, `--maximized`, `--minimum-update-request-interval`, `--performance-tracing`, `--product-version`, `--remote-app-config`, `--remember-cmd-login`, `--startup-success-file-path`, `--test-auto-update-success-file-path`, `--trigger-ta-crash`, `--update-immediately`, `--upgrade-failed`, `--use-event-sender-test-transport`, `--user-agent-product`, `--weblogin-endpoint`.

Spotify also accepts many Chromium and CEF switches, but not all of them work:

- [Chromium command-line switches, general documentation](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)
- [List of Chromium command-line switches](https://peter.sh/experiments/chromium-command-line-switches)
- CEF switches in the source code: [client_switches.cc](https://github.com/chromiumembedded/cef/blob/master/tests/shared/common/client_switches.cc) and [cef_switches.cc](https://github.com/chromiumembedded/cef/blob/master/libcef/common/cef_switches.cc)

## Experimental features

Turn on Chromium experimental features with `--enable-features=<comma-separated list>`. Some need a switch as well, as in `--enable-smooth-scrolling --enable-features=WindowsScrollingPersonality` for smooth scrolling. No list of these features exists, and they change between versions.

To turn features on from the client instead, run `spicetify dev`, press Ctrl+Shift+T and then Ctrl+N in Spotify, open `chrome://flags`, turn on the features, and select **Relaunch**.
