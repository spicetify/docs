---
title: Queue
description: The tracks before, at and after the current position in the queue.
---

`Spicetify.Queue` reads Spotify's internal queue state each time you access it. It is `undefined` until the player has loaded.

```ts
const Queue: {
  track: ProvidedTrack;
  prevTracks: ProvidedTrack[];
  nextTracks: ProvidedTrack[];
  queueRevision: bigint;
};
```

| Property | Type | Description |
| --- | --- | --- |
| `track` | [`ProvidedTrack`](/docs/development/api-wrapper/types/provided-track) | The current track. |
| `prevTracks` | [`ProvidedTrack[]`](/docs/development/api-wrapper/types/provided-track) | Tracks already played. |
| `nextTracks` | [`ProvidedTrack[]`](/docs/development/api-wrapper/types/provided-track) | Tracks still to play, starting with the user's queue. |
| `queueRevision` | `bigint` | Spotify's revision of the queue. |

This is a private Spotify object, and its shape can change between client versions.

```ts
const upNext = Spicetify.Queue?.nextTracks.slice(0, 5).map((track) => track.uri);
```
