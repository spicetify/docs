---
title: colorExtractor
description: Get the color presets Spotify extracts from an item's artwork.
---

`Spicetify.colorExtractor` asks Spotify's color extractor service for the color presets of an item's artwork. It resolves `null` when the service returns no colors.

```ts
function colorExtractor(uri: string): Promise<{
  DARK_VIBRANT: string;
  DESATURATED: string;
  LIGHT_VIBRANT: string;
  PROMINENT: string;
  VIBRANT: string;
  VIBRANT_NON_ALARMING: string;
} | null>;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `uri` | `string` | The URI of an item with artwork, such as a track, album, artist, playlist or show. |

Each value is a hex color such as `#1db954`. The keys come from the service's response, so check a key before you use it.

```ts
const colors = await Spicetify.colorExtractor('spotify:album:1Je1IMUlBXcx1Fz0WE7oPT');
const accent = colors?.VIBRANT ?? '#1db954';
```

For the colors Spotify's own UI uses, see `Spicetify.extractColorPreset` and [`ReactHook.useExtractedColor`](/docs/development/api-wrapper/properties/react-hook#useextractedcolor).
