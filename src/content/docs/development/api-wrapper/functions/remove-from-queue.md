---
title: removeFromQueue
description: Remove tracks from the user's queue.
---

`Spicetify.removeFromQueue` removes tracks from the queue. Without a `uid`, it removes every queued copy of the `uri`.

```ts
function removeFromQueue(uri: ContextTrack[]): Promise<void>;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `uri` | [`ContextTrack[]`](/docs/development/api-wrapper/types/context-track) | The tracks to remove. |

```ts
await Spicetify.removeFromQueue([{ uri: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh' }]);
```
