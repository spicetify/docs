---
title: PanelContentProps
description: The props of the v2 ReactComponent.PanelContent.
---

:::warning
Not available in Spicetify v3, which has no `Spicetify.Panel` and no panel components. In a v3 module, use stdlib's `registerPanel`, described on the [Panel](/docs/legacy/development/api-wrapper/methods/panel) page.
:::

`PanelContentProps` were the props of the v2 `PanelContent`, which wrapped the body of a panel.

```ts
type PanelContentProps = {
    className?: string;
    children?: React.ReactNode;
};
```

| Prop | Description |
| --- | --- |
| `className` | Extra class names. |
| `children` | The panel body. |
