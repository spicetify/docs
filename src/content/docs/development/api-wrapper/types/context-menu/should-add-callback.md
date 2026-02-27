---
title: ShouldAddCallback
description: Type definition for callback function to determine if menu item should be added.
---

```ts
type ShouldAddCallback = (
    uris: string[],
    uids?: string[],
    contextUri?: string
) => boolean;
```

#### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| uris | `string[]` | List of URIs of the selected items. |
| uids | `string[]` &#124; `undefined` | List of UIDs of the selected items. **Note:** Not all context menu items have UIDs. |
| contextUri | `string` &#124; `undefined` | URI of the context menu where the item was called from. This could be a playlist, album, artist, or a track. |

#### Return value

`boolean` - Whether the menu item should be added.
