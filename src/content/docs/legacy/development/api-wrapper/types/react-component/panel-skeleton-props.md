---
title: PanelSkeletonProps
description: The props of the v2 ReactComponent.PanelSkeleton.
---

:::warning
Not available in Spicetify v3, which has no `Spicetify.Panel` and no panel components. In a v3 module, use stdlib's `registerPanel`, described on the [Panel](/docs/legacy/development/api-wrapper/methods/panel) page.
:::

`PanelSkeletonProps` were the props of the v2 `PanelSkeleton`, which framed a panel.

```ts
type PanelSkeletonProps = {
    label?: string;
    itemUri?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
};
```

| Prop | Description |
| --- | --- |
| `label` | The panel's accessible label. It does not set the header. |
| `itemUri` | The URI that Spotify's event logging records for the panel. |
| `className` | Extra class names. Deprecated since Spotify 1.2.12. |
| `style` | Inline styles. |
| `children` | The panel content. |
