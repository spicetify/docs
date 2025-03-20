---
title: GraphQL
description: GraphQL API Wrapper
---

GraphQL API Wrapper used throughout the Spotify client. It is used to communicate with their GraphQL API endpoints for tailored operations such as fetching data, or making mutations.

:::caution

Because this is a private API, it is not documented by Spotify. This documentation is based on the usage of the API in the Spotify client, and may not be accurate.

It is also subject to drastic changes in the future, and has gone through such changes in the past.

Any issues or errors that arise from using this API are not the responsibility of this documentation. If you want to take advantage of this API, bear this in mind.

:::

## Introduction

After reading [`CosmosAsync`](/docs/development/api-wrapper/methods/cosmos-async) and its usage with Spotify [Web API](https://developer.spotify.com/documentation/web-api/), you may be wondering why this is needed, and what is the difference between the two.

In this section, we will be answering these questions:

- What is GraphQL?
- Why do we need to use the GraphQL API wrapper?

### What is GraphQL?

[GraphQL](https://graphql.org/) is a query language for APIs and a runtime for fulfilling those queries with your existing data. It provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

Basically, it is a query language that allows you to query for data in a more flexible way, and allows you to get exactly what you need.

### Why do we need to use the GraphQL API wrapper?

**_"Why can't we just use the Web API?"_**

Unlike the Web API, where we are allowed to get general data for Spotify resources, the GraphQL API is used to get data for tailored operations inside the client, such as fetching colors of the current track for the _Now Playing View_ panel, get all resources for a playlist displayed in the client, or return the search results for a query.

**_"Why can't we use [`CosmosAsync`](/docs/development/api-wrapper/methods/cosmos-async) for GraphQL endpoints?"_**

While you can technically make requests to the GraphQL endpoints using [`CosmosAsync`](/docs/development/api-wrapper/methods/cosmos-async), you would need a lot of special queries to do so, and it would be a lot more complicated than it needs to be.

Take the following endpoint for example, to get the extracted colors used in the _Now Playing View_ panel, you would need to make a request to the following endpoint using [`CosmosAsync`](/docs/development/api-wrapper/methods/cosmos-async):

```ts
await Spicetify.CosmosAsync.get(
  `https://api-partner.spotify.com/pathfinder/v1/query?operationName=fetchExtractedColors&variables={"uris":["spotify:image:ab67616d00001e02f16ab998eea7e598a0928ad7"]}&extensions={"persistedQuery":{"version":1,"sha256Hash":"d7696dd106f3c84a1f3ca37225a1de292e66a2d5aced37a66632585eeb3bbbfa"}}`
);
```

compared to using the GraphQL API wrapper:

```ts
const { fetchExtractedColors } = Spicetify.GraphQL.Definitions;
await Spicetify.GraphQL.Request(
  fetchExtractedColors,
  { uris: ['spotify:image:ab67616d00001e02f16ab998eea7e598a0928ad7'] },
);
```

Both would return the same result, but the latter is a lot more readable and easier to use, so why is that? Let's break the endpoint down to understand why.

```js
`https://api-partner.spotify.com/pathfinder/v1/query?operationName=fetchExtractedColors&variables={"uris":["spotify:image:ab67616d00001e02f16ab998eea7e598a0928ad7"]}&extensions={"persistedQuery":{"version":1,"sha256Hash":"d7696dd106f3c84a1f3ca37225a1de292e66a2d5aced37a66632585eeb3bbbfa"}}`;
```

Here in the request URL, we can see that there are 3 parts to it:

- `operationName`
- `variables`
- `extensions`

##### `operationName`

This is the name of the operation that you want to perform.

In this case, it is `fetchExtractedColors`.

Nothing too complicated about that.

##### `variables`

Stringified JSON variables that you want to pass to the operation.

In this case, it is `{"uris":["spotify:image:ab67616d00001e02f16ab998eea7e598a0928ad7"]}`.

Not all requests have the same requirements, and without documentation, it would be hard to know which variables are required for each request. Of course, for a specific operation, you can track down the network request using DevTools and see what variables are being passed.

##### `extensions`

Stringified JSON extensions that you want to pass to the operation.

In this case, it is `{"persistedQuery":{"version":1,"sha256Hash":"d7696dd106f3c84a1f3ca37225a1de292e66a2d5aced37a66632585eeb3bbbfa"}}`.

This is the most complicated part of the request. It is used to cache the request, so that the same request does not need to be made again. This is done by passing a `sha256Hash` of the request to the server, and if the server has the same hash, it will return the cached result instead of making the request again.

In this context, the hash is created from the following GraphQL query (as in Spotify `1.2.12`):

```graphql
query fetchExtractedColors($uris: [ID!]!) {
  extractedColors(uris: $uris) {
    __typename
    ... on ExtractedColors {
      colorRaw {
        hex
        isFallback
      }
      colorDark {
        hex
        isFallback
      }
      colorLight {
        hex
        isFallback
      }
    }
    ... on Error {
      message
    }
  }
}
```

By itself, it looks like gibberish, since you have no way of telling what the hash is, and what it is used for. Additionally, as seen from the query above, each request will have their own unique hash, and the request would return an error if the hash is mismatched or not provided.

You also wouldn't be able to tell if Spotify have changed the query server-side until the request breaks, and would need to track down the network request again to get the new hash.

##### Conclusion

As you can see, it is a lot more complicated to make a request to the GraphQL API using [`CosmosAsync`](/docs/development/api-wrapper/methods/cosmos-async), and it would be a lot more complicated to make a request to other GraphQL endpoints as well.

The GraphQL API wrapper simplifies this process by providing a set of definitions used by Spotify themselves, and a method to make requests to the GraphQL API using these definitions.

As long as you have a valid definition, the [`Request`](#request) method will automatically parse the definition and make the request for you.

## Usage

The `GraphQL` object is a set of methods that helps you make requests to the GraphQL API.

```ts
namespace GraphQL {
  const Definitions: Record<Query | string, any>;
  const QueryDefinitions: Record<Query | string, any>;
  const MutationDefinitions: Record<Query | string, any>;
  const ResponseDefinitions: Record<Query | string, any>;
  const Context: Record<string, any>;
  function Request(query: typeof Definitions[Query | string], variables?: Record<string, any>, context?: Record<string, any>): Promise<any>;
  function Handler(context: Record<string, any>): (query: typeof Definitions[Query | string], variables?: Record<string, any>, context?: Record<string, any>) => Promise<any>;
}
```

### `Definitions`

The `Definitions` object is a collection of GraphQL definitions used by Spotify.

You can use these definitions to make requests to the GraphQL API using the [`Request`](#request) method.

```ts
const Definitions: Record<Query | string, any>;
```

For a list of definitions, see [`Query`](/docs/development/api-wrapper/types/graphql/query).

:::caution

The list of methods are subjected to change in the future depending on Spotify's usage.

Also of the nature that this is a private API, the definitions are not documented by Spotify. They can also be removed in the future, both server-side and client-side.

It is recommended to check the definitions in DevTools before using them, and to have several fallbacks in case a definition is removed.

:::

#### Understanding Definitions

:::info

To fully understand these definitions, see [Apollo GraphQL Schema](https://www.apollographql.com/docs/apollo-server/schema/schema/).

In this section, we will only cover the basics of the definitions to get you started as quickly as possible.

:::

Each definition has a similar structure, for this example we will be using a fragment of the `fetchExtractedColors` definition.

```ts
{
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "fetchExtractedColors"
            },
            "variableDefinitions": [
                {
                    "kind": "VariableDefinition",
                    "variable": {
                        "kind": "Variable",
                        "name": {
                            "kind": "Name",
                            "value": "uris"
                        }
                    },
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "ListType",
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "NamedType",
                                    "name": {
                                        "kind": "Name",
                                        "value": "ID"
                                    }
                                }
                            }
                        }
                    }
                }
            ],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        // ...
                    }
                ]
            }
        }
    ]
}
```

Inside a `Definition` object, there are 3 main parts:

- `kind`
- `definitions`
- `selectionSet`

For the time being, we will only need to care about `definitions`.

##### `definitions`

There are 2 types of definitions:

- `OperationDefinition`
- `FragmentDefinition`

Essentially, you can only use the `OperationDefinition` type to make requests to the GraphQL API, and `FragmentDefinition` is used to define a fragment that can be used in other definitions.

Each type of definition is filtered into [subsets of the `Definitions` object](#querydefinitions-mutationdefinitions-responsedefinitions) for ease of use.

Inside the `OperationDefinition` object, there are 3 main parts:

- `operation`
- `name`
- `variableDefinitions`

###### `operation`

This is the type of operation that you want to perform, and can be either `query` or `mutation`.

###### `name`

This is the name of the operation that you want to perform. Usually the name of the definition is self-explanatory, so you can be sure of what the operation does by looking at the name.

###### `variableDefinitions`

This is the list of variables that you want to pass to the operation.

This is considered the most important part of the definition, as it is required to make a request to the GraphQL API. We will break it down using the example above in the easiest way possible.

```ts
"variableDefinitions": [
    {
        "kind": "VariableDefinition",
        "variable": {
            "kind": "Variable",
            "name": {
                "kind": "Name",
                "value": "uris"
            }
        },
        "type": {
            "kind": "NonNullType",
            "type": {
                "kind": "ListType",
                "type": {
                    "kind": "NonNullType",
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "ID"
                        }
                    }
                }
            }
        }
    }
]
```

The `variableDefinitions` object is an array of `VariableDefinition` objects. Each object represents a variable that you want to pass to the operation. Each objects can be represented as a property of the `variable` object passed onto the `Request` method.

In this case, the `variableDefinitions` object only has 1 `VariableDefinition` object named `uris`, so we only need to pass 1 variable to the `Request` method.

Inside the `VariableDefinition` object, there are 2 main parts:

- `variable`
- `type`

###### `variable`

This is the name of the variable that you want to pass to the operation. We only need to care about the name of the variable, as the rest of the object is used to parse the definition.

In the example above, the name of the variable is `uris`, so in the [`Request`](#request) method, we would pass the variable as follows:

```ts
Spicetify.GraphQL.Request(
  Spicetify.GraphQL.Definitions.fetchExtractedColors,
  { uris: /* ... */ },
);
```

###### `type`

Each type has its equivalent type in JavaScript, and in the example above we get the following reference:

- `NonNullType`: `!`, meaning that the variable is required.
- `ListType`: `[]`, meaning that the variable is an array.
- `NamedType`: `string`, meaning that the variable is a string.


:::note

Sometimes a variable is not listed as `NonNullType`, but is still required to make a successful request. This is because the variable is required by the operation itself, and not the definition.

:::

:::info

For a full list of types, see [GraphQL Scalar Types](https://graphql.org/learn/schema/#scalar-types).

:::

As we can see, the variable `uris` is a required array of strings.

To conclude, the `fetchExtractedColors` method requires:

  1. A parameter named `uris`
  2. The `uris` parameter is a required array of strings

So the request would look like this:

```ts
Spicetify.GraphQL.Request(
  Spicetify.GraphQL.Definitions.fetchExtractedColors,
  { uris: ['spotify:image:ab67616d00001e02f16ab998eea7e598a0928ad7'] },
);
```

Using the same logic, you can parse the rest of the definitions to know the structure of the response by understanding the `selectionSet` object, or explore the response in DevTools.

### `QueryDefinitions`, `MutationDefinitions`, `ResponseDefinitions`

The `QueryDefinitions`, `MutationDefinitions` and `ResponseDefinitions` objects are subsets of the `Definitions` object.

These are filtered by their type, and are used to make different types of requests to the GraphQL API using the [`Request`](#request) method.

```ts
const QueryDefinitions: Record<Query | string, any>;
const MutationDefinitions: Record<Query | string, any>;
const ResponseDefinitions: Record<Query | string, any>;
```

Each type of definition is used for a different purpose:

- `QueryDefinitions`: Used to make GraphQL queries. These are queries that are used to fetch data. (e.g. fetching playlist metadata)
- `MutationDefinitions`: Used to make GraphQL mutations. These are queries that are used to mutate data. (e.g. adding a track to a playlist)
- `ResponseDefinitions`: Used to parse GraphQL responses.

Most of the time, you would only need to use the `QueryDefinitions` and `MutationDefinitions` subsets to make requests to the GraphQL API.

### `Request`

The `Request` method is used to make requests to the GraphQL API using the definitions provided.

```ts
function Request(
  query: typeof Definitions[Query | string],
  variables?: Record<string, any>,
  context?: Record<string, any>
): Promise<any>;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `query` | `Record<string, any>` | The definition to use for the request. |
| `variables` | `Record<string, any>` | The variables to pass to the operation. |
| `context` | `Record<string, any>` | The context to use for the request. |

