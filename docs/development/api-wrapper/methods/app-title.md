---
title: AppTitle
description: Set of API methods to interact with the Spotify client app title.
---

Spicetify provides a set of API methods to interact with the Spotify client app title.

:::note

These methods only work for the default app title.

:::

```ts
namespace AppTitle {
    function set(title: string): Promise<{ clear: () => void }>;
    function reset(): Promise<void>;
    function get(): Promise<string>;
    function sub(callback: (title: string) => void): { clear: () => void };
}
```

## Methods

### `set`

Set the default app title and force it until canceled. This will override any previous forced title.

:::note

This will temporarily override the current title if a track is being played until the player changes track or the user interacts with the player.

:::

```ts
function set(title: string): Promise<{ clear: () => void }>;
```

#### Parameters

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| `title` | `string` | Title to set |

#### Returns

Promise that resolves to a function to cancel forced title. This doesn't reset the title.

#### Example

```ts
await Spicetify.AppTitle.set("My Extension");
```

### `reset`

Reset app title to default.

```ts
function reset(): Promise<void>;
```

#### Example

```ts
await Spicetify.AppTitle.reset(); // Spotify Premium
```

### `get`

Get current default app title.

:::note

This method cannot get the title of the currently played track.

:::

```ts
function get(): Promise<string>;
```

#### Returns

Current default app title.

#### Example

```ts
const title = await Spicetify.AppTitle.get();
console.log(title); // Spotify Premium
```

### `sub`

Subscribe to title changes.

:::note

This event is not fired when the player changes app title.

:::

```ts
function sub(callback: (title: string) => void): { clear: () => void };
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| `callback` | `(title: string) => void` | Callback to call when title changes |

#### Returns

Object with method to unsubscribe.

#### Example

```ts
const { clear } = Spicetify.AppTitle.sub((title) => {
    console.log(title);
});

await Spicetify.AppTitle.set("My Extension"); // Console: My Extension

clear();
```