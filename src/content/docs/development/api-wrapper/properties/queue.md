---
title: Queue
description: An object containing information about the current queue.
---

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

The `Queue` object contains a list of queuing tracks, history of played tracks, and current track metadata.

```ts
Spicetify.Queue
```

## Return

```ts
const Queue: {
    nextTracks: ProvidedTrack[];
    prevTracks: ProvidedTrack[];
    queueRevision: string;
    track: ProvidedTrack;
};
```

| Property | Type | Description |
| --- | --- | --- |
| `nextTracks` | [`ProvidedTrack[]`](/docs/development/api-wrapper/types/provided-track) | List of next tracks. |
| `prevTracks` | [`ProvidedTrack[]`](/docs/development/api-wrapper/types/provided-track) | List of previous tracks. |
| `queueRevision` | `string` | Queue revision ID used internally by Spotify. |
| `track` | [`ProvidedTrack`](/docs/development/api-wrapper/types/provided-track) | Current track. |

## Usage

If you plan on developing extensions that need to access the current queue, you can use the `Spicetify.Queue` object.

```ts
const queue = Spicetify.Queue;
const currentTrack = queue.track;
```
