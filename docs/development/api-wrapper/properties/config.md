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