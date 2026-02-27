---
title: PanelSkeletonProps
description: Type definition for props of ReactComponent.PanelSkeleton.
---

The `PanelSkeletonProps` object is used to render a panel skeleton.

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

```ts
type PanelSkeletonProps = {
    label?: string;
    itemUri?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
};
```

#### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| label | `string` &#124; `undefined` | Aria label for the panel. Does not set the panel header content. |
| itemUri | `string` &#124; `undefined` | Item URI of the panel. Used as reference for Spotify's internal Event Factory. |
| className | `string` &#124; `undefined` | Additional class name to apply to the panel. **Deprecated**: Since Spotify `1.2.12` |
| style | `React.CSSProperties` &#124; `undefined` | Additional styles to apply to the panel. |
| children | `React.ReactNode` &#124; `undefined` | Children to render inside the panel. |