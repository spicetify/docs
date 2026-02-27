---
title: Error
description: CosmosAsync Error type definition.
---

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

```ts
interface Error {
    code: number;
    error: string;
    message: string;
    stack?: string;
};
```

| Property | Type | Description |
| --- | --- | --- |
| `code` | `number` | HTML error code. |
| `error` | `string` | HTML error name. |
| `message` | `string` | Error message. |
| `stack` | `string` &#124; `undefined` | Error stack. |