| Return | Type | Description |
| --- | --- | --- |
| `Promise` | `any` | The response from the request. |

#### `query`

The `query` parameter is the definition to use for the request. It can be any definition from the [`Definitions`](#definitions) object.

#### `variables`

The `variables` parameter is the variables to pass to the operation. It can be any valid variables for the operation.

#### `context`

The `context` parameter is the context to use for the request. It can be any valid context for the operation. These will be passed onto the request as parameters.

##### Example

```ts
// Get all data displayed in an album page
const { getAlbum } = Spicetify.GraphQL.Definitions;
await Spicetify.GraphQL.Request(
  getAlbum,
  { uri: "spotify:album:3lvY0ag1k3qiPCsEM3Wnku", locale: "en", limit: 50, offset: 0 },
  { persistCache: true },
);
```

### `Context`

The `Context` class is used to set the context for the [`Handler`](#handler) method.

```ts
const Context: Record<string, any>;
```

On Spotify `1.2.12`, the class contains the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `accessToken` | `string` | The access token to use for the request. |
| `globalRequestHeaders` | `string[][]` | The global request headers to use for the request. |
| `locale` | `string` | The locale to use for the request. |
| `market` | `string` | The market to use for the request. |

### `Handler`

The `Handler` method is used to create a handler for the [`Request`](#request) method.

```ts
function Handler(
  context: Record<string, any>
): (
  query: typeof Definitions[Query | string],
  variables?: Record<string, any>,
  context?: Record<string, any>
) => Promise<any>;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `context` | `Record<string, any>` | The context to use for the request. |

:::info

The `context` parameter is the same as the [`Context`](#context) class.

:::

| Return | Type | Description |
| --- | --- | --- |
| `Function` | `(query: Record<string, any>, variables?: Record<string, any>, context?: Record<string, any>) => Promise<any>` | The handler for the request. |

:::info

The [`Request`](#request) method is a preinitialized version of the [`Handler`](#handler) method using the current context.

:::