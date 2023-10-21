---
title: getAudioData
description: Get the audio data from a track.
---

Fetch track analyzed audio data.

Under the hood, it uses the `wg://audio-attributes/v1/audio-analysis/` endpoint, which is identical to Spotify Web API's [Get Track's Audio Analysis](https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis). The only difference is that it doesn't require authentication.

:::caution

Beware, not all tracks have audio data.

:::

```ts
function getAudioData(uri?: string): Promise<any>;
```

#### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| uri | `string` &#124; `undefined` | URI of the track. If not provided, it will use the current track. |

#### Returns

An object containing the audio data. See the [Spotify Web API reference](https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis) for more details.

#### Example

```ts
// Get audio data from current track
const audioData = await Spicetify.getAudioData();

// Get audio data from a specific track
const audioData = await Spicetify.getAudioData("spotify:track:1qDrWA6lyx8cLECdZE7TV7");
```
