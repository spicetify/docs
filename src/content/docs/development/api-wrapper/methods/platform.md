---
title: Platform
description: Spotify's internal platform APIs, collected on Spicetify.Platform.
---

`Spicetify.Platform` holds the internal APIs that Spotify's own UI uses. The wrapper copies them from Spotify's platform object and adds every registry service whose name ends in `API`. In a module, use `client.platform`.

```ts
Spicetify.Platform;
```

:::warning
These APIs are private to Spotify. Their names and signatures change between client versions without notice, so check that a method exists before you call it.
:::

The set of APIs depends on the Spotify version, and this page covers the ones that have stayed stable. List the rest in DevTools with `Object.keys(Spicetify.Platform)`. The modules repository has a [generated type dump](https://github.com/spicetify/modules/blob/main/platform.d.ts) of every API on a recent client.

## `ClipboardAPI`

`ClipboardAPI` reads and writes the system clipboard.

```ts
interface ClipboardAPI {
  copy(text: string): Promise<void>;
  paste(): Promise<string | undefined>;
}
```

`copy` stringifies a value that is not a string before it copies it. `paste` resolves `undefined` when the clipboard does not hold text.

```ts
await Spicetify.Platform.ClipboardAPI.copy('spotify:track:6rqhFgbbKwnb9MLmUQDhG6');
```

## `History`

`History` is the client's router. Use it to open pages, including your own routes.

```ts
interface Location {
  pathname: string;
  search: string;
  hash: string;
  state: Record<string, any>;
}

interface History {
  push(path: Location | string): void;
  replace(path: Location | string): void;
  goBack(): void;
  goForward(): void;
  listen(listener: (location: Location) => void): () => void;
  entries: Location[];
  location: Location;
}
```

- `push` opens a page and adds it to the history stack.
- `replace` opens a page in place of the current entry, so the user cannot go back to the replaced page.
- `listen` calls `listener` after each navigation and returns a function that removes it. The new page may not have rendered when `listener` runs.
- `entries` is the history stack, and `location` is the current entry.

```ts
Spicetify.Platform.History.push('/search');

const stopListening = Spicetify.Platform.History.listen((location) => {
  console.log(location.pathname);
});
```

## `LocalStorageAPI`

`LocalStorageAPI` stores JSON values in `localStorage` under keys that start with the current user's namespace, in the form `${namespace}:${key}`. For keys shared across accounts, use [`Spicetify.LocalStorage`](/docs/development/api-wrapper/methods/local-storage).

```ts
interface LocalStorageAPI {
  items: Record<string, any>;
  namespace: string;
  getItem(key: string): any;
  setItem(key: string, value: any): void;
  clearItem(key: string): void;
}
```

`setItem` stores the value with `JSON.stringify`, and `getItem` returns it parsed. `items` holds every namespaced key with its parsed value.

```ts
Spicetify.Platform.LocalStorageAPI.setItem('volume-presets', { night: 0.2 });
Spicetify.Platform.LocalStorageAPI.getItem('volume-presets'); // { night: 0.2 }
```

## `PlatformData`

`PlatformData` describes the running client.

```ts
interface PlatformData {
  app_platform: string;
  client_capabilities: Record<string, any>;
  client_variant?: unknown;
  event_sender_context_information: Record<string, any>;
  is_developer_mode: boolean;
  os_version: string;
  remote_config_client_id: string;
}
```

`app_platform` names the platform and architecture, such as `OSX_ARM64` or `WIN32_X86_64`. `is_developer_mode` is `true` after `spicetify dev`. `PlatformData` has no `os_name` field and no client version fields. Read the client version from `Spicetify.Platform.version`.

```ts
Spicetify.Platform.PlatformData.app_platform; // "OSX_ARM64"
Spicetify.Platform.version; // "1.2.97.270"
```

## `Session`

`Session` holds details of the signed-in session.

```ts
interface Session {
  isAnonymous: boolean;
  locale: string;
  market: string;
}
```

`Session` has no access token on current clients. `Spicetify.Platform.AuthorizationAPI.getState().token.accessToken` holds it, and [`CosmosAsync`](/docs/development/api-wrapper/methods/cosmos-async) adds it to Spotify requests for you.

## `Translations`

`Translations` maps Spotify's translation keys to strings in the client's language.

```ts
type Translations = Record<string, string>;
```

## `PlayerAPI`

`PlayerAPI` controls playback. [`Spicetify.Player`](/docs/development/api-wrapper/methods/player) wraps it, and `Spicetify.Player.origin` returns it.

```ts
enum RepeatMode {
  Off = 0,
  RepeatAll = 1,
  RepeatOne = 2,
}

interface PlayerAPI {
  addToQueue(items: ContextTrack[]): Promise<void>;
  removeFromQueue(items: ContextTrack[]): Promise<void>;
  clearQueue(): Promise<void>;
  play(track: ContextTrack, context: Record<string, any>, options?: Record<string, any>): Promise<void>;
  pause(): Promise<void>;
  resume(): Promise<void>;
  skipToNext(): Promise<void>;
  skipToPrevious(): Promise<void>;
  seekTo(ms: number): Promise<void>;
  seekBy(ms: number): Promise<void>;
  seekForward(ms: number): Promise<void>;
  seekBackward(ms: number): Promise<void>;
  setRepeat(mode: RepeatMode): Promise<void>;
  setShuffle(shuffle: boolean): Promise<void>;
  setSpeed(speed: number): Promise<void>;
}
```

- `addToQueue` shows Spotify's "Added to queue" notification. [`Spicetify.addToQueue`](/docs/development/api-wrapper/functions/add-to-queue) adds items without it.
- `play` takes a [`ContextTrack`](/docs/development/api-wrapper/types/context-track) and a context object, which can be empty.
- `seekBy` seeks backward for a negative value.
- `setSpeed` changes the playback speed of podcasts. It has no effect on music.

```ts
const track = { uri: 'spotify:track:0BxE4FqsDD1Ot4YuBXwAPp' };

await Spicetify.Platform.PlayerAPI.addToQueue([track]);
await Spicetify.Platform.PlayerAPI.seekBy(-10000);
```
