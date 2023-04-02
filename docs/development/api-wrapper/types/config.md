---
title: Config
description: Config type definition.
---

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