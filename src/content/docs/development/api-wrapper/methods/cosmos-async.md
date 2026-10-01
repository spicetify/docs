---
title: CosmosAsync
description: Make requests to Spotify's internal endpoints and the Spotify Web API.
---

`Spicetify.CosmosAsync` sends requests to Spotify's internal `sp://` and `wg://` endpoints, the Spotify Web API and other URLs. In a module, use `client.cosmos`, which types every response body as `unknown` so you parse the fields you read.

```ts
namespace CosmosAsync {
  function head(url: string, headers?: Headers): Promise<Headers>;
  function get(url: string, body?: Body, headers?: Headers): Promise<Response['body']>;
  function post(url: string, body?: Body, headers?: Headers): Promise<Response['body']>;
  function put(url: string, body?: Body, headers?: Headers): Promise<Response['body']>;
  function del(url: string, body?: Body, headers?: Headers): Promise<Response['body']>;
  function patch(url: string, body?: Body, headers?: Headers): Promise<Response['body']>;
  function sub(url: string, callback: (body: Response['body']) => void, onError?: (error: Error) => void, body?: Body, headers?: Headers): Promise<Response['body']>;
  function postSub(url: string, body: Body | null, callback: (body: Response['body']) => void, onError?: (error: Error) => void): Promise<Response['body']>;
  function request(method: Method, url: string, body?: Body, headers?: Headers): Promise<Response>;
  function resolve(method: Method, url: string, body?: Body, headers?: Headers): Promise<Response>;
}
```

The types are [`Body`](/docs/development/api-wrapper/types/cosmos-async/body), [`Headers`](/docs/development/api-wrapper/types/cosmos-async/headers), [`Method`](/docs/development/api-wrapper/types/cosmos-async/method), [`Response`](/docs/development/api-wrapper/types/cosmos-async/response) and [`Error`](/docs/development/api-wrapper/types/cosmos-async/error).

## How the wrapper routes requests

On Spotify 1.2.31 and later, the wrapper handles `get`, `post`, `put`, `del` and `patch` for `http` and `https` URLs with `fetch`:

- A request to `api.spotify.com` gets the user's bearer token.
- A request to a Spotify `spclient` host gets the bearer token and the client's version and platform headers.
- A request to any other host goes through [`Spicetify.CORSProxy`](/docs/development/api-wrapper#spicetifycorsproxy) with no Spotify token.

On this path the wrapper ignores the `headers` argument, sends `body` as query parameters for `get` and as JSON for the other methods, and parses the response as JSON. A response with an error status resolves to an [`Error`](/docs/development/api-wrapper/types/cosmos-async/error) object instead of rejecting.

Requests to `sp://` and `wg://` URLs, and the `head`, `sub`, `postSub`, `request` and `resolve` methods, go to Spotify's own Cosmos client unchanged.

## Methods

`get`, `post`, `put`, `del`, `patch` and `head` send a request with that HTTP method and resolve with the response body. `request` and `resolve` take the method as their first argument and resolve with the whole `Response`.

`sub` subscribes to an endpoint and calls `callback` with each update. `postSub` sends a `POST` and then subscribes to the response.

```ts
const rootlist = await Spicetify.CosmosAsync.get('sp://core-playlist/v1/rootlist');
const playlists = rootlist.rows.filter((row) => row.type === 'playlist');

const profile = await Spicetify.CosmosAsync.get('https://api.spotify.com/v1/me');
```
