---
title: SVGIcons
description: A set of SVG icons used throughout the Spotify client.
---

Spicetify has a predefined set of SVG icons that are used by Spotify throughout the client. These are strings of SVG `innerHTML` that are used to create `<svg>` elements.

```ts
const SVGIcons = Record<SVGIcon, string>;
```

| Property | Type | Description |
| --- | --- | --- |
| `key` | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) | SVG icon name. |

## Usage

You can use these icons to create custom menu items or other custom components.

In vanilla JavaScript, you can create an `<svg>` element and set its `innerHTML` to the SVG icon string.

```ts
const icon = document.createElement("svg");
icon.innerHTML = Spicetify.SVGIcons["play"];
```

In React, you can use the `dangerouslySetInnerHTML` prop to set the SVG icon string as the inner HTML of the `<svg>` element.

```tsx
const icon = <svg dangerouslySetInnerHTML={{ __html: Spicetify.SVGIcons["play"] }} />;
```

In Spicetify's own methods, you can simply pass an [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) to the `icon` parameter.

```ts
new Spicetify.ContextMenu.Item(
  name: "My Custom Item".
  onClick: () => Spicetify.showNotification("Hello World!"),
  shouldAdd: () => true,
  icon: "play",
  disabled: false,
)
```
