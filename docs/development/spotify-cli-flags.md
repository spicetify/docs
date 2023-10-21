---
title: Spotify CLI Flags
description: 🚩 Flags to alter the behavior of the Spotify.
---

| Flag                                   | Description                                                                                                                                                |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--uri=<uri>`                          | Start the client normally, but automatically navigate to the URI when initialized.                                                                         |
| `--protocol-uri=<uri>`                 | Identical to --uri, but only used from the Windows protocol handler, so we can apply extra security restrictions.                                          |
| `--mu=<value>`                         | Start with a special cache directory. Allows you to run multiple clients at the same time. Value can be anything (will be used as part of the cache name). |
| `--username=<username>`                | Use to automatically sign in on startup. Use together with `--password`.                                                                                   |
| `--password=<password>`                | Use to automatically sign in on startup. Use together with `--username`.                                                                                   |
| `--cache-path=<path>`                  | Use as root for the cache directory.                                                                                                                       |
| `--log-file=<path>`                    | Save log output to file (extension needs to be '.log').                                                                                                    |
| `--trace-file=<path>`                  | Save a trace file to this path.                                                                                                                            |
| `--show-console`                       | Show more log output.                                                                                                                                      |
| `--allow-upgrades`                     |
| `--app-directory=<path>`               | Specify Apps directory                                                                                                                                     |
| `--app-icon-overlay`                   |
| `--apr`                                |
| `--autostart`                          |
| `--bridge-log-filename`                |
| `--enable-audio-graph`                 |
| `--enable-developer-mode`              |
| `--experimental-languages`             |
| `--trigger-ta-crash`                   |
| `--experimental-network`               |
| `--force-auto-update`                  |
| `--connect-debug-level`                |
| `--immediate-widevine-cdm-download`    |
| `--log-detailed-request-account`       |
| `--append-log-file`                    |
| `--disable-crash-reporting`            |
| `--transparent-window-controls`        | Make window control box semi-transparent. Only works on Windows                                                                                            |
| `--maximized`                          |
| `--minimized`                          | Start the app with the window minimized. Only works on Windows.                                                                                            |
| `--performance-tracing`                |
| `--remote-app-config`                  |
| `--product-version`                    |
| `--remote-debugging-port=<port>`       | Enable remote debugging                                                                                                                                    |
| `--test-auto-update-success-file-path` |
| `--update-immediately`                 |
| `--upgrade-failed`                     |
| `--weblogin-endpoint`                  |
| `--disallow-multiple-instances`        |
| `--force-cef-http`                     |
| `--startup-success-file-path`          |
| `--update-endpoint-override`           |
| `--minimum-update-request-interval`    |
| `--disable-update-restarts`            |
