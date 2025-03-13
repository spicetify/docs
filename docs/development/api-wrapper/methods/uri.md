---
title: URI
description: Set of API methods to parse and validate URIs.
---

Spicetify provides a set of API methods to parse and validate URIs. These are internal APIs used by Spotify in almost every component in the client.

This would be useful if you want to develop extensions that need to interact with Spotify components (e.g. open a track in the player, get playlist tracks, etc.).

:::warning

Because these APIs are internal, they are not guaranteed to be stable and may _drastically_ change in the future. Use them at your own risk.

:::

:::note

Spotify has had a major rework of this method in version `1.2.4`.

In this documentation, we will be covering the new method, used from version `1.2.4` onwards.

:::

## Introduction

Almost every component in the client has its own URI (Uniform Resource Indicator), whether it be a track, an album, a playlist, a user, etc. The URI is used to identify the resource and to interact with it.

They all follow the same format in the form of `spotify:<type>:<id>`, where `<type>` is the type of the resource and `<id>` is the `base62` unique identifier of the resource.

```
spotify:<type>:<id>
```

For example, a track URI looks like this:

```
spotify:track:6rqhFgbbKwnb9MLmUQDhG6
```

When you share a track, album, playlist, etc. on Spotify, you are actually sharing the URI of the resource.

It follows a similar format to the URI, but with a few differences:

```
https://open.spotify.com/<type>/<id>?query=parameters
```

For example, a track URL looks like this:

```
https://open.spotify.com/track/6rqhFgbbKwnb9MLmUQDhG6?si=2a3b4c5d6e7f8g9h
```

To get a URI of an item using the client interface, simply right-click on it, hover over `Share` and hold your <kbd>Ctrl</kbd> key. You will see a new option called `Copy Spotify URI` appear in place of `Copy Link`. Click on it to copy the URI to your clipboard.

## Usage

`Spicetify.URI` itself is a class that helps you create a URI object, as well as provide static methods to parse and validate URIs.

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

```ts
class URI {
  constructor(type: string, props: any);
  public type: string;
  public hasBase62Id: boolean;

  public id?: string;
  public disc?: any;
  public args?: any;
  public category?: string;
  public username?: string;
  public artist?: string;
  public album?: string;
  public query?: string;
  public country?: string;
  public global?: boolean;
  public context?: string | typeof URI | null;
  public anchor?: string;
  public play?: any;
  public toplist?: any;

  toURI(): string;
  toString(): string;
  toURLPath(opt_leadingSlash: boolean): string;
  toURL(origin?: string): string;
  clone(): URI | null;
  getPath(): string;
}
```

Almost all properties are optional, except for `type` and `hasBase62Id`. The `type` property is the type of the URI, and the `hasBase62Id` property is a boolean that indicates whether the URI has a `base62` identifier.

All other properties are dependent on the type of the URI. For example, a track URI _may_ include a `context` property, while a playlist URI _may_ include a `username` property.

The `type` property matches one of the values in the [`Spicetify.URI.Type`](/docs/development/api-wrapper/types/uri/type) enum.

### Example

```ts
const uri = new Spicetify.URI('track', {
  id: '6rqhFgbbKwnb9MLmUQDhG6',
  context: 'spotify:album:1Je1IMUlBXcx1Fz0WE7oPT',
});
```

### Dynamic methods

These methods are included in every instance of `Spicetify.URI`.

#### toURI

Creates a URI string from the URI object.

```ts
const uri = new Spicetify.URI('track', {
  id: '6rqhFgbbKwnb9MLmUQDhG6',
  context: 'spotify:album:1Je1IMUlBXcx1Fz0WE7oPT',
});

uri.toURI(); // spotify:track:6rqhFgbbKwnb9MLmUQDhG6?context=spotify:album:1Je1IMUlBXcx1Fz0WE7oPT
```

#### toString

