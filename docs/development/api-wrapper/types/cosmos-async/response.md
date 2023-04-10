---
title: Response
description: CosmosAsync Response type definition.
---

Represents a response from a CosmosAsync request.

```ts
interface Response {
    body: any;
    headers: Headers;
    status: number;
    uri: string;
    isSuccessStatus(status: number): boolean;
}
```

| Property | Type | Description |
| --- | --- | --- |
| `body` | [`Body`](./body.md) | Parsed JSON response body. |
| `headers` | [`Headers`](./headers.md) | Response headers. |
| `status` | `number` | HTTP status code. |
| `uri` | `string` | Request Spotify URI. |
| `isSuccessStatus` | `(status: number): boolean` | Function callback that returns a boolean on response OK. |
