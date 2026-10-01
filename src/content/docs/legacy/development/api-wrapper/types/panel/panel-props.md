---
title: PanelProps
description: The props of the v2 Spicetify.Panel.registerPanel.
---

:::warning
Not available in Spicetify v3, which has no `Spicetify.Panel` and no panel components. In a v3 module, use stdlib's `registerPanel`, described on the [Panel](/docs/legacy/development/api-wrapper/methods/panel) page.
:::

`PanelProps` were the argument of the v2 `Spicetify.Panel.registerPanel`.

```ts
type PanelProps = {
    label?: string;
    children: React.ReactNode;
    isCustom?: boolean;
    style?: React.CSSProperties;
    wrapperClassname?: string;
    headerClassname?: string;
    headerVariant?: Variant;
    headerSemanticColor?: SemanticColor;
    headerLink?: string;
    headerActions?: React.ReactNode;
    headerOnClose?: () => void;
    headerPreventDefaultClose?: boolean;
    headerOnBack?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
```

| Prop | Description |
| --- | --- |
| `label` | The panel's accessible label. |
| `children` | The panel body. |
| `isCustom` | Renders `children` as the whole panel and ignores every other prop. |
| `style` | Inline styles for the panel frame. |
| `wrapperClassname`, `headerClassname` | Extra class names for the body wrapper and the header. |
| `headerVariant`, `headerSemanticColor` | The type style and color of the header title. |
| `headerLink` | A URI, client path or URL that the header title links to. |
| `headerActions` | Controls shown next to the close button. |
| `headerOnClose` | Runs before the panel closes from the header's close button. |
| `headerPreventDefaultClose` | Keeps the panel open when the user clicks the close button. |
| `headerOnBack` | Runs when the user clicks the back button. Without it, the header has no back button. |
