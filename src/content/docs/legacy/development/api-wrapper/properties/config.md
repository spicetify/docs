---
title: Config
description: The v2 copy of the user's Spicetify configuration, which v3 does not set.
---

:::warning
Spicetify v3 does not set `Spicetify.Config`. The v3 `spicetify apply` writes no configuration into the page, so `Spicetify.Config` is `undefined` and `client.config` returns `undefined`.
:::

For the CLI version in v3, read `client.spicetifyVersion` in a module, or `Spicetify.Modules.manifest.cliVersion`. To check whether a module is installed and loaded, use [`Spicetify.Modules.list()`](/docs/development/api-wrapper/modules#spicetifymodules).

```ts
const lyricsLoaded = Spicetify.Modules.list().some((module) => module.identifier === 'lyrics-plus' && module.loaded);
```

In v2, `Spicetify.Config` held a filtered copy of `config-xpui.ini`:

```ts
interface Config {
  version: string;
  current_theme: string;
  color_scheme: string;
  extensions: string[];
  custom_apps: string[];
}
```
