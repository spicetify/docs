---
title: MenuProps
description: Type definition for props of ReactComponent.Menu.
---

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

The `MenuProps` object is used to create a menu.

```ts
type MenuProps = {
    onClose?: () => void;
    getInitialFocusElement?: (el: HTMLElement | null) => HTMLElement | undefined | null;
};
```

#### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| onClose | `() => void` &#124; `undefined` | Function that is called when the menu is closed |
| getInitialFocusElement | `(el: HTMLElement &#124; null) => HTMLElement &#124; undefined &#124; null` &#124; `undefined` | Function that provides the element that focus should jump to when the menu is opened |
