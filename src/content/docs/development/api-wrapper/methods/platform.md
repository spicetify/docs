---
title: Platform
description: A vast collection of internal APIs used throughout the Spotify client.
---

Spicetify provides a vast collection of internal APIs used throughout the Spotify client. These APIs are used to interact with the Spotify client and modify its behavior.

Explore all available methods in DevTools:

```js
Spicetify.Platform
```

:::warning

Because these APIs are internal, they are not guaranteed to be stable and may *drastically* change in the future. Use them at your own risk.

:::

## Usage

Since these APIs differ between each version of the Spotify client, we cannot provide a complete list of all available APIs. Instead, we provide a list of APIs that may prove useful for extension developers and that have generally not changed much over the years.

:::note

If a method is not listed here, it could be that:
  - It is objectively complicated to use.
  - It is not well documented.
  - It is generally not useful/convenient for extension developers.
  - It is not stable and may change/has changed drastically throughout versions.

:::

:::tip

Feel free to reach out to the developers' community on [**Discord**](https://discord.gg/VnevqPp2Rr) if you need help with any of these methods.

:::

### ClipboardAPI

The Spotify client doesn't allow users to copy directly from the client (say `Ctrl + C`), but it does provide an API to copy text to the clipboard.

```ts
interface ClipboardAPI {
    copy: (text: string) => Promise<void>;
    paste: () => Promise<string | undefined>;
};
```

#### `copy`

Copy text to clipboard.

:::info

The parameter passed will be stringified before being copied to the clipboard.

:::

| Parameter | Type | Description |
| --- | --- | --- |
| `text` | `string` | Text to copy. |

Example:

```ts
// Will be copied as "Hello World!"
await Spicetify.Platform.ClipboardAPI.copy("Hello World!");

// Will be stringified to '{"0":0,"1":0,"2":0,"3":0}'
await Spicetify.Platform.ClipboardAPI.copy(new Uint16Array(4));
```

#### `paste`

Paste text from clipboard. Returns a string.

:::caution

If the content of the clipboard is not a string, this method will return `undefined`.

:::

Example:

```ts
await Spicetify.Platform.ClipboardAPI.copy("Hello World!");
await Spicetify.Platform.ClipboardAPI.paste(); // "Hello World!"

await Spicetify.Platform.ClipboardAPI.copy(new Uint16Array(4));
await Spicetify.Platform.ClipboardAPI.paste(); // '{"0":0,"1":0,"2":0,"3":0}'
```

### History

Spotify has their own router API that allows you to navigate to different pages within the client. You can use it to navigate within your custom apps or push new pages to the history stack and display them for the users.

```ts
interface History {
    push: (path: Location | string) => void;
    replace: (path: Location | string) => void;
    goBack: () => void;
    goForward: () => void;
    listen: (listener: (location: Location) => void) => () => void;
    entries: Location[];
    location: Location;
};
```
Their `Location` object is a simple object that contains the `pathname` of the current page as well as the relevant query parameters and state. It looks roughly like this:

```ts
interface Location {
    pathname: string;
    search: string;
    hash: string;
    state: Record<string, any>;
};
```

#### `push`

Push a new location to the history stack.

You can pass either a `Location` object or a `pathname` string to this method.

| Parameter | Type | Description |
| --- | --- | --- |
| `path` | `Location` &#124; `string` | Location to push. |

```ts
Spicetify.Platform.History.push("/app/your-app");

Spicetify.Platform.History.push({
    pathname: "/app/your-app",
    search: "?foo=bar",
    hash: "#baz",
    state: { foo: "bar" },
});
```

#### `replace`

Replace the current location in the history stack.

:::caution

Users will **not** be able to go back to the previous page.

:::

You can pass either a `Location` object or a `pathname` string to this method.

| Parameter | Type | Description |
| --- | --- | --- |
| `path` | `Location` &#124; `string` | Location to replace. |

```ts
// Replace the current location with a new one.
Spicetify.Platform.History.replace("/app/your-app");

Spicetify.Platform.History.replace({
    pathname: "/app/your-app",
    search: "?foo=bar",
    hash: "#baz",
    state: { foo: "bar" },
});
```

