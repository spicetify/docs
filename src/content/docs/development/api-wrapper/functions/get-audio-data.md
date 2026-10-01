---
title: getAudioData
description: Fetch the audio analysis of a track.
---

`Spicetify.getAudioData` fetches a track's audio analysis from Spotify's `audio-attributes/v1/audio-analysis` endpoint. The response has the shape of the Web API's [audio analysis](https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis). Not every track has an analysis.

```ts
function getAudioData(uri?: string): Promise<any>;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `uri` | `string` &#124; `undefined` | A track URI. Defaults to the current track. |

The promise rejects with the string `"URI is invalid."` when `uri` is not a track URI.

```ts
const analysis = await Spicetify.getAudioData('spotify:track:1qDrWA6lyx8cLECdZE7TV7');
console.log(analysis.track.tempo);
```
