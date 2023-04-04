---
title: Queue
description: An object containing information about the current queue.
---

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

The `Queue` object contains list of queuing tracks, history of played tracks and current track metadata.

```ts
Spicetify.Queue
```

## Return
[`Queue`](/docs/development/api-wrapper/types/queue)

## Usage

If you plan on developing extensions that need to access the current queue, you can use the `Spicetify.Queue` object.

```ts
const queue = Spicetify.Queue;
const currentTrack = queue.track;
```