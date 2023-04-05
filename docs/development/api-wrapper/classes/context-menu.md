---
title: ContextMenu
description: Create custom menu item and prepend to right click context menu.
---

Create custom menu item and prepend to right click context menu.

Useful for adding custom actions to context menu (when a user right-clicks on a track, album, artist, etc.)

## Classes

### Item

Single context menu item.


```ts
new Spicetify.ContextMenu.Item(
  name: string,
  onClick: OnClickCallback,
  shouldAdd?: ShouldAddCallback,
  icon?: SVGIcon,
  disabled?: boolean,
)
```

#### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| name | `string` | Name of the menu item. |
| onClick | `OnClickCallback` | Callback function when menu item is clicked. |
| shouldAdd | `ShouldAddCallback` | Callback function to determine if menu item should be added. |
| icon | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) | Icon at the end of the menu item. |
| disabled | `boolean` | Whether the menu item is disabled. |

#### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| iconList | [`readonly SVGIcon[]`](/docs/development/api-wrapper/types/svgicon) | List of icons. |
| name | `string` | Name of the menu item. |
| icon | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) | Icon at the end of the menu item. |
| disabled | `boolean` | Whether the menu item is disabled. |
| shouldAdd | `ShouldAddCallback` | Callback function to determine if menu item should be added. |
| onClick | `OnClickCallback` | Callback function when menu item is clicked. |

#### Methods

##### register

Register the menu item to context menu.

```ts
register(): void
```

##### deregister

Remove the menu item from context menu.

```ts
deregister(): void
```

### SubMenu

Create a sub menu to contain `Item`s.

`Item`s in `subItems` array shouldn't be registered.


```ts
new Spicetify.ContextMenu.SubMenu(
  name: string,
  subItems: Iterable<Item>,
  shouldAdd?: ShouldAddCallback,
  disabled?: boolean,
)
```

#### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| name | `string` | Name of the menu item. |
| subItems | [`Iterable<Item>`](/docs/development/api-wrapper/classes/context-menu/#item) | Array of `Item`s to be added to the sub menu. |
| shouldAdd | `ShouldAddCallback` | Callback function to determine if menu item should be added. |
| disabled | `boolean` | Whether the menu item is disabled. |

#### Properties

| Name | Type | Description |
| :--- | :--- | :--- |
| name | `string` | Name of the menu item. |
| disabled | `boolean` | Whether the menu item is disabled. |
| shouldAdd | `ShouldAddCallback` | Callback function to determine if menu item should be added. |

#### Methods

##### addItem

Add an `Item` to the sub menu.

```ts
addItem(item: Item): void
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| item | [`Item`](/docs/development/api-wrapper/classes/context-menu/#item) | `Item` to be added to the sub menu. |

##### removeItem

Remove an `Item` from the sub menu.

```ts
removeItem(item: Item): void
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| item | [`Item`](/docs/development/api-wrapper/classes/context-menu/#item) | `Item` to be removed from the sub menu. |

##### register

Register the sub menu to context menu.

```ts
register(): void
```

##### deregister

Remove the sub menu from context menu.

```ts
deregister(): void
```
