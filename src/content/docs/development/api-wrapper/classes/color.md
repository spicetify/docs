---
title: Color
description: Spotify's color class, for converting and adjusting colors.
---

`Spicetify.Color` is Spotify's own color class. It holds a color as RGB, HSL and HSV with an alpha value, and converts it to CSS strings. [`extractColorPreset`](/docs/development/api-wrapper/functions/extract-color-preset) returns its colors as `Color` objects.

```ts
class Color {
  constructor(rgb: rgb, hsl: hsl, hsv: hsv, alpha?: number);

  static BLACK: Color;
  static WHITE: Color;
  static CSSFormat: Record<"HEX" | "HEXA" | "HSL" | "HSLA" | "RGB" | "RGBA", number>;

  static fromCSS(cssColor: string, alpha?: number): Color;
  static fromHex(hex: string, alpha?: number): Color;
  static fromRGB(rgb: rgb, alpha?: number): Color;
  static fromHSL(hsl: hsl, alpha?: number): Color;
  static fromHSV(hsv: hsv, alpha?: number): Color;

  a: number;
  rgb: rgb; // { r, g, b }
  hsl: hsl; // { h, s, l }
  hsv: hsv; // { h, s, v }

  contrastAdjust(against: Color, strength?: number): Color;
  toCSS(colorFormat: number): string;
  stringify(): string;
  toString(): string;
}
```

`fromCSS` throws when the string isn't a CSS color it supports, and the string must not contain spaces. `contrastAdjust` returns a color whose contrast against `against` is at least `strength`. Pass a value from `Color.CSSFormat` to `toCSS`.

```ts
const accent = Spicetify.Color.fromHex('#1db954');
const readable = accent.contrastAdjust(Spicetify.Color.BLACK);
element.style.color = readable.toCSS(Spicetify.Color.CSSFormat.RGBA);
```

`Spicetify.Color` exists once Spicetify has exposed Spotify's webpack modules. See [`Events.webpackLoaded`](/docs/development/api-wrapper/properties/events).
