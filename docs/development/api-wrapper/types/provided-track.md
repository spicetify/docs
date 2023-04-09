---
title: ProvidedTrack
description: ProvidedTrack type definition.
---

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

```ts
type ProvidedTrack = ContextTrack & {
    removed?: string[];
    blocked?: string[];
    provider?: string;
};
```

Extends [`ContextTrack`](/docs/development/api-wrapper/types/context-track).

| Property | Type | Description |
| --- | --- | --- |
| `removed` | `string[]` &#124; `undefined` | List of removed providers. |
| `blocked` | `string[]` &#124; `undefined` | List of blocked providers. |
| `provider` | `string` | Current provider, eg. from `context` |
