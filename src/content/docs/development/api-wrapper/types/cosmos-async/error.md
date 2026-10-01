---
title: Error
description: The error object that CosmosAsync returns for a failed request.
---

`Error` describes a failed [`CosmosAsync`](/docs/development/api-wrapper/methods/cosmos-async) request. When the wrapper handles a request with `fetch`, it resolves with this object for an error status instead of rejecting.

```ts
interface Error {
  code: number;
  error: string;
  message: string;
  stack?: string;
}
```

| Property | Type | Description |
| --- | --- | --- |
| `code` | `number` | The HTTP status code. |
| `error` | `string` | The HTTP status text. |
| `message` | `string` | The error message. |
| `stack` | `string` &#124; `undefined` | The stack trace, when there is one. |

```ts
const result = await Spicetify.CosmosAsync.get('https://api.spotify.com/v1/me');
if ('code' in result && result.code >= 400) console.error(result.message);
```
