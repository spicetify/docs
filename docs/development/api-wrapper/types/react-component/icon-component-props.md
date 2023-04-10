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
    semanticColor?: SemantiColor;
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
| semanticColor | [`SemanticColor`](../semantic-color) &#124; `undefined` | Semantic color name. Matches color variables used in xpui |
| title | `string` &#124; `undefined` | Icon title |
| titleId | `string` &#124; `undefined` | Title ID (internal) |
| desc | `string` &#124; `undefined` | Icon description |
| descId | `string` &#124; `undefined` | Description ID (internal) |
| autoMirror | `boolean` &#124; `undefined` | Whether the icon can be auto mirrored |
