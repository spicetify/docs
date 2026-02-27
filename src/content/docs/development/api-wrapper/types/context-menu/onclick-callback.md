---
title: OnClickCallback
description: Type definition for callback function when menu item is clicked.
---

```ts
type OnClickCallback = (
    uris: string[],
    uids?: string[],
    contextUri?: string
) => void;
```

#### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| uris | `string[]` | List of URIs of the selected items. |
| uids | `string[]` &#124; `undefined` | List of UIDs of the selected items. **Note:** Not all context menu items have UIDs. |
| contextUri | `string` &#124; `undefined` | URI of the context menu where the item was called from. This could be a playlist, album, artist, or a track. |
