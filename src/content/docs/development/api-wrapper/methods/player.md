---
title: Player
description: A collection of methods to interact with the Spotify player.
---

Spicetify provides a collection of methods to interact with the Spotify player. You can get the current player state, play/pause, skip to next/previous track, set repeat/shuffle mode, and more.

This is mostly a wrapper of the `Spicetify.Platform.PlayerAPI` object.

```ts
namespace Player {
    function addEventListener(type: string, callback: (event?: Event) => void): void;
    function addEventListener(type: "songchange", callback: (event?: Event & { data: PlayerState }) => void): void;
    function addEventListener(type: "onplaypause", callback: (event?: Event & { data: PlayerState }) => void): void;
    function addEventListener(type: "onprogress", callback: (event?: Event & { data: number }) => void): void;
    function back(): void;
    const data?: PlayerState;
    function decreaseVolume(): void;
    function dispatchEvent(event: Event): void;
    const eventListeners: {
        [key: string]: Array<(event?: Event) => void>
    };
    function formatTime(milisecond: number): string;
    function getDuration(): number;
    function getMute(): boolean;
    function getProgress(): number;
    function getProgressPercent(): number;
    function getRepeat(): number;
    function getShuffle(): boolean;
    function getHeart(): boolean;
    function getVolume(): number;
    function increaseVolume(): void;
    function isPlaying(): boolean;
    function next(): void;
    function pause(): void;
    function play(): void;
    function playUri(uri: string, context?: any, options?: any): Promise<void>;
    function removeEventListener(type: string, callback: (event?: Event) => void): void;
    function seek(position: number): void;
    function setHeart(status: boolean): void;
    function setMute(state: boolean): void;
    function setRepeat(mode: number): void;
    function setShuffle(state: boolean): void;
    function setVolume(level: number): void;
    function skipBack(amount?: number): void;
    function skipForward(amount?: number): void;
    function toggleHeart(): void;
    function toggleMute(): void;
    function togglePlay(): void;
    function toggleRepeat(): void;
    function toggleShuffle(): void;
}
```

## Properties

### data

An object contains all information about current track and player.

:::caution

If the current player doesn't have any track, `data` will be `null`. Always check for `null` before using `data` to avoid errors.

:::

```ts
Spicetify.Player.data;
```

#### Return

[`PlayerState`](/docs/development/api-wrapper/types/player-state.md)


#### Example

```ts
// Get current track URI
const currentURI = Spicetify.Player.data?.item.uri;
if (currentURI) {
    console.log(currentURI);
}
```

### eventListeners

An object containing all registered event listeners.

```ts
Spicetify.Player.eventListeners;
```

#### Return

```ts
{
    [key: string]: Array<(event?: Event) => void>
}
```

| Key | Description |
| --- | ----------- |
| `key` | Event type |
| `value` | Array of registered event listeners |

## Methods

### addEventListener

Register a listener of `type` on Spicetify.Player. You can use this method to listen to events that are fired throughout the app, including:

  * `songchange` type when player changes track.
  * `onplaypause` type when player plays or pauses.
  * `onprogress` type when track progress changes.

```ts
// Register a listener that will be called when player changes track
Spicetify.Player.addEventListener("songchange", (event) => {
    // Do something
    console.log(event.data);
});
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| `type` | `string` | Event type |
| `callback` | `(event?: Event) => void` | Event listener. Includes relevant information about the event (e.g. `data` for `songchange` event) |

### dispatchEvent

Dispatches an event at `Spicetify.Player`.

By default, `Spicetify.Player` always dispatch

  * `songchange` type when player changes track.
  * `onplaypause` type when player plays or pauses.
  * `onprogress` type when track progress changes.

```ts
Spicetify.Player.dispatchEvent(event);
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| `event` | `Event` | Event to dispatch. Includes relevant information about the event (e.g. `data` for `songchange` event) |

### back

Skip to previous track.

```ts
Spicetify.Player.back();
```

### decreaseVolume

Decrease a small amount of volume. The value is automatically determined by the client.

```ts
Spicetify.Player.decreaseVolume();
```

### formatTime

Format a time in milliseconds to a string in `mm:ss` format.

```ts
Spicetify.Player.formatTime(time);
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| `time` | `number` | Time in milliseconds |

#### Return

`string`

#### Example

```ts
Spicetify.Player.formatTime(1000); // "00:01"

// Get current track duration
const duration = Spicetify.Player.getDuration();
const formattedDuration = Spicetify.Player.formatTime(duration);
console.log(formattedDuration); // "03:45"
```

### getDuration

Return the duration of current track in milliseconds.

```ts
Spicetify.Player.getDuration();
```

#### Return

`number`

#### Example

```ts
// Get current track duration
const duration = Spicetify.Player.getDuration();
console.log(duration); // 225000
```

### getMute

Return the mute state of player.

```ts
Spicetify.Player.getMute();
```

#### Return

`boolean`

### getProgress

Return the progress of current track in milliseconds.

```ts
Spicetify.Player.getProgress();
```

#### Return

`number`

#### Example

```ts
// Get current track progress
const progress = Spicetify.Player.getProgress();
console.log(progress); // 10000
```

### getProgressPercent

Return the progress of current track in percentage, from 0 to 1.

```ts
Spicetify.Player.getProgressPercent();
```

#### Return

`number`

#### Example

```ts
// Get current track progress
const progress = Spicetify.Player.getProgressPercent();
console.log(progress); // 0.04
```

### getRepeat

Return the repeat mode of player. The value can be:

  * `0` for no repeat.
  * `1` for repeat all.
  * `2` for repeat one.

```ts
Spicetify.Player.getRepeat();
```

#### Return

`number`

### getShuffle

Return the shuffle state of player.

```ts
Spicetify.Player.getShuffle();
```

#### Return

`boolean`

### getHeart

Return the heart state of player.

```ts
Spicetify.Player.getHeart();
```

#### Return

`boolean`

### getVolume

Return the volume of player. The value is from 0 to 1.

```ts
Spicetify.Player.getVolume();
```

#### Return

`number`

### increaseVolume

Increase a small amount of volume. The value is automatically determined by the client.

```ts
Spicetify.Player.increaseVolume();
```

### next

Skip to next track.

```ts
Spicetify.Player.next();
```

### pause

Pause the player.

```ts
Spicetify.Player.pause();
```

### play

Resume the player.

```ts
Spicetify.Player.play();
```

### playUri

Start playback of the specified track.

```ts
Spicetify.Player.playUri(uri, context?: any, options?: any);
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| `uri` | `string` | Track URI string |
| `context` | `any` | Context of the track. Default is `{}` |
| `options` | `any` | Options of the track. Default is `{}` |

#### Example

```ts
// 505 - Arctic Monkeys
const trackURI = "spotify:track:0BxE4FqsDD1Ot4YuBXwAPp";

await Spicetify.Player.playUri(trackURI);
```

### removeEventListener

Unregister added event listener `type`.

```ts
Spicetify.Player.removeEventListener(type, callback);
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| `type` | `string` | Event type |
| `callback` | `(event?: Event) => void` | Event listener |

### seek

Seek track to position. Position can be in percentage (0 to 1) or in milliseconds.

```ts
Spicetify.Player.seek(position);
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| `position` | `number` | Position to seek. Can be in percentage (0 to 1) or in milliseconds |

#### Example

```ts
// Seek to 50% of track
Spicetify.Player.seek(0.5);

// Seek to 1 minute of track
Spicetify.Player.seek(60000);
```

### setHeart

Set the heart status of the currently playing track.

```ts
Spicetify.Player.setHeart(status);
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| `status` | `boolean` | Heart status |

### setMute

Set the mute state of player.

```ts
Spicetify.Player.setMute(state);
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| `state` | `boolean` | Mute state |

### setRepeat

Set the repeat mode of player. The value can be:

  * `0` for no repeat.
  * `1` for repeat all.
  * `2` for repeat one.

```ts
Spicetify.Player.setRepeat(mode);
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| `mode` | `number` | Repeat mode |

### setShuffle

Set the shuffle state of player.

```ts
Spicetify.Player.setShuffle(state);
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| `state` | `boolean` | Shuffle state |

### setVolume

Set the volume of player. The value is from 0 to 1.

```ts
Spicetify.Player.setVolume(level);
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| `level` | `number` | Volume |

### toggleHeart

Toggle the heart state of player / save / unsave the current track from user's library.

```ts
Spicetify.Player.toggleHeart();
```

### toggleMute

Toggle the mute state of player.

```ts
Spicetify.Player.toggleMute();
```

### togglePlay

Toggle the play state of player.

```ts
Spicetify.Player.togglePlay();
```

### toggleRepeat

Toggle the repeat mode of player. The value switches between: No repeat, Repeat all, Repeat one.

```ts
Spicetify.Player.toggleRepeat();
```

### toggleShuffle

Toggle the shuffle state of player.

```ts
Spicetify.Player.toggleShuffle();
```