Alias of [`toURI`](#touri)

```ts
const uri = new Spicetify.URI('track', {
  id: '6rqhFgbbKwnb9MLmUQDhG6',
  context: 'spotify:album:1Je1IMUlBXcx1Fz0WE7oPT',
});

uri.toString(); // spotify:track:6rqhFgbbKwnb9MLmUQDhG6?context=spotify:album:1Je1IMUlBXcx1Fz0WE7oPT
```

#### toURLPath

Creates a URL path from the URI object.

| Parameter        | Type                         | Description                                     |
| ---------------- | ---------------------------- | ----------------------------------------------- |
| opt_leadingSlash | `boolean` &#124; `undefined` | Whether to prepend a leading slash to the path. |

```ts
const uri = new Spicetify.URI('track', {
  id: '6rqhFgbbKwnb9MLmUQDhG6',
  context: 'spotify:album:1Je1IMUlBXcx1Fz0WE7oPT',
});

uri.toURLPath(); // /track/6rqhFgbbKwnb9MLmUQDhG6?context=spotify:album:1Je1IMUlBXcx1Fz0WE7oPT

uri.toURLPath(true); // /track/6rqhFgbbKwnb9MLmUQDhG6?context=spotify:album:1Je1IMUlBXcx1Fz0WE7oPT
```

#### toURL

Creates a URL from the URI object.

| Parameter | Type                        | Description                                                            |
| --------- | --------------------------- | ---------------------------------------------------------------------- |
| origin    | `string` &#124; `undefined` | The origin to use for the URL. Defaults to `https://open.spotify.com`. |

```ts
const uri = new Spicetify.URI('track', {
  id: '6rqhFgbbKwnb9MLmUQDhG6',
  context: 'spotify:album:1Je1IMUlBXcx1Fz0WE7oPT',
});

uri.toURL(); // https://open.spotify.com/track/6rqhFgbbKwnb9MLmUQDhG6?context=spotify:album:1Je1IMUlBXcx1Fz0WE7oPT

uri.toURL('https://example.com/'); // https://example.com/track/6rqhFgbbKwnb9MLmUQDhG6?context=spotify:album:1Je1IMUlBXcx1Fz0WE7oPT
```

#### clone

Clones the URI object.

```ts
const uri = new Spicetify.URI('track', {
  id: '6rqhFgbbKwnb9MLmUQDhG6',
  context: 'spotify:album:1Je1IMUlBXcx1Fz0WE7oPT',
});

const clone = uri.clone();

clone.toURI(); // spotify:track:6rqhFgbbKwnb9MLmUQDhG6?context=spotify:album:1Je1IMUlBXcx1Fz0WE7oPT
```

#### getPath

Gets the path of the URI object by removing all hash and query parameters.

```ts
const uri = new Spicetify.URI('track', {
  id: '6rqhFgbbKwnb9MLmUQDhG6',
  context: 'spotify:album:1Je1IMUlBXcx1Fz0WE7oPT',
});

uri.getPath(); // spotify:track:6rqhFgbbKwnb9MLmUQDhG6
```

### Static methods

These methods are included in the `Spicetify.URI` class.

#### Type

An enum of all URI types.

```ts
const { Type } = Spicetify.URI;

Type.ALBUM; // album
```

For a list of all URI types, see the [`Spicetify.URI.Type`](/docs/development/api-wrapper/types/uri/type) enum and explore in DevTools.

##### Usage

You can use this enum to check and validate the type of a URI.

```ts
const uri = new Spicetify.URI('track', {
  id: '6rqhFgbbKwnb9MLmUQDhG6',
  context: 'spotify:album:1Je1IMUlBXcx1Fz0WE7oPT',
});

uri.type === Spicetify.URI.Type.TRACK; // true
```

#### from

Parses a given argument into a [`URI`](#usage) instance.

Unlike [`URI.fromString`](#fromstring), this function could receive any kind of value.

If the value is already a URI instance, it is simply returned. Otherwise the value will be stringified before parsing.

This function also does not throw an error like [`URI.fromString`](#fromstring), but
instead simply returns null if it can't parse the value.

```ts
class URI {
  static from(value: any): URI | null;
}
```

| Parameter | Type  | Description         |
| --------- | ----- | ------------------- |
| value     | `any` | The value to parse. |

```ts
Spicetify.URI.from('spotify:track:6rqhFgbbKwnb9MLmUQDhG6'); // URI instance

Spicetify.URI.from('https://open.spotify.com/track/6rqhFgbbKwnb9MLmUQDhG6'); // URI instance

Spicetify.URI.from(new Spicetify.URI('track', { id: '6rqhFgbbKwnb9MLmUQDhG6' })); // URI instance

Spicetify.URI.from(Spicetify.URI.from('spotify:track:6rqhFgbbKwnb9MLmUQDhG6')); // URI instance

Spicetify.URI.from({ id: '6rqhFgbbKwnb9MLmUQDhG6' }); // null
```

#### fromString

Parses a given string into a [`URI`](#usage) instance.

:::caution

This function will throw a `TypeError` if the argument passed is not a string. Use [`URI.from`](#from) if you want to parse any kind of value.

:::

```ts
class URI {
  static fromString(uri: string): URI;
}
```

| Parameter | Type     | Description       |
| --------- | -------- | ----------------- |
| uri       | `string` | The URI to parse. |

```ts
Spicetify.URI.fromString('spotify:track:6rqhFgbbKwnb9MLmUQDhG6'); // URI instance

Spicetify.URI.fromString('https://open.spotify.com/track/6rqhFgbbKwnb9MLmUQDhG6'); // URI instance

Spicetify.URI.fromString('spotify:track:6rqhFgbbKwnb9MLmUQDhG6?context=spotify:album:1Je1IMUlBXcx1Fz0WE7oPT'); // URI instance

Spicetify.URI.fromString(new Spicetify.URI('track', { id: '6rqhFgbbKwnb9MLmUQDhG6' })); // TypeError: Argument `uri` must be a string.
```

#### Validation functions

Each URI type has a validation function that can be used to check if a given string is a valid URI of that type.

For a list of all validation functions, see [`Validation functions`](/docs/development/api-wrapper/types/uri/validation-functions).

:::caution

Almost all playlists use the `playlist-v2` type, so use `Spicetify.URI.isPlaylistV2URI` instead.

Similarly, you can use `Spicetify.URI.isPlaylistV1OrV2` to check if a URI is a playlist of any version.

:::

```ts
const { isAlbumURI } = Spicetify.URI;

isAlbumURI('spotify:album:1Je1IMUlBXcx1Fz0WE7oPT'); // true
```
