---
title: GraphQL
description: Use Spotify's current-client GraphQL operations in Spicetify v3.
---

`Spicetify.GraphQL` exposes Spotify's request loader and the persisted operations
discovered in the running client. V3 modules can access the same object through
`client.graphQL` from `@spicetify/stdlib`.

:::note
Runtime definition discovery requires the CLI fix for
[#3927](https://github.com/spicetify/cli/issues/3927), which is not included in
`v3.0.0-beta.17`. After installing a release containing the fix, reapply
Spicetify to update the embedded wrapper. Updating stdlib alone does not install
this fix.
:::

:::caution
This is Spotify's private API. Operation names, variables, responses, and
availability can change between client versions or server updates. Prefer a
native `Spicetify.Platform.*API` when it provides the operation you need, and
handle unavailable definitions and failed requests in your module.
:::

## Usage

Look up the definition when you need it, check that the request loader is
available, and handle errors in the feature's UI. For example, this function
requests an album using the running client's `getAlbum` operation:

```ts
import { client } from "@spicetify/stdlib";

async function fetchAlbum(uri: string) {
  const graphQL = client.graphQL;
  const definition = graphQL?.Definitions?.getAlbum;
  const request = graphQL?.Request;

  if (!definition || typeof request !== "function") {
    throw new Error("Album details are unavailable in this Spotify client.");
  }

  return request(definition, { uri, locale: "", offset: 0, limit: 50 });
}
```

Extensions using the compatibility wrapper can replace `client.graphQL` with
`Spicetify.GraphQL`. The operation's variables and response shape still depend
on Spotify; the example is not a version-independent album schema.

### `Definitions`

`Definitions` is a read-only, flat dictionary keyed by operation name. V3 reads
persisted-operation metadata from the webpack factories already registered by
Spotify. Discovery does not execute additional factories or rewrite the client
bundle. Parsed metadata is cached, and later lookups account for newly loaded,
replaced, or removed factories.

Each discovered definition has this shape:

```ts
type PersistedDefinition = Readonly<{
  name: string;
  operation: "query" | "mutation";
  sha256Hash: string;
  value: null;
}>;
```

The hash identifies Spotify's persisted operation. It is not a response-cache
key, and the definition does not contain a GraphQL AST, variable schema, or
response schema. Pass the object to `Request`; do not copy its hash into a
module as a permanent fallback.

To inspect the operations available now:

```ts
Object.keys(Spicetify.GraphQL.Definitions);
Spicetify.GraphQL.Definitions.getAlbum;
```

An absent name returns `undefined`. This can mean Spotify has not loaded the
relevant chunk, removed or changed the operation, or uses metadata the wrapper
does not recognize. If factories declare the same name with conflicting hashes
or operation types, v3 omits that name rather than choosing a potentially wrong
definition.

Keep these limits in mind:

- The dictionary is not a complete catalog of Spotify's API.
- Look up a definition near the request. Destructuring an unavailable operation
  at module startup keeps that local variable `undefined` even if it appears
  later.
- Do not assign to the dictionary or mutate a definition.
- If you maintain a custom definition, pass it directly to `Request` rather than
  inserting it into the shared registry. You own its compatibility with Spotify.
- The historical [`Query` list](/docs/development/api-wrapper/types/graphql/query)
  is not an availability guarantee. Search operations in particular may have
  different names and variables across Spotify versions.

#### `QueryDefinitions`, `MutationDefinitions`, `ResponseDefinitions`

V3 does not expose these separate collections. Queries and mutations share
`Definitions`; inspect a definition's `operation` field to distinguish them.
There is no response-definition registry.

### `Request`

`Request` uses Spotify's captured request loader with the current client
context. Its call shape is:

```ts
Request(definition, variables?, context?): Promise<unknown>;
```

Pass a discovered definition as the first argument and the operation's variables
as the second. The optional third argument contains Spotify-specific request
options; it is not a stable Spicetify configuration interface.

Check that `Request` is a function before calling it. A usable definition does
not guarantee that the loader was captured, the server still accepts the
operation, or the request will succeed. Handle both rejected promises and any
operation-level errors in the returned response.

Use Spotify's DevTools network requests to inspect the variables and response
for the operation on the version you support. Do not infer its full contract
from the operation name or hash.

### `Context`

`Context` is a best-effort exposure of a Spotify implementation detail. It may
be unavailable and has no stable field list in v3. Modules should use `Request`
instead of constructing their own authentication context.

### `Handler`

`Handler` is a best-effort exposure of Spotify's request-handler factory. It may
be unavailable even when `Request` works: the wrapper prefers Spotify's native
`Platform.GraphQLLoader` and only falls back to `Handler(Context)` when that
loader is absent. Modules should normally call `Request` directly.
