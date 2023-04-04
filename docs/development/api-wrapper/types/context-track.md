---
title: ContextTrack
description: ContextTrack type definition.
---

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

```ts
type ContextTrack = {
    uri: string;
    uid?: string;
    metadata?: Metadata;
}
```

| Property | Type | Description |
| --- | --- | --- |
| `uri` | `string` | Track URI. |
| `uid` | `string` &#124; `undefined` | Track UID. |
| `metadata` | [`Metadata`](/docs/development/api-wrapper/types/metadata) &#124; `undefined` | Track metadata. |