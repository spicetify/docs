---
title: Response
description: CosmosAsync Response type definition.
---

Represents a response from a CosmosAsync request.

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

```ts
interface Response {
    body: any;
    headers: Headers;
    status: number;
    uri?: string;
}
```

| Property | Type | Description |
| --- | --- | --- |
| `body` | [`Body`](./body.md) | Parsed JSON response body. |
| `headers` | [`Headers`](./headers.md) | Response headers. |
| `status` | `number` | HTTP status code. |
| `uri` | `string` &#124; `undefined` | Request URI. |
