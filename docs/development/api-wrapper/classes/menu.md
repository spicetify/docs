---
title: Menu
description: Create and prepend custom menu item in profile menu.
---

Create and prepend custom menu item in profile menu.

## Classes

### Item

Single menu item.

```ts
new Spicetify.Menu.Item(
  name: string,
  isEnabled: boolean,
  onClick: (self: Item) => void,
  icon?: SVGIcon | string,
)
```

#### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| name | `string` | Name of the menu item. |
| isEnabled | `boolean` | Whether the menu item is enabled. |
| onClick | `(self: Item) => void` | Callback function when menu item is clicked. |
| icon | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) | Icon of the menu item. |

#### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| name | `string` | Name of the menu item. |
| isEnabled | `boolean` | Whether the menu item is enabled. |
| setName | `(name: string) => void` | Set name of the menu item. |
| setState | `(isEnabled: boolean) => void` | Set state of the menu item. Item would has a tick next to it if its state is enabled.|
| setIcon | `(icon: SVGIcon) => void` | Set icon of the menu item. |

#### Methods

##### setName

Set the label of the menu item.

```ts
setName(name: string): void
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| name | `string` | Name of the menu item. |

##### setState

Set the state of the menu item. Item would has a tick next to it if its state is enabled.

```ts
setState(isEnabled: boolean): void
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| isEnabled | `boolean` | Whether the menu item is enabled. |

##### setIcon

Set the icon at the end of the menu item.

```ts
setIcon(icon: SVGIcon): void
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| icon | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) | Icon of the menu item. |

##### register

Register the menu item to profile menu.

```ts
register(): void
```

##### deregister

Remove the menu item from profile menu.

```ts
deregister(): void
```

### SubMenu

Create a sub menu to contain `Item` toggles.

`Item`s in `subItems` array shouldn't be registered.

```ts
new Spicetify.Menu.SubMenu(
  name: string,
  subItems: Item[],
)
```

#### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| name | `string` | Name of the menu item. |
| subItems | [`Item[]`](/docs/development/api-wrapper/classes/menu#item) | Array of sub menu items. |

#### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| name | `string` | Name of the menu item. |
| setName | `(name: string) => void` | Set name of the menu item. |
| addItem | `(item: Item) => void` | Add a sub menu item. |
| removeItem | `(item: Item) => void` | Remove a sub menu item. |
| register | `() => void` | Register the menu item to menu. |
| deregister | `() => void` | Remove the menu item from menu. |