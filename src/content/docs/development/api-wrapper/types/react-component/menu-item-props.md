---
title: MenuItemProps
description: The props of ReactComponent.MenuItem.
---

`MenuItemProps` are the props of [`ReactComponent.MenuItem`](/docs/development/api-wrapper/properties/react-components#menus). The item's label is its `children`.

```ts
type MenuItemProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  divider?: 'before' | 'after' | 'both';
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  icon?: React.ReactNode;
};
```

| Prop | Description |
| --- | --- |
| `onClick` | Runs when the user clicks the item. |
| `disabled` | Disables the item. Clicking a disabled item leaves the menu open. |
| `divider` | Draws a divider line before the item, after it, or on both sides. |
| `leadingIcon`, `trailingIcon` | The icons before and after the label. |
| `icon` | The icon after the label. Spotify 1.2.8 deprecated it in favor of `leadingIcon` and `trailingIcon`. |
