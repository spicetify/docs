---
title: ContextMenu
description: Create custom menu item and prepend to right click context menu.
---

## Classes

### Item

Single context menu item.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| name | `string` | Name of the menu item. |
| onClick | `OnClickCallback` | Callback function when menu item is clicked. |
| shouldAdd | `ShouldAddCallback` | Callback function to determine if menu item should be added. |
| icon | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) | Icon of the menu item. |
| disabled | `boolean` | Whether the menu item is disabled. |

```ts
new Spicetify.ContextMenu.Item(
  name: string,
  onClick: OnClickCallback,
  shouldAdd?: ShouldAddCallback,
  icon?: SVGIcon,
  disabled?: boolean,
)
```

#### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| iconList | [`readonly SVGIcon[]`](/docs/development/api-wrapper/types/svgicon) | List of icons. |
| name | `string` | Name of the menu item. |
| icon | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) | Icon of the menu item. |
| disabled | `boolean` | Whether the menu item is disabled. |
| shouldAdd | `ShouldAddCallback` | Callback function to determine if menu item should be added. |
| onClick | `OnClickCallback` | Callback function when menu item is clicked. |

#### Methods

| Name | Callback | Description |
| :--- | :--- | :--- |
| register | `() => void` | Register the menu item to context menu. |
| deregister | `() => void` | Remove the menu item from context menu. |

### SubMenu

Create a sub menu to contain `Item`s.

`Item`s in `subItems` array shouldn't be registered.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| name | `string` | Name of the menu item. |
| subItems | [`Iterable<Item>`](/docs/development/api-wrapper/classes/contextmenu/#item) | Array of `Item`s to be added to the sub menu. |
| shouldAdd | `ShouldAddCallback` | Callback function to determine if menu item should be added. |
| disabled | `boolean` | Whether the menu item is disabled. |

```ts
new Spicetify.ContextMenu.SubMenu(
  name: string,
  subItems: Iterable<Item>,
  shouldAdd?: ShouldAddCallback,
  disabled?: boolean,
)
```

#### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| name | `string` | Name of the menu item. |
| disabled | `boolean` | Whether the menu item is disabled. |
| shouldAdd | `ShouldAddCallback` | Callback function to determine if menu item should be added. |

#### Methods

| Name | Callback | Description |
| :--- | :--- | :--- |
| addItem | `(item: Item) => void` | Add an `Item` to the sub menu. |
| removeItem | `(item: Item) => void` | Remove an `Item` from the sub menu. |
| register | `() => void` | Register the menu item to context menu. |
| deregister | `() => void` | Remove the menu item from context menu. |