---
title: Menu
description: Add items to the profile menu.
---

`Spicetify.Menu` adds items to the menu that opens from the user's profile button. In a v3 module, we recommend stdlib's `settingsRow` or `settingsSection` for settings, and the `menu` register for other actions.

## `Item`

`Item` is a profile menu entry with an on or off state. A check mark shows when the state is on.

```ts
class Item {
  constructor(name: string, isEnabled: boolean, onClick: (self: Item) => void, icon?: SVGIcon | string);
  isEnabled: boolean;
  children: string;
  leadingIcon: SVGIcon | string;
  disabled: boolean;
  setState(isEnabled: boolean): void;
  register(): void;
  deregister(): void;
}
```

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The label. |
| `isEnabled` | `boolean` | The initial state. |
| `onClick` | `(self: Item) => void` | Runs when the user clicks the item. |
| `icon` | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) &#124; `string` | The icon before the label. |

`setState` and the `isEnabled` setter change the state. In v3, the label is `children` and the icon is `leadingIcon`. The v2 `name`, `icon`, `setName` and `setIcon` members do not exist on `Menu.Item`.

```ts
const compactMode = new Spicetify.Menu.Item('Compact mode', false, (self) => {
  self.setState(!self.isEnabled);
});

compactMode.register();
compactMode.children = 'Compact layout';
```

## `SubMenu`

`SubMenu` groups `Item`s under one profile menu entry. Do not register the items you pass to it.

```ts
class SubMenu {
  constructor(name: string, subItems: Item[], icon?: SVGIcon | string);
  name: string;
  icon: SVGIcon | string;
  addItem(item: Item): void;
  removeItem(item: Item): void;
  register(): void;
  deregister(): void;
}
```

Setting `name` or `icon` updates the entry. The v2 `setName` method does not exist in v3.

:::caution
In the current v3 wrapper, `addItem` and `removeItem` call `Set` methods on `subItems`, while rendering calls array methods on it. Pass an array and build a new `SubMenu` to change its items.
:::

```ts
const layoutMenu = new Spicetify.Menu.SubMenu('Layout', [
  new Spicetify.Menu.Item('Compact', false, (self) => self.setState(!self.isEnabled)),
  new Spicetify.Menu.Item('Show artwork', true, (self) => self.setState(!self.isEnabled)),
]);

layoutMenu.register();
```
