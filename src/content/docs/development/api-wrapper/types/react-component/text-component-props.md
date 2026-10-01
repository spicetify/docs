---
title: TextComponentProps
description: The props of ReactComponent.TextComponent.
---

`TextComponentProps` are the props of [`ReactComponent.TextComponent`](/docs/development/api-wrapper/properties/react-components#iconcomponent-and-textcomponent). The text is its `children`.

```ts
type TextComponentProps = {
  color?: string;
  semanticColor?: SemanticColor;
  variant?: Variant;
  paddingBottom?: string;
  weight?: 'book' | 'bold' | 'black';
};
```

| Prop | Description |
| --- | --- |
| `variant` | A [`Variant`](/docs/development/api-wrapper/types/variant) type style. |
| `semanticColor` | A [`SemanticColor`](/docs/development/api-wrapper/types/semantic-color) from Spotify's theme. |
| `color` | A CSS color. Some versions of the component ignore it. |
| `weight` | The font weight. |
| `paddingBottom` | The space below the text, as a CSS length. |
