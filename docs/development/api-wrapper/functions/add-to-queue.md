---
title: addToQueue
description: Adds a track/album or array of tracks/albums to prioritized queue.
---

Adds a track or array of tracks to the bottom of the prioritized queue.

:::tip

This works similarly to [`Spicetify.Platform.PlayerAPI.addToQueue`](/docs/development/api-wrapper/methods/platform#addtoqueue) but works silently, meaning no notification will be shown.

If you want default Spotify behavior, use [`Spicetify.Platform.PlayerAPI.addToQueue`](/docs/development/api-wrapper/methods/platform#addtoqueue) instead.

:::

```ts
function addToQueue(uri: ContextTrack[]): Promise<void>;
```

#### Parameters

| Name | Type | Description |
| :--- | :--- | :--- |
| `uri` | [`ContextTrack[]`](/docs/development/api-wrapper/types/context-track) | Array of tracks to add to queue. |

#### Example

```ts
// Add current track to queue
const currentTrack = Spicetify.Player.data.item;

await Spicetify.addToQueue([currentTrack]);

// Add a track to queue
const trackUri = "spotify:track:4iV5W9uYEdYUVa79Axb7Rh";

await Spicetify.addToQueue([ { uri: trackUri } ]);