#### `goBack`

Go back to the previous location in the history stack.

#### `goForward`

Go forward to the next location in the history stack.

:::caution

The page may not be fully loaded when this event is fired. You may need to wait for the DOM to finish loading before you can interact with it.

:::

#### `listen`

Listen to changes in the history stack. Fires whenever the user navigates to a new page.

| Parameter | Type | Description |
| --- | --- | --- |
| `listener` | `(location: Location) => void` | Callback to fire when the user navigates to a new page. |

Example:

```ts
Spicetify.Platform.History.listen((location) => {
    // Log the current pathname every time the user navigates to a new page.
    console.log(location.pathname);
});
```

#### `entries`

An array of all locations in the history stack.

#### `location`

The current location in the history stack.

### LocalStorageAPI

Spotify provides a simple API to interact with the browser's local storage. All keys are stored using the current user's username as the namespace.

Inside `localStorage`, the keys are stored using the following format:

```ts
`${namespace}:${key}`
```

:::tip

All keys created using this method will be namespaced using the current user's username.

If you wish to create a generic key, you can use [`Spicetify.LocalStorage`](./local-storage) instead.

:::

```ts
interface LocalStorageAPI {
    items: Record<string, any>;
    namespace: string;
    getItem: (key: string) => any;
    setItem: (key: string, value: any) => void;
    clearItem: (key: string) => void;
};
```

#### `items`

An object containing all the keys and values stored in the local storage.

All keys in `items` are stored using the aforementioned format, with it's value pair being the value stored in the local storage parsed using `JSON.parse`.

Example:

```ts
Spicetify.Platform.LocalStorageAPI.items; // { "username:foo": "bar" }
```

#### `namespace`

The namespace used to store all keys in the local storage. Usually the current user's username.

#### `getItem`

Get a value from the local storage. Returns a parsed value using `JSON.parse`.

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | Key to get. |

Example:

```ts
// This is equivalent to Spicetify.Platform.LocalStorageAPI.items["username:foo"]
// or localStorage.getItem("username:foo")
Spicetify.Platform.LocalStorageAPI.getItem("foo"); // "bar"
```

#### `setItem`

Set a value in the local storage. The value will be stringified using `JSON.stringify`.

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | Key to set. |
| `value` | `any` | Value to set. Can be any type. |

Example:

```ts
Spicetify.Platform.LocalStorageAPI.setItem("foo", { bar: "baz" });
// localStorage.getItem("username:foo") === '{"bar":"baz"}'
```

#### `clearItem`

Clear a value from the local storage.

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | Key to clear. |

Example:

```ts
Spicetify.Platform.LocalStorageAPI.clearItem("foo");
// localStorage.getItem("username:foo") === null
```

### PlatformData

Contains data about the current platform, such as the current Spotify client version, operating system, and more.

```ts
interface PlatformData {
    app_platform: string;
    client_capabilities: Record<string, any>;
    client_version_triple: string;
    client_version_quadruple: string;
    client_version_quintuple: string;
    event_sender_context_information: Record<string, any>;
    os_name: string;
    os_version: string;
}
```

#### `app_platform`

The current Spotify client platform.

Example:

```ts
Spicetify.Platform.PlatformData.app_platform; // "win32"
```

#### `client_capabilities`

An object containing the current client capabilities. This usually contains information relating to functionality inside the Spotify client, such as whether or not the client can autostart.

#### `client_version_triple`, `client_version_quadruple`, `client_version_quintuple`

The current Spotify client version. Usually in the format `1.2.8`, `1.2.8.923`, or `1.2.8.923.g4f94bf0d`.

#### `event_sender_context_information`

An object containing information about the current operating system. Used for analytics throughout the Spotify client.

Example:

```ts
Spicetify.Platform.PlatformData.event_sender_context_information; // { "platform_type:"windows", "os_version": "10.0.19042" }
```

This could also help you diagnose issues with your custom apps. For example, if you're using a custom app on Windows and you're getting an error, you can check the `event_sender_context_information` object to see if the `platform_type` is `windows` or `macos`.

#### `os_name`

The current operating system.

Example:

```ts
Spicetify.Platform.PlatformData.os_name; // "windows"
```

