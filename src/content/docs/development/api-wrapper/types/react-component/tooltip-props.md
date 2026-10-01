---
title: TooltipProps
description: The props of ReactComponent.TooltipWrapper.
---

`TooltipProps` are the props of [`ReactComponent.TooltipWrapper`](/docs/development/api-wrapper/properties/react-components#tooltipwrapper).

```ts
type TooltipProps = {
  label: string | React.ReactNode;
  children: React.ReactNode;
  renderInline?: boolean;
  showDelay?: number;
  disabled?: boolean;
  placement?: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
  labelClassName?: string;
};
```

| Prop | Description |
| --- | --- |
| `label` | The tooltip content. |
| `children` | The element the tooltip belongs to. |
| `renderInline` | Renders the tooltip next to `children` instead of in Spotify's shared tooltip in `<body>`. |
| `showDelay` | The hover time in milliseconds before the tooltip shows. |
| `disabled` | Hides the tooltip. |
| `placement` | The preferred side of `children`. |
| `labelClassName` | A class name for the tooltip. |
