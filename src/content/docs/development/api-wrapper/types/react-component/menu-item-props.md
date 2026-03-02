---
title: MenuItemProps
description: Type definition for props of ReactComponent.MenuItem.
---

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

The `MenuItemProps` object is used to create a menu item.

```ts
type MenuItemProps = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    divider?: 'before' | 'after' | 'both';
    icon?: React.ReactNode;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
};
```

#### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `onClick` | `React.MouseEventHandler<HTMLButtonElement>` &#124; `undefined` | Function that runs when `MenuItem` is clicked |
| `disabled` | `boolean` &#124; `undefined` | Indicates if `MenuItem` is disabled. Disabled items will not cause the `Menu` to close when clicked. |
| `divider` | `'before' &#124; 'after' &#124; 'both'` &#124; `undefined` | Indicate that a divider line should be added `before` or `after` this `MenuItem` |
| `icon` | `React.ReactNode` &#124; `undefined` | React component icon that will be rendered at the end of the `MenuItem`. **Deprecated**: Since Spotify `1.2.8`. Use `leadingIcon` or `trailingIcon` instead |
| `leadingIcon` | `React.ReactNode` &#124; `undefined` | React component icon that will be rendered at the start of the `MenuItem`. **Since Spotify `1.2.8`** |
| `trailingIcon` | `React.ReactNode` &#124; `undefined` | React component icon that will be rendered at the start of the `MenuItem`. **Since Spotify `1.2.8`** |
