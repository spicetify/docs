---
title: TooltipProps
description: Type definition for props of ReactComponent.TooltipWrapper.
---

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

The `TooltipProps` object is used to create a tooltip.

```ts
type TooltipProps = {
    label: string;
    children: React.ReactNode;
    renderInline?: boolean;
    showDelay?: number;
    disabled?: boolean;
    placement?: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
    labelClassName?: string;
};
```

#### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `label` | `string` | Label to display in the tooltip |
| `children` | `React.ReactNode` | The child element that the tooltip will be attached to and will display when hovered over |
| `renderInline` | `boolean` | Decide whether to use the global singleton tooltip (rendered in `<body>`) or a new inline tooltip (rendered in a sibling element to `children`) |
| `showDelay` | `number` | Delay in milliseconds before the tooltip is displayed after the user hovers over the child element |
| `disabled` | `boolean` | Determine whether the tooltip should be displayed |
| `placement` | `'top'` &#124; `'top-start'` &#124; `'top-end'` &#124; `'right'` &#124; `'right-start'` &#124; `'right-end'` &#124; `'bottom'` &#124; `'bottom-start'` &#124; `'bottom-end'` &#124; `'left'` &#124; `'left-start'` &#124; `'left-end'` | The preferred placement of the context menu when it opens. Relative to trigger element. |
| `labelClassName` | `string` | Class name to apply to the tooltip |
