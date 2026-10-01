---
title: IconComponentProps
description: The props of ReactComponent.IconComponent.
---

`IconComponentProps` are the props of [`ReactComponent.IconComponent`](/docs/development/api-wrapper/properties/react-components#iconcomponent-and-textcomponent). The component accepts other SVG props too, such as `dangerouslySetInnerHTML`.

```ts
type IconComponentProps = {
  iconSize?: number;
  color?: string;
  semanticColor?: SemanticColor;
  title?: string;
  titleId?: string;
  desc?: string;
  descId?: string;
  autoMirror?: boolean;
};
```

| Prop | Description |
| --- | --- |
| `iconSize` | The width and height in pixels. |
| `semanticColor` | A [`SemanticColor`](/docs/development/api-wrapper/types/semantic-color) from Spotify's theme. |
| `color` | A CSS color. Some versions of the component ignore it. |
| `title`, `desc` | The accessible title and description. `titleId` and `descId` set their element IDs. |
| `autoMirror` | Mirrors the icon in right-to-left layouts. |
