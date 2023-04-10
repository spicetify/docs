---
title: ContextOption
description: ContextOption type definition.
---

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

```ts
type ContextOption = {
    contextURI?: string;
    index?: number;
    trackUri?: string;
    page?: number;
    trackUid?: string;
    sortedBy?: string;
    filteredBy?: string;
    shuffleContext?: boolean;
    repeatContext?: boolean;
    repeatTrack?: boolean;
    offset?: number;
    next_page_url?: string;
    restrictions?: Record<string, string[]>;
    referrer?: string;
};
```

| Property | Type | Description |
| --- | --- | --- |
| `contextURI` | `string` &#124; `undefined` | Context URI. |
| `index` | `number` &#124; `undefined` | Track index. |
| `trackUri` | `string` &#124; `undefined` | Track URI. |
| `page` | `number` &#124; `undefined` | Page number. |
| `trackUid` | `string` &#124; `undefined` | Track UID. |
| `sortedBy` | `string` &#124; `undefined` | Sorted by timestamp. |
| `filteredBy` | `string` &#124; `undefined` | Filtered by timestamp. |
| `shuffleContext` | `boolean` &#124; `undefined` | Shuffle context URI. |
| `repeatContext` | `boolean` &#124; `undefined` | Repeat context URI. |
| `repeatTrack` | `boolean` &#124; `undefined` | Repeat track URI. |
| `offset` | `number` &#124; `undefined` | Offset. |
| `next_page_url` | `string` &#124; `undefined` | Next page URL. |
| `restrictions` | `Record<string, string[]>` &#124; `undefined` | Restrictions. |
| `referrer` | `string` &#124; `undefined` | Referrer. |
