---
title: PanelContentProps
description: Type definition for props of ReactComponent.PanelContent.
---

The `PanelContentProps` object is used to render a panel content wrapper.

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

```ts
type PanelContentProps = {
    className?: string;
    children?: React.ReactNode;
};
```

#### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| className | `string` &#124; `undefined` | Additional class name to apply to the panel. |
| children | `React.ReactNode` &#124; `undefined` | Children to render inside the panel. |