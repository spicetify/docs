---
title: addToQueue
description: Add tracks to the end of the user's queue without a notification.
---

`Spicetify.addToQueue` adds tracks to the end of the queue. Unlike [`Platform.PlayerAPI.addToQueue`](/docs/development/api-wrapper/methods/platform#playerapi), it shows no notification.

```ts
function addToQueue(uri: ContextTrack[]): Promise<void>;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `uri` | [`ContextTrack[]`](/docs/development/api-wrapper/types/context-track) | The tracks to add. |

```ts
await Spicetify.addToQueue([{ uri: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh' }]);
```
