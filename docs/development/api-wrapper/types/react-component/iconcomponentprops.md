---
title: IconComponentProps
description: Type definition for props of ReactComponent.IconComponent.
---

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

The `IconComponentProps` object is used to create an icon component.

```ts
type IconComponentProps = {
    iconSize?: number;
    color?: string;
    semanticColor?: 'textBase' | 'textSubdued' | 'textBrightAccent' | 'textNegative' | 'textWarning' | 'textPositive' | 'textAnnouncement' | 'essentialBase' | 'essentialSubdued' | 'essentialBrightAccent' | 'essentialNegative' | 'essentialWarning' | 'essentialPositive' | 'essentialAnnouncement' | 'decorativeBase' | 'decorativeSubdued' | 'backgroundBase' | 'backgroundHighlight' | 'backgroundPress' | 'backgroundElevatedBase' | 'backgroundElevatedHighlight' | 'backgroundElevatedPress' | 'backgroundTintedBase' | 'backgroundTintedHighlight' | 'backgroundTintedPress' | 'backgroundUnsafeForSmallTextBase' | 'backgroundUnsafeForSmallTextHighlight' | 'backgroundUnsafeForSmallTextPress';
    title?: string;
    titleId?: string;
    desc?: string;
    descId?: string;
    autoMirror?: boolean;
};
```

#### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| iconSize | `number` &#124; `undefined` | Icon size |
| color | `string` &#124; `undefined` | Icon color. Might not be used by component |
| semanticColor | `'textBase'` &#124; `'textSubdued'` &#124; `'textBrightAccent'` &#124; `'textNegative'` &#124; `'textWarning'` &#124; `'textPositive'` &#124; `'textAnnouncement'` &#124; `'essentialBase'` &#124; `'essentialSubdued'` &#124; `'essentialBrightAccent'` &#124; `'essentialNegative'` &#124; `'essentialWarning'` &#124; `'essentialPositive'` &#124; `'essentialAnnouncement'` &#124; `'decorativeBase'` &#124; `'decorativeSubdued'` &#124; `'backgroundBase'` &#124; `'backgroundHighlight'` &#124; `'backgroundPress'` &#124; `'backgroundElevatedBase'` &#124; `'backgroundElevatedHighlight'` &#124; `'backgroundElevatedPress'` &#124; `'backgroundTintedBase'` &#124; `'backgroundTintedHighlight'` &#124; `'backgroundTintedPress'` &#124; `'backgroundUnsafeForSmallTextBase'` &#124; `'backgroundUnsafeForSmallTextHighlight'` &#124; `'backgroundUnsafeForSmallTextPress'` &#124; `undefined` | Semantic color name. Matches color variables used in xpui |
| title | `string` &#124; `undefined` | Icon title |
| titleId | `string` &#124; `undefined` | Title ID (internal) |
| desc | `string` &#124; `undefined` | Icon description |
| descId | `string` &#124; `undefined` | Description ID (internal) |
| autoMirror | `boolean` &#124; `undefined` | Whether the icon can be auto mirrored |