---
title: SVGIcons
description: The icon set that Spicetify's buttons and menu items use.
---

`Spicetify.SVGIcons` maps each [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) name to the inner markup of a 16 by 16 `<svg>`. In a module, use `client.icons`.

```ts
const SVGIcons: Record<SVGIcon, string>;
```

Wrapper classes such as [`Topbar.Button`](/docs/development/api-wrapper/classes/topbar), [`Playbar.Button`](/docs/development/api-wrapper/classes/playbar) and [`ContextMenu.Item`](/docs/development/api-wrapper/classes/context-menu) accept the name and build the `<svg>` for you. Anywhere else, wrap the markup yourself.

```ts
const icon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">${Spicetify.SVGIcons.play}</svg>`;
```

```tsx
<svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor" dangerouslySetInnerHTML={{ __html: Spicetify.SVGIcons.play }} />
```
