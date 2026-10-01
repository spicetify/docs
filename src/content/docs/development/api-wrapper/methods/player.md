---
title: Player
description: Read and control playback in the Spotify client.
---

`Spicetify.Player` reads and controls playback. Most methods call [`Platform.PlayerAPI`](/docs/development/api-wrapper/methods/platform#playerapi), which `Spicetify.Player.origin` returns. In a module, use `client.player`.

```ts
namespace Player {
  const data: PlayerState | null | undefined;
  const origin: PlayerAPI;
  const eventListeners: Record<string, Array<(event?: Event) => void>>;
  function addEventListener(type: 'songchange' | 'onplaypause', callback: (event?: Event & { data: PlayerState | null }) => void): void;
  function addEventListener(type: 'onprogress', callback: (event?: Event & { data: number }) => void): void;
  function addEventListener(type: string, callback: (event?: Event) => void): void;
  function removeEventListener(type: string, callback: (event?: Event) => void): void;
  function dispatchEvent(event: Event): boolean;
  function play(): void;
  function pause(): void;
  function togglePlay(): void;
  function isPlaying(): boolean;
  function playUri(uri: string, context?: any, options?: any): Promise<void>;
  function next(): void;
  function back(): void;
  function seek(position: number): void;
  function skipForward(amount?: number): void;
  function skipBack(amount?: number): void;
  function getProgress(): number;
  function getProgressPercent(): number;
  function getDuration(): number;
  function formatTime(milliseconds: number): string;
  function getVolume(): number;
  function setVolume(level: number): void;
  function increaseVolume(): void;
  function decreaseVolume(): void;
  function getMute(): boolean;
  function setMute(state: boolean): void;
  function toggleMute(): void;
  function getRepeat(): number;
  function setRepeat(mode: number): void;
  function toggleRepeat(): void;
  function getShuffle(): boolean;
  function setShuffle(state: boolean): void;
  function toggleShuffle(): void;
  function getHeart(): boolean;
  function setHeart(state: boolean): void;
  function toggleHeart(): void;
}
```

## State

`data` is the current [`PlayerState`](/docs/development/api-wrapper/types/player-state). It is `undefined` until the first track loads and `null` when the player has no track, so check it before you read it.

```ts
const trackUri = Spicetify.Player.data?.item.uri;
```

## Events

`addEventListener` registers a listener for one of the events the wrapper dispatches:

- `songchange` fires when the current track changes. `event.data` is the new `PlayerState`, or `null`.
- `onplaypause` fires when playback pauses or resumes. `event.data` is the `PlayerState`.
- `onprogress` fires every 100 milliseconds while a track plays. `event.data` is the position in milliseconds.

`removeEventListener` removes a listener you registered. `dispatchEvent` calls every listener for `event.type` and returns `false` when a listener called `preventDefault`.

```ts
function logTrack(event) {
  console.log(event?.data?.item.name);
}

Spicetify.Player.addEventListener('songchange', logTrack);
Spicetify.Player.removeEventListener('songchange', logTrack);
```

## Playback

These methods start, stop and move playback.

- `play` resumes playback, `pause` pauses it, and `togglePlay` switches between the two.
- `playUri` starts playback of a URI. `context` and `options` default to empty objects and go to `PlayerAPI.play`.
- `next` and `back` skip to the next or previous track.
- `seek` takes milliseconds. A value between 0 and 1 that is not an integer is a fraction of the track, so `seek(0.5)` seeks to the middle.
- `skipForward` and `skipBack` move by `amount` milliseconds, which defaults to 15000.

```ts
await Spicetify.Player.playUri('spotify:track:0BxE4FqsDD1Ot4YuBXwAPp');
Spicetify.Player.seek(60000);
```

## Position

`getProgress` and `getDuration` return milliseconds. `getProgressPercent` returns the position as a fraction from 0 to 1. `formatTime` formats milliseconds as minutes and seconds.

```ts
Spicetify.Player.formatTime(Spicetify.Player.getDuration()); // "3:45"
```

## Volume

`getVolume` and `setVolume` use a level from 0 to 1. `increaseVolume` and `decreaseVolume` change it by the client's step. `getMute` is `true` when the volume is 0. `setMute` and `toggleMute` click the volume button in the now playing bar.

## Repeat and shuffle

The repeat mode is `0` for off, `1` for repeat all and `2` for repeat one. `toggleRepeat` moves to the next mode. `getShuffle`, `setShuffle` and `toggleShuffle` read and change shuffle.

## Liked state

`getHeart` returns `true` when the current track is in the user's library. `setHeart` adds it to or removes it from the library, and `toggleHeart` flips the state.
