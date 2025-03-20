---
title: Config
description: 🛠️ Accessing a copy of Spicetify's `config-xpui.ini` file inside your extension.
---

To make it easier for you to validate and debug your extensions, Spicetify provides a filtered copy of the user's `config-xpui.ini` in the `Spicetify` object.

```ts
interface Config {
  version: string;
  current_theme: string;
  color_scheme: string;
  extensions: string[];
  custom_apps: string[];
}
```

| Property | Type | Description |
| --- | --- | --- |
| `version` | `string` | Spicetify version. |
| `current_theme` | `string` | Current theme name. |
| `color_scheme` | `string` | Current color scheme name. |
| `extensions` | `string[]` | List of enabled extensions. |
| `custom_apps` | `string[]` | List of enabled custom apps. |

## Usage

You can validate if the user currently has a custom app or a theme enabled by checking if the app or theme's name is included in the `custom_apps` or `current_theme` property of the `Config` object.

```ts
const { Config } = Spicetify;

if (Config.custom_apps.includes("lyrics-plus")) {
    // Do something
}
```

This can ensure that your extension doesn't break if the user doesn't have the required app or theme installed.
