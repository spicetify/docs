---
title: ContextMenuProps
description: Type definition for props of ReactComponent.ContextMenu
---

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

The `ContextMenuProps` object is used to create a context menu.

```ts
type ContextMenuProps = {
    renderInline?: boolean;
    trigger?: 'click' | 'right-click';
    action?: 'toggle' | 'open';
    placement?: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
    offset?: [number, number];
    preventScrollingWhileOpen?: boolean;
    menu: typeof Spicetify.ReactComponent.Menu;
    children: Element | ((isOpen?: boolean, handleContextMenu?: (e: MouseEvent) => void, ref?: (e: Element) => void) => Element);
};
```

#### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `renderInline` | `boolean` | Decide whether to use the global singleton context menu (rendered in `<body>`) or a new inline context menu (rendered in a sibling element to `children`) |
| `trigger` | `'click'` &#124; `'right-click'` | Determines what will trigger the context menu. For example, a click, or a right-click |
| `action` | `'toggle'` &#124; `'open'` | Determines if the context menu should open or toggle when triggered |
| `placement` | `'top'` &#124; `'top-start'` &#124; `'top-end'` &#124; `'right'` &#124; `'right-start'` &#124; `'right-end'` &#124; `'bottom'` &#124; `'bottom-start'` &#124; `'bottom-end'` &#124; `'left'` &#124; `'left-start'` &#124; `'left-end'` | The preferred placement of the context menu when it opens. Relative to trigger element. |
| `offset` | `[number, number]` | The x and y offset distances at which the context menu should open. Relative to trigger element and `position`. |
| `preventScrollingWhileOpen` | `boolean` | Will stop the client from scrolling while the context menu is open |
| `menu` | `typeof Spicetify.ReactComponent.Menu` | The menu UI to render inside of the context menu. |