#### `os_version`

The current operating system version.

Example:

```ts
Spicetify.Platform.PlatformData.os_version; // "10.0.19042"
```

### Session

Contains data about the current user session, such as the current user's access token, locale, and more.

```ts
interface Session {
    accessToken: string;
    accessTokenExpirationTimestampMs: number;
    locale: string;
}
```

:::note

If you're trying to make an API request to internal Spotify endpoints, you should use [`CosmosAsync`](/docs/development/api-wrapper/methods/cosmos-async)

:::

#### `accessToken`

The current user's access token. This is used to authenticate requests to the Spotify API.

#### `accessTokenExpirationTimestampMs`

The timestamp in milliseconds when the current user's access token expires.

#### `locale`

The current user's locale.

Example:

```ts
Spicetify.Platform.Session.locale; // "en"
```

### Translations

Contains translation strings used throughout the current Spotify client.

```ts
interface Translations {
    [key: string]: string;
}
```

### PlayerAPI

Contains methods to interact with the Spotify client's player.

:::tip

It is recommended to use [`Player`](/docs/development/api-wrapper/methods/player) instead for ease of use, or access `Player.origin` to get the `PlayerAPI` object.

:::

```ts
interface PlayerAPI {
    addToQueue: (items: ContextTrack[]) => Promise<void>;
    clearQueue: () => Promise<void>;
    pause: () => Promise<void>;
    play: (uri: ContextTrack, context, options = {}) => Promise<void>;
    removeFromQueue: (items: ContextTrack[]) => Promise<void>;
    resume: () => Promise<void>;
    seekBackward: (ms: number) => Promise<void>;
    seekBy: (ms: number) => Promise<void>;
    seekForward: (ms: number) => Promise<void>;
    seekTo: (ms: number) => Promise<void>;
    setRepeat: (mode: RepeatMode) => Promise<void>;
    setShuffle: (shuffle: boolean) => Promise<void>;
    setSpeed: (speed: number) => Promise<void>;
}
```

#### `RepeatMode`

Enum for the repeat mode.

```ts
enum RepeatMode {
    Off = 0,
    RepeatAll = 1,
    RepeatOne = 2,
}
```

#### `addToQueue`

Add items to the current user's queue.

:::tip

This works as if the user had clicked the `Add to queue` button in the Spotify client, meaning a notification will be shown.

If you want to add items to the queue without showing a notification, use [`Spicetify.addToQueue`](/docs/development/api-wrapper/functions/add-to-queue).

:::

```ts
await Spicetify.Platform.PlayerAPI.addToQueue(items);
```

| Parameter | Type | Description |
| --- | --- | --- |
| `items` | [`ContextTrack[]`](/docs/development/api-wrapper/types/context-track) | Items to add to the queue. |

##### Example

```ts
// Add a track to the queue

// 505 - Arctic Monkeys
const track = { uri: "spotify:track:0BxE4FqsDD1Ot4YuBXwAPp" };

await Spicetify.Platform.PlayerAPI.addToQueue([track]);
```

#### `clearQueue`

Clear the current user's queue.

```ts
await Spicetify.Platform.PlayerAPI.clearQueue();
```

#### `pause`

Pause the current user's playback.

```ts
await Spicetify.Platform.PlayerAPI.pause();
```

#### `play`

:::tip

