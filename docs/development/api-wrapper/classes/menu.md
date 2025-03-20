---
title: Menu
description: Create and prepend custom menu items in the profile menu.
---

Create and prepend custom menu items in the profile menu.

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
| onClick | `(self: Item) => void` | Callback function when the menu item is clicked. |
| icon | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) &#124; `string` | Icon of the menu item. |

#### Properties

:::tip

All of the listed properties are dynamic and can be changed at any time. Look into the example below for more information.

:::

| Name | Type | Description |
| :--- | :--- | :--- |
| name | `string` | Name of the menu item. |
| isEnabled | `boolean` | Whether the menu item is enabled. |
| icon | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) &#124; `string` | Icon of the menu item. |

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

Set the state of the menu item. The item will have a tick icon next to it if its state is enabled.

```ts
setState(isEnabled: boolean): void
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| isEnabled | `boolean` | Whether the menu item is enabled. |

##### setIcon

Set the icon at the end of the menu item.

```ts
setIcon(icon: SVGIcon | string): void
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| icon | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) &#124; `string` | Icon of the menu item. |

##### register

Register the menu item to the profile menu.

```ts
register(): void
```

##### deregister

Remove the menu item from the profile menu.

```ts
deregister(): void
```

#### Example

```ts
const item = new Spicetify.Menu.Item("My Item", true, () => {
  console.log("My Item is clicked");
});

item.register();

// item.name = "My Item (Updated)";
item.setName("My Item (Updated)");

// item.isEnabled = false;
item.setState(false);

// item.icon = "heart";
item.setIcon("heart");
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

:::tip

All of the listed properties are dynamic and can be changed at any time. Look into the example below for more information.

:::

| Name | Type | Description |
| :--- | :--- | :--- |
| name | `string` | Name of the menu item. |

#### Methods

##### setName

Set the label of the menu item.

```ts
setName(name: string): void
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| name | `string` | Name of the menu item. |

##### addItem

Add a sub menu item.

```ts
addItem(item: Item): void
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| item | [`Item`](/docs/development/api-wrapper/classes/menu#item) | Sub menu item. |

##### removeItem

Remove a sub menu item.

```ts
removeItem(item: Item): void
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| item | [`Item`](/docs/development/api-wrapper/classes/menu#item) | Sub menu item. |

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

#### Example

```ts
const item1 = new Spicetify.Menu.Item("My Item 1", true, () => {
  console.log("My Item 1 is clicked");
});

const item2 = new Spicetify.Menu.Item("My Item 2", true, () => {
  console.log("My Item 2 is clicked");
});

const subMenu = new Spicetify.Menu.SubMenu("My Sub Menu", [item1, item2]);

subMenu.register();

// subMenu.name = "My Sub Menu (Updated)";
subMenu.setName("My Sub Menu (Updated)");

// subMenu.addItem(item3);
subMenu.addItem(
  new Spicetify.Menu.Item("My Item 3", true, () => {
    console.log("My Item 3 is clicked");
  })
);
```
