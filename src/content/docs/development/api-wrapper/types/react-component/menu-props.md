---
title: MenuProps
description: The props of ReactComponent.Menu.
---

`MenuProps` are the props of [`ReactComponent.Menu`](/docs/development/api-wrapper/properties/react-components#menus). Its `children` are `MenuItem` elements.

```ts
type MenuProps = {
  onClose?: () => void;
  getInitialFocusElement?: (element: HTMLElement | null) => HTMLElement | undefined | null;
};
```

| Prop | Description |
| --- | --- |
| `onClose` | Runs when the menu closes. |
| `getInitialFocusElement` | Returns the element that receives focus when the menu opens. |
