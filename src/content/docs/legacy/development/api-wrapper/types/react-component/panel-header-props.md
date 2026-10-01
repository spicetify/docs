---
title: PanelHeaderProps
description: The props of the v2 ReactComponent.PanelHeader.
---

:::warning
Not available in Spicetify v3, which has no `Spicetify.Panel` and no panel components. In a v3 module, use stdlib's `registerPanel`, described on the [Panel](/docs/legacy/development/api-wrapper/methods/panel) page.
:::

`PanelHeaderProps` were the props of the v2 `PanelHeader`, which rendered a panel's title bar.

```ts
type PanelHeaderProps = {
    link?: string;
    title?: string;
    panel: number;
    isAdvert?: boolean;
    actions?: React.ReactNode;
    onClose?: () => void;
    preventDefaultClose?: boolean;
    onBack?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    titleVariant?: Variant;
    titleSemanticColor?: SemanticColor;
};
```

| Prop | Description |
| --- | --- |
| `link` | A URI, client path or URL that the title links to. |
| `title` | The title. |
| `panel` | The panel ID that the close button toggles. |
| `isAdvert` | Marks a panel that shows ads. Defaults to `false`. |
| `actions` | Controls shown in the header. |
| `onClose` | Runs before the panel closes from the close button. |
| `preventDefaultClose` | Keeps the panel open when the user clicks the close button. Defaults to `false`. |
| `onBack` | Runs when the user clicks the back button. Without it, the header has no back button. |
| `titleVariant`, `titleSemanticColor` | The type style and color of the title. Default to `balladBold` and `textBase`. |
