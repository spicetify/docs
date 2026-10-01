---
title: ContextMenuProps
description: The props of ReactComponent.ContextMenu and RightClickMenu.
---

`ContextMenuProps` are the props of [`ReactComponent.ContextMenu`](/docs/development/api-wrapper/properties/react-components#menus) and `RightClickMenu`.

```ts
type ContextMenuProps = {
  menu: React.ReactElement;
  children: React.ReactElement | ((isOpen?: boolean, handleContextMenu?: (event: MouseEvent) => void, ref?: (element: Element) => void) => React.ReactElement);
  trigger?: 'click' | 'right-click';
  action?: 'toggle' | 'open';
  placement?: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
  offset?: [number, number];
  renderInline?: boolean;
  preventScrollingWhileOpen?: boolean;
};
```

| Prop | Description |
| --- | --- |
| `menu` | The menu to show, usually a `Menu` or one of Spotify's item menus. |
| `children` | The element that opens the menu, or a function that renders it. |
| `trigger` | Opens the menu on `click` or `right-click`. |
| `action` | Opens the menu each time, or toggles it. |
| `placement` | The preferred side of the trigger element. |
| `offset` | The horizontal and vertical offset from the trigger element, in pixels. |
| `renderInline` | Renders the menu next to `children` instead of in Spotify's shared menu in `<body>`. |
| `preventScrollingWhileOpen` | Stops the page from scrolling while the menu is open. |
