---
title: Queue
description: Queue type definition.
---

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

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