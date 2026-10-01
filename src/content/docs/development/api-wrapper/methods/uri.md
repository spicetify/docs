---
title: URI
description: Parse, build and check Spotify URIs.
---

`Spicetify.URI` is Spotify's own URI class, exposed by `spicetify apply`. The wrapper adds static parsers, creators and type checks to it. In a module, use `client.uri`.

:::warning
This is a private Spotify class. Its shape can change between client versions.
:::

A Spotify URI has the form `spotify:<type>:<id>`, where `<id>` is a base62 identifier. The matching web link is `https://open.spotify.com/<type>/<id>`.

```ts
class URI {
  constructor(type: string, props: any);
  type: string;
  hasBase62Id: boolean;
  id?: string;
  context?: string | URI | null;
  username?: string;
  query?: string;
  anchor?: string;

  toURI(): string;
  toString(): string;
  toURLPath(opt_leadingSlash: boolean): string;
  toURL(origin?: string): string;
  clone(): URI | null;
  getPath(): string;

  static Type: Record<string, string>;
  static from(value: any): URI | null;
  static fromString(uri: string): URI;
  static isSameIdentity(baseUri: URI | string, refUri: URI | string): boolean;
  static idToHex(id: string): string;
  static hexToId(hex: string): string;
}
```

Which other properties an instance has depends on its type. `type` is one of the [`URI.Type`](/docs/development/api-wrapper/types/uri/type) values.

## Instance methods

Every `URI` instance has these methods.

- `toURI` and `toString` return the URI string, including query parameters such as `context`.
- `toURLPath` returns the path inside `open.spotify.com`. Pass `true` to start it with a slash.
- `toURL` returns the web link. `origin` defaults to `https://open.spotify.com`.
- `clone` returns a copy.
- `getPath` returns the URI without its query and hash.

```ts
const uri = new Spicetify.URI('track', {
  id: '6rqhFgbbKwnb9MLmUQDhG6',
  context: 'spotify:album:1Je1IMUlBXcx1Fz0WE7oPT',
});

uri.getPath(); // "spotify:track:6rqhFgbbKwnb9MLmUQDhG6"
```

## Static methods

These methods are on the `Spicetify.URI` class itself.

- `from` parses a URI string, a web link or a `URI` instance, and returns `null` when it cannot parse the value.
- `fromString` parses a string and throws a `TypeError` for any other value.
- `isSameIdentity` returns `true` when both URIs point to the same item.
- `idToHex` converts a 22 character base62 ID to 32 hex characters, and `hexToId` converts it back.
- `Type` maps each type name to its value, so `Spicetify.URI.Type.TRACK` is `"track"`.

```ts
const parsed = Spicetify.URI.from('https://open.spotify.com/track/6rqhFgbbKwnb9MLmUQDhG6');
parsed?.type === Spicetify.URI.Type.TRACK; // true
```

The wrapper also adds two families of functions, named after the keys of `Type`:

- A check for every type, such as `isTrack` and `isPlaylistV2`, plus `isPlaylistV1OrV2`. See [Validation functions](/docs/development/api-wrapper/types/uri/validation-functions).
- A creator such as `trackURI`, `albumURI` or `playlistV2URI` for each type where Spotify ships one.

Almost every playlist has the `playlist-v2` type, so check playlists with `isPlaylistV1OrV2`.

```ts
Spicetify.URI.isAlbum('spotify:album:1Je1IMUlBXcx1Fz0WE7oPT'); // true
```
