---
title: TextComponentProps
description: Type definition for props of ReactComponent.TextComponent.
---

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

The `TextComponentProps` object is used to create a text component.

```ts
type TextComponentProps = {
    color?: string;
    semanticColor?: SemanticColor;
    variant?: Variant;
    paddingBottom?: string;
    weight?: 'book' | 'bold' | 'black';
};
```

#### Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| color | `string` &#124; `undefined` | Text color. Might not be used by component. |
| semanticColor | [`SemanticColor`](../semantic-color) &#124; `undefined` | Semantic color name. Matches color variables used in xpui |
| variant | [`Variant`](../variant) &#124; `undefined` | Font variant |
| paddingBottom | `string` &#124; `undefined` | Bottom padding size |
| weight | `'book'` &#124; `'bold'` &#124; `'black'` &#124; `undefined` | Font weight |
