---
title: ProvidedTrack
description: A track in the queue, with the provider that supplied it.
---

`ProvidedTrack` is a [`ContextTrack`](/docs/development/api-wrapper/types/context-track) in [`Spicetify.Queue`](/docs/development/api-wrapper/properties/queue). Spotify defines it, and its fields can change.

```ts
type ProvidedTrack = ContextTrack & {
  removed?: string[];
  blocked?: string[];
  provider?: string;
};
```

| Property | Type | Description |
| --- | --- | --- |
| `removed` | `string[]` &#124; `undefined` | Providers that removed the track. |
| `blocked` | `string[]` &#124; `undefined` | Providers that blocked the track. |
| `provider` | `string` &#124; `undefined` | The provider of the track, such as `context`. |