It is recommended to use [`Player.playUri`](/docs/development/api-wrapper/methods/player#playuri) instead for ease of use.

:::

Start playback of a track.

```ts
await Spicetify.Platform.PlayerAPI.play(uri, context, options);
```

| Parameter | Type | Description |
| --- | --- | --- |
| `uri` | [`ContextTrack`](/docs/development/api-wrapper/types/context-track) | The track to play. |
| `context` | `Record<string, any>` | The context of the track. Must be an object. |
| `options` | `Record<string, any>` &#124; `undefined` | Playback options. |

##### Example

```ts
// 505 - Arctic Monkeys
const track = { uri: "spotify:track:0BxE4FqsDD1Ot4YuBXwAPp" };

// Play the track
// Spicetify.Player.playUri(track.uri);
await Spicetify.Platform.PlayerAPI.play(track, {}, {});
```

#### `removeFromQueue`

Remove items from the current user's queue.

:::tip

This works similarly to [`Spicetify.removeFromQueue`](/docs/development/api-wrapper/functions/remove-from-queue).

:::

```ts
await Spicetify.Platform.PlayerAPI.removeFromQueue(items);
```

| Parameter | Type | Description |
| --- | --- | --- |
| `items` | [`ContextTrack[]`](/docs/development/api-wrapper/types/context-track) | Items to remove from the queue. |

##### Example

```ts
// Remove a track from the queue

// 505 - Arctic Monkeys
const track = { uri: "spotify:track:0BxE4FqsDD1Ot4YuBXwAPp" };

// Remove the track if it's in the queue
await Spicetify.Platform.PlayerAPI.removeFromQueue([track]);
```

#### `resume`

Resume the current user's playback.

```ts
await Spicetify.Platform.PlayerAPI.resume();
```

#### `seekBackward`

Seek backward in the current user's playback.

```ts
await Spicetify.Platform.PlayerAPI.seekBackward(ms);
```

| Parameter | Type | Description |
| --- | --- | --- |
| `ms` | `number` | The number of milliseconds to seek backward. |

##### Example

```ts
// Seek backward 10 seconds
await Spicetify.Platform.PlayerAPI.seekBackward(10000);
```

#### `seekBy`

Seek by a number of milliseconds in the current user's playback.

If passed a negative number, it will seek backward.

```ts
await Spicetify.Platform.PlayerAPI.seekBy(ms);
```

| Parameter | Type | Description |
| --- | --- | --- |
| `ms` | `number` | The number of milliseconds to seek by. |

##### Example

```ts
// Seek forward 10 seconds
await Spicetify.Platform.PlayerAPI.seekBy(10000);

// Seek backward 10 seconds
await Spicetify.Platform.PlayerAPI.seekBy(-10000);
```

#### `seekForward`

Seek forward in the current user's playback.

```ts
await Spicetify.Platform.PlayerAPI.seekForward(ms);
```

| Parameter | Type | Description |
| --- | --- | --- |
| `ms` | `number` | The number of milliseconds to seek forward. |

##### Example

```ts
// Seek forward 10 seconds
await Spicetify.Platform.PlayerAPI.seekForward(10000);
```

#### `seekTo`

Seek to a specific position in the current user's playback.

:::tip

[`Player.seek`](/docs/development/api-wrapper/methods/player#seek) support both seeking by a number of milliseconds and by a percentage.

:::

```ts
await Spicetify.Platform.PlayerAPI.seekTo(ms);
```

| Parameter | Type | Description |
| --- | --- | --- |
| `ms` | `number` | The position in milliseconds to seek to. |

##### Example

```ts
// Seek to 1 minute
await Spicetify.Platform.PlayerAPI.seekTo(60000);
```

#### `setRepeat`

Set the current user's repeat mode.

```ts
await Spicetify.Platform.PlayerAPI.setRepeat(mode);
```

| Parameter | Type | Description |
| --- | --- | --- |
| `mode` | [`RepeatMode`](#repeatmode) | The repeat mode to set. |

##### Example

```ts
// Set repeat mode to repeat one
await Spicetify.Platform.PlayerAPI.setRepeat(2);
```

#### `setShuffle`

Set the current user's shuffle mode.

```ts
await Spicetify.Platform.PlayerAPI.setShuffle(shuffle);
```

| Parameter | Type | Description |
| --- | --- | --- |
| `shuffle` | `boolean` | Whether to enable shuffle mode. |

##### Example

```ts
// Enable shuffle mode
await Spicetify.Platform.PlayerAPI.setShuffle(true);
```

#### `setSpeed`

Set the current user's playback speed.

:::note

This only works for podcasts. Music playback speed is unaffected.

:::

```ts
await Spicetify.Platform.PlayerAPI.setSpeed(speed);
```

| Parameter | Type | Description |
| --- | --- | --- |
| `speed` | `number` | The playback speed to set. |

##### Example

```ts
// Set playback speed to 1.5x
await Spicetify.Platform.PlayerAPI.setSpeed(1.5);
```
