---
title: PlayerState
description: The playback state in Spicetify.Player.data.
---

`PlayerState` is the state of Spotify's `PlayerAPI`, which [`Spicetify.Player.data`](/docs/development/api-wrapper/methods/player#state) holds. Spotify defines it, and its fields can change between client versions.

```ts
type PlayerState = {
  timestamp: number;
  context: { uri: string; url: string; metadata: Metadata };
  index: { pageURI?: string | null; pageIndex: number; itemIndex: number };
  item: PlayerTrack;
  shuffle: boolean;
  smartShuffle: boolean;
  repeat: number;
  speed: number;
  positionAsOfTimestamp: number;
  duration: number;
  hasContext: boolean;
  isPaused: boolean;
  isBuffering: boolean;
  restrictions: Record<string, boolean | string[]>;
  previousItems?: PlayerTrack[];
  nextItems?: PlayerTrack[];
  playbackQuality: Record<string, number | boolean>;
  playbackId: string;
  sessionId: string;
  signals?: any[];
};

type PlayerTrack = {
  type: string;
  uri: string;
  uid: string;
  name: string;
  mediaType: string;
  duration: { milliseconds: number };
  album: { type: string; uri: string; name: string; images?: { url: string; label: string }[] };
  artists?: { type: string; uri: string; name: string }[];
  isLocal: boolean;
  isExplicit: boolean;
  is19PlusOnly: boolean;
  provider: string;
  metadata: Metadata;
  images?: { url: string; label: string }[];
};
```

| Property | Description |
| --- | --- |
| `item` | The current track or episode. |
| `context` | The playlist, album or other context that playback started from. |
| `index` | The position of `item` in its context. |
| `isPaused`, `isBuffering` | The playback status. |
| `positionAsOfTimestamp`, `timestamp` | The position in milliseconds at the time `timestamp` records. [`Player.getProgress`](/docs/development/api-wrapper/methods/player#position) computes the current position from both. |
| `duration` | The length of `item` in milliseconds. |
| `shuffle`, `smartShuffle`, `repeat` | The shuffle and repeat settings. `repeat` is `0` for off, `1` for all and `2` for one. |
| `speed` | The playback speed. |
| `restrictions` | Which actions the current state allows, such as `canSeek` and `canSkipNext`. |
| `previousItems`, `nextItems` | The tracks before and after `item`. |

[`Metadata`](/docs/development/api-wrapper/types/metadata) is a map of strings.
