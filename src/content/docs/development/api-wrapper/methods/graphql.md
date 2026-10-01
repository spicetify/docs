---
title: GraphQL
description: Send Spotify's GraphQL operations from the running client.
---

`Spicetify.GraphQL` exposes Spotify's GraphQL request loader and the persisted operations found in the running client. In a module, use `client.graphQL`.

```ts
namespace GraphQL {
  const Definitions: Readonly<Record<string, PersistedDefinition>>;
  const Request: ((definition: PersistedDefinition, variables?: Record<string, any>, context?: Record<string, any>) => Promise<unknown>) | undefined;
  const Context: unknown;
  const Handler: unknown;
}
```

:::caution
This is Spotify's private API. Operation names, variables and responses change between client versions and server updates. When a `Spicetify.Platform` API offers the same operation, we recommend it. Your module must handle a missing definition and a failed request.
:::

## Example

Look up the definition when you need it, check that `Request` exists, and show the failure in your UI. This function requests an album with the client's `getAlbum` operation:

```ts
import { client } from '/modules/stdlib/mod.ts';

async function fetchAlbum(uri: string) {
  const definition = client.graphQL?.Definitions?.getAlbum;
  const request = client.graphQL?.Request;

  if (!definition || typeof request !== 'function') {
    throw new Error('Album details are unavailable in this Spotify client.');
  }

  return request(definition, { uri, locale: '', offset: 0, limit: 50 });
}
```

The variables and the response shape belong to Spotify and differ between versions. Inspect the operation in the DevTools network panel on the version you support.

## `Definitions`

`Definitions` is a read-only dictionary of persisted operations, keyed by operation name. The wrapper reads them from the webpack factories Spotify has already registered, without running extra factories, and refreshes the dictionary when factories change. Discovery requires v3.0.0-beta.18 or later. After you update the CLI, run `spicetify apply` again to install the new wrapper.

```ts
type PersistedDefinition = Readonly<{
  name: string;
  operation: 'query' | 'mutation';
  sha256Hash: string;
  value: null;
}>;
```

The hash identifies Spotify's persisted operation. A definition has no GraphQL document, variable schema or response schema. Pass it to `Request` as it is, and never hardcode its hash in your module.

```ts
Object.keys(Spicetify.GraphQL.Definitions);
```

A name that is missing returns `undefined`. Spotify may not have loaded the chunk that holds it, or may have renamed or removed it. When two factories declare the same name with a different hash or operation type, the wrapper leaves that name out.

- Look up a definition immediately before the request. A value you destructure at startup stays `undefined` if the operation loads later.
- The dictionary rejects writes. Pass a definition you maintain yourself straight to `Request`.
- The [`Query`](/docs/development/api-wrapper/types/graphql/query) list is historical and does not guarantee that an operation exists.

v3 has no `QueryDefinitions`, `MutationDefinitions` or `ResponseDefinitions`. Queries and mutations share `Definitions`, and the `operation` field tells them apart.

## `Request`

`Request` is Spotify's `Platform.GraphQLLoader`. On a client without it, the wrapper falls back to `Handler(Context)`. Pass a definition and its variables. The optional third argument holds Spotify's own request options.

A definition does not guarantee that the request succeeds. Handle a rejected promise and any errors in the returned response.

## `Context` and `Handler`

`Context` and `Handler` are Spotify internals that the wrapper uses for the fallback. Either can be `undefined`, and neither has a stable shape. Call `Request` instead.
