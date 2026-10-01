---
title: extractColorPreset
description: Get the colors Spotify's own UI derives from an image.
---

`Spicetify.extractColorPreset` runs Spotify's color extraction on an image and returns the colors Spotify's UI would use for it. It accepts a Spotify image URI or an image URL, or a list of them, and resolves one preset per image.

```ts
function extractColorPreset(image: string | string[]): Promise<
  {
    colorRaw: Color;
    colorLight: Color;
    colorDark: Color;
    isFallback: boolean;
  }[]
>;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `image` | `string \| string[]` | A Spotify image URI or an image URL, or a list of them. |

Each color is a [`Color`](/docs/development/api-wrapper/classes/color). `isFallback` is `true` when Spotify couldn't extract colors and returned its default ones.

```ts
const [preset] = await Spicetify.extractColorPreset(imageUrl);
if (!preset.isFallback) {
  header.style.background = preset.colorDark.toCSS(Spicetify.Color.CSSFormat.HEX);
}
```

For the color extractor service that works from an item URI, see [`colorExtractor`](/docs/development/api-wrapper/functions/color-extractor).
