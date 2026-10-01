---
title: ShouldAddCallback
description: The callback that decides whether a ContextMenu item appears.
---

`ShouldAddCallback` runs each time the menu opens and returns `true` to show the item or submenu.

```ts
type ShouldAddCallback = (uris: string[], uids?: string[], contextUri?: string) => boolean;
```

It receives the same arguments as [`OnClickCallback`](/docs/development/api-wrapper/types/context-menu/onclick-callback).

```ts
const isSingleTrack: Spicetify.ContextMenu.ShouldAddCallback = (uris) =>
  uris.length === 1 && Spicetify.URI.isTrack(uris[0]);
```
