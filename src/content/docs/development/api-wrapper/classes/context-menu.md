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
  icon?: SVGIcon | string,
  disabled?: boolean,
)
```

#### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| name | `string` | Name of the menu item. |
| onClick | `OnClickCallback` | Callback function when the menu item is clicked. |
| shouldAdd | `ShouldAddCallback` | Callback function to determine if the menu item should be added. |
| icon | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) &#124; `string` | Icon of the menu item. |
| disabled | `boolean` | Whether the menu item is disabled. |

#### Properties

:::tip

All of the listed properties are dynamic and can be changed at any time. Look into the example below for more information.

:::

| Name | Type | Description |
| :--- | :--- | :--- |
| iconList | [`readonly SVGIcon[]`](/docs/development/api-wrapper/types/svgicon) | List of icons. |
| name | `string` | Name of the menu item. |
| icon | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) &#124; `string` | Icon at the end of the menu item. |
| disabled | `boolean` | Whether the menu item is disabled. |
| shouldAdd | [`ShouldAddCallback`](/docs/development/api-wrapper/types/context-menu/should-add-callback) | Callback function to determine if the menu item should be added. |
| onClick | [`OnClickCallback`](/docs/development/api-wrapper/types/context-menu/onclick-callback) | Callback function when the menu item is clicked. |

#### Methods

##### `register`

Register the menu item to context menu.

```ts
register(): void
```

##### `deregister`

Remove the menu item from context menu.

```ts
deregister(): void
```
#### Example

```ts
// This function will determine if the selected item is a track
function ifItemIsTrack(uri) {
  let uriObj = Spicetify.URI.fromString(uri[0]);
  switch (uriObj.type) {
    case Type.TRACK:
      return true;
  }
  return false;
}

// Create a new menu item that only appears when a track is selected
const menuItem = new Spicetify.ContextMenu.Item(
  "My Menu Item",
  () => {
    Spicetify.showNotification("My Menu Item clicked!");
  },
  ifItemIsTrack,
  Spicetify.SVGIcons["play"],
  false,
);

// Register the menu item
menuItem.register();

// Deregister the menu item
menuItem.deregister();

// Change the menu item's name
menuItem.name = "My New Menu Item";

// Change the menu item's icon
menuItem.icon = "pause"
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
| subItems | [`Iterable<Item>`](#item) | Array of `Item`s to be added to the sub menu. |
| shouldAdd | [`ShouldAddCallback`](/docs/development/api-wrapper/types/context-menu/should-add-callback) | Callback function to determine if the menu item should be added. |
| disabled | `boolean` | Whether the menu item is disabled. |

#### Properties

:::tip

All of the listed properties are dynamic and can be changed at any time. Look into the example below for more information.

:::

| Name | Type | Description |
| :--- | :--- | :--- |
| name | `string` | Name of the menu item. |
| disabled | `boolean` | Whether the menu item is disabled. |
| shouldAdd | [`ShouldAddCallback`](/docs/development/api-wrapper/types/context-menu/should-add-callback) | Callback function to determine if the menu item should be added. |

#### Methods

##### `addItem`

Add an `Item` to the sub menu.

```ts
addItem(item: Item): void
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| item | [`Item`](#item) | `Item` to be added to the sub menu. |

##### `removeItem`

Remove an `Item` from the sub menu.

```ts
removeItem(item: Item): void
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| item | [`Item`](#item) | `Item` to be removed from the sub menu. |

##### `register`

Register the sub menu to context menu.

```ts
register(): void
```

##### `deregister`

Remove the sub menu from context menu.

```ts
deregister(): void
```

#### Example

```ts
// Create a new menu item
const menuItem = new Spicetify.ContextMenu.Item(
  "My Menu Item",
  () => {
    Spicetify.showNotification("My Menu Item clicked!");
  },
  () => true,
  Spicetify.SVGIcons["play"],
  false,
);

// Create a new sub menu
const subMenu = new Spicetify.ContextMenu.SubMenu(
  "My Sub Menu",
  [menuItem],
  () => true,
  false,
);

// Register the sub menu
subMenu.register();

// Deregister the sub menu
subMenu.deregister();

// Change the sub menu's name
subMenu.name = "My New Sub Menu";

// Add a new menu item to the sub menu
subMenu.addItem(new Spicetify.ContextMenu.Item(
  "My New Menu Item",
  () => {
    Spicetify.showNotification("My New Menu Item clicked!");
  },
  () => true,
  Spicetify.SVGIcons["play"],
  false,
));
```
