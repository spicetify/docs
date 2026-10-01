---
title: React Developer Tools
description: Install React Developer Tools in the Spotify client.
---

React Developer Tools shows the component tree of Spotify's React UI, which helps when you look for the props and state a module can use. To install it:

1. Run `spicetify dev` to turn on developer mode.
2. In Spotify, press Ctrl+Shift+T.
3. Press Ctrl+N.
4. In the address bar, open `https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi`.
5. Select **Add to Chrome**, then confirm.
6. Optional: if the extension doesn't appear, press F5.

If Spotify says you aren't allowed to install extensions, start it with `--allowlisted-extension-id=fmkadmapgofadopljbjfkapdkoienihi`. See [Spotify CLI flags](/docs/development/spotify-cli-flags) for how to pass a flag.

The [React documentation](https://react.dev/learn/react-developer-tools) explains how to use the tools.
