---
title: Config
description: 🛠️ Accessing a copy of Spicetify's `config-xpui.ini` file inside your extension.
---

To make it easier for you to validate and debug your extensions, Spicetify provides a filtered copy of the user's `config-xpui.ini` in the `Spicetify` object.

```js
Spicetify.Config
```

## Return
[`Config`](/docs/development/api-wrapper/types/config) object.

## Usage

You can validate if the user currently has a custom app or a theme enabled by checking if the app or theme's name is included in the `custom_apps` or `current_theme` property of the `Config` object.

```ts
const { Config } = Spicetify;

if (Config.custom_apps.includes("lyrics-plus")) {
    // Do something
}
```

This can ensure that your extension doesn't break if the user doesn't have the requried app or theme installed.