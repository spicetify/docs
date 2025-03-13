---
title: CosmosAsync
description: Asynchronous Cosmos API wrapper used by the Spotify client.
---

Asynchronous Cosmos API wrapper used by the Spotify client. It is used to make requests to the Spotify client's internal API as well as external URLs.

```ts
Spicetify.CosmosAsync
```

It works similarly to `fetch` or `axios` but for each request it will automatically add the required headers and cookies (such as user session token). All responses are parsed as JSON.

:::caution

Be mindful of where you're making a request to, especially if you're making a request to an external URL as it *may* compromise the user's account.

If you're not certain, only use `CosmosAsync` for internal Spotify URLs, or use `fetch` for external URLs.

:::

:::tip

Feel free to reach out to the developers' community on [**Discord**](https://discord.gg/VnevqPp2Rr) if you need help with any of these methods, or if you need a list of all available internal/useful endpoints.

:::

## Methods

```ts
namespace CosmosAsync {
    function head(url: string, headers?: Headers): Promise<Headers>;
    function get(url: string, body?: Body, headers?: Headers): Promise<Response["body"]>;
    function post(url: string, body?: Body, headers?: Headers): Promise<Response["body"]>;
    function put(url: string, body?: Body, headers?: Headers): Promise<Response["body"]>;
    function del(url: string, body?: Body, headers?: Headers): Promise<Response["body"]>;
    function patch(url: string, body?: Body, headers?: Headers): Promise<Response["body"]>;
    function sub(url: string, callback: ((b: Response["body"]) => void), onError?: ((e: Error) => void), body?: Body, headers?: Headers): Promise<Response["body"]>;
    function postSub(url: string, body: Body | null, callback: ((b: Response["body"]) => void), onError?: ((e: Error) => void)): Promise<Response["body"]>;
    function request(method: Method, url: string, body?: Body, headers?: Headers): Promise<Response>;
    function resolve(method: Method, url: string, body?: Body, headers?: Headers): Promise<Response>;
}
```

It is worth noting that you can either make a request using the [`request`](#request) method, or use the shorthand methods for each HTTP method.

For example, you can fetch the current client version using either of the following:

```ts
await Spicetify.CosmosAsync.get("sp://desktop/v1/version");
```

or

```ts
await Spicetify.CosmosAsync.request("GET", "sp://desktop/v1/version");
```

For a complete list of available HTTP methods, see [`Method`](/docs/development/api-wrapper/types/cosmos-async/method).

You can also use `CosmosAsync` for Spotify Web API endpoints without having to manually add the required headers and cookies.

```ts
// All endpoints that uses the `sp`, `wg`, and `hm` protocol are internal Spotify endpoints
await Spicetify.CosmosAsync.get("sp://desktop/v1/version");

// Spotify Web API endpoints also works
await Spicetify.CosmosAsync.get("https://api.spotify.com/v1/me");

// Requests to external URLs are NOT safe and may compromise the user's account
// Only use this if you're certain that the URL is safe
// If you need to make a request to an external URL, use `fetch` instead
await fetch("https://example.com");
```

### `head`

Make a `HEAD` request to the specified URL.

```ts
function head(url: string, headers?: Headers): Promise<Headers>;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `url` | `string` | URL to make the request to. |

### `get`

Make a `GET` request to the specified URL.

```ts
function get(url: string, body?: Body, headers?: Headers): Promise<Response["body"]>;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `url` | `string` | URL to make the request to. |
| `body` | [`Body`](/docs/development/api-wrapper/types/cosmos-async/body) | Request body. |
| `headers` | [`Headers`](/docs/development/api-wrapper/types/cosmos-async/headers) | Request headers. |

Example:

```ts
// Get all playlists in user's library
const res = await Spicetify.CosmosAsync.get("sp://core-playlist/v1/rootlist");
const playlists = res.rows.filter((row) => row.type === "playlist");
```

### `post`

Make a `POST` request to the specified URL.

```ts
function post(url: string, body?: Body, headers?: Headers): Promise<Response["body"]>;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `url` | `string` | URL to make the request to. |
| `body` | [`Body`](/docs/development/api-wrapper/types/cosmos-async/body) | Request body. |
| `headers` | [`Headers`](/docs/development/api-wrapper/types/cosmos-async/headers) | Request headers. |

Example:

```ts
// Skip to the next track in queue
const res = await Spicetify.CosmosAsync.post("sp://player/v2/main/skip_next");
```

### `put`

Make a `PUT` request to the specified URL.

```ts
function put(url: string, body?: Body, headers?: Headers): Promise<Response["body"]>;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `url` | `string` | URL to make the request to. |
| `body` | [`Body`](/docs/development/api-wrapper/types/cosmos-async/body) | Request body. |
| `headers` | [`Headers`](/docs/development/api-wrapper/types/cosmos-async/headers) | Request headers. |

Example:

```ts
// Enable/disable incognito mode
const res = await Spicetify.CosmosAsync.put("sp://scrobble/v1/incognito", { enabled: boolean });
```

### `del`

Make a `DELETE` request to the specified URL.

```ts
function del(url: string, body?: Body, headers?: Headers): Promise<Response["body"]>;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `url` | `string` | URL to make the request to. |
| `body` | [`Body`](/docs/development/api-wrapper/types/cosmos-async/body) | Request body. |
| `headers` | [`Headers`](/docs/development/api-wrapper/types/cosmos-async/headers) | Request headers. |

### `patch`

Make a `PATCH` request to the specified URL.

```ts
function patch(url: string, body?: Body, headers?: Headers): Promise<Response["body"]>;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `url` | `string` | URL to make the request to. |
| `body` | [`Body`](/docs/development/api-wrapper/types/cosmos-async/body) | Request body. |
| `headers` | [`Headers`](/docs/development/api-wrapper/types/cosmos-async/headers) | Request headers. |

### `sub`

Make a `SUB` request to the specified URL.

```ts
function sub(url: string, callback: ((b: Response["body"]) => void), onError?: ((e: Error) => void), body?: Body, headers?: Headers): Promise<Response["body"]>;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `url` | `string` | URL to make the request to. |
| `callback` | `(b: Response["body"]) => void` | Callback function to run when the request is successful. |
| `onError` | `(e: Error) => void` | Callback function to run when the request fails. |
| `body` | [`Body`](/docs/development/api-wrapper/types/cosmos-async/body) | Request body. |
| `headers` | [`Headers`](/docs/development/api-wrapper/types/cosmos-async/headers) | Request headers. |

### `postSub`

Make a `POST` request to the specified URL, and subscribe to the response.

```ts
function postSub(url: string, body: Body | null, callback: ((b: Response["body"]) => void), onError?: ((e: Error) => void)): Promise<Response["body"]>;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `url` | `string` | URL to make the request to. |
| `body` | [`Body`](/docs/development/api-wrapper/types/cosmos-async/body) | Request body. |
| `callback` | `(b: Response["body"]) => void` | Callback function to run when the request is successful. |
| `onError` | `(e: Error) => void` | Callback function to run when the request fails. |

### `request`

Make a request to the specified URL.

```ts
function request(method: Method, url: string, body?: Body, headers?: Headers): Promise<Response>;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `method` | [`Method`](/docs/development/api-wrapper/types/cosmos-async/method) | HTTP method to use. |
| `url` | `string` | URL to make the request to. |
| `body` | [`Body`](/docs/development/api-wrapper/types/cosmos-async/body) | Request body. |
| `headers` | [`Headers`](/docs/development/api-wrapper/types/cosmos-async/headers) | Request headers. |

### `resolve`

Make a request to the specified URL, and resolve the response.

```ts
function resolve(method: Method, url: string, body?: Body, headers?: Headers): Promise<Response>;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `method` | [`Method`](/docs/development/api-wrapper/types/cosmos-async/method) | HTTP method to use. |
| `url` | `string` | URL to make the request to. |
| `body` | [`Body`](/docs/development/api-wrapper/types/cosmos-async/body) | Request body. |
| `headers` | [`Headers`](/docs/development/api-wrapper/types/cosmos-async/headers) | Request headers. |
