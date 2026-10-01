---
title: Response
description: The full response that CosmosAsync.request returns.
---

`Response` is what `CosmosAsync.request` and `CosmosAsync.resolve` return. The other methods return only its `body`.

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
| `body` | [`Body`](/docs/development/api-wrapper/types/cosmos-async/body) | The parsed response body. |
| `headers` | [`Headers`](/docs/development/api-wrapper/types/cosmos-async/headers) | The response headers. |
| `status` | `number` | The HTTP status code. |
| `uri` | `string` &#124; `undefined` | The request URI. |
