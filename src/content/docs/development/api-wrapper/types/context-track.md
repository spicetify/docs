---
title: ContextTrack
description: A track reference that queue and playback methods accept.
---

`ContextTrack` identifies a track for methods such as [`addToQueue`](/docs/development/api-wrapper/functions/add-to-queue) and `Platform.PlayerAPI.play`.

```ts
type ContextTrack = {
  uri: string;
  uid?: string;
  metadata?: Metadata;
};
```

| Property | Type | Description |
| --- | --- | --- |
| `uri` | `string` | The track URI. |
| `uid` | `string` &#124; `undefined` | The ID of one entry in a list, which tells duplicate tracks apart. |
| `metadata` | [`Metadata`](/docs/development/api-wrapper/types/metadata) &#124; `undefined` | Track metadata. |
