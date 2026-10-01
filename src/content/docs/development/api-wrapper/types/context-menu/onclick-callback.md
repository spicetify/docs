---
title: OnClickCallback
description: The click callback of a ContextMenu item.
---

`OnClickCallback` runs when the user clicks a [`ContextMenu.Item`](/docs/development/api-wrapper/classes/context-menu).

```ts
type OnClickCallback = (uris: string[], uids?: string[], contextUri?: string) => void;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `uris` | `string[]` | The URIs of the selected items. |
| `uids` | `string[]` &#124; `undefined` | The UIDs of the selected items, when the menu has them. |
| `contextUri` | `string` &#124; `undefined` | The URI of the context the menu opened in, such as a playlist or album. |
