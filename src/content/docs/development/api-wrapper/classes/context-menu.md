---
title: ContextMenu
description: Add items to the menu that opens when the user right-clicks a track, album, artist or playlist.
---

`Spicetify.ContextMenu` adds items to Spotify's right-click menu. In a module, use `client.contextMenu` and deregister your items when the module unloads.

## `Item`

`Item` is one entry in the menu.

```ts
class Item {
  constructor(
    name: string,
    onClick: OnClickCallback,
    shouldAdd?: ShouldAddCallback,
    icon?: SVGIcon | string,
    trailingIcon?: SVGIcon | string,
    disabled?: boolean,
  );
  static readonly iconList: SVGIcon[];
  name: string;
  icon: SVGIcon | string;
  trailingIcon: SVGIcon | string;
  disabled: boolean;
  register(): void;
  deregister(): void;
}
```

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The label. |
| `onClick` | [`OnClickCallback`](/docs/development/api-wrapper/types/context-menu/onclick-callback) | Runs when the user clicks the item. |
| `shouldAdd` | [`ShouldAddCallback`](/docs/development/api-wrapper/types/context-menu/should-add-callback) | Decides whether the item appears for the selection. By default, it always appears. |
| `icon` | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) &#124; `string` | The icon before the label. |
| `trailingIcon` | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) &#124; `string` | The icon after the label. |
| `disabled` | `boolean` | Shows the item as disabled. Defaults to `false`. |

An icon is an [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) name or SVG markup. `register` adds the item to the menu and `deregister` removes it. Setting `name`, `icon`, `trailingIcon` or `disabled` updates an open menu. `Item.iconList` lists the icon names.

```ts
const queueItem = new Spicetify.ContextMenu.Item(
  'Add to queue',
  ([uri]) => Spicetify.Platform.PlayerAPI.addToQueue([{ uri }]),
  ([uri]) => Spicetify.URI.isTrack(uri),
  'queue',
);

queueItem.register();
queueItem.name = 'Queue track';
queueItem.deregister();
```

## `SubMenu`

`SubMenu` groups `Item`s under one entry. Do not register the items you pass to it.

```ts
class SubMenu {
  constructor(
    name: string,
    subItems: Item[],
    shouldAdd?: ShouldAddCallback,
    disabled?: boolean,
    icon?: SVGIcon | string,
  );
  static readonly iconList: SVGIcon[];
  name: string;
  disabled: boolean;
  addItem(item: Item): void;
  removeItem(item: Item): void;
  register(): void;
  deregister(): void;
}
```

:::caution
In the current v3 wrapper, `addItem` and `removeItem` call `Set` methods on `subItems`, while rendering calls array methods on it. Pass an array and build a new `SubMenu` to change its items.
:::

```ts
const shareMenu = new Spicetify.ContextMenu.SubMenu(
  'Share to',
  [
    new Spicetify.ContextMenu.Item('Copy URI', ([uri]) => Spicetify.Platform.ClipboardAPI.copy(uri)),
    new Spicetify.ContextMenu.Item('Copy link', ([uri]) => Spicetify.Platform.ClipboardAPI.copy(Spicetify.URI.from(uri)?.toURL() ?? uri)),
  ],
  ([uri]) => Spicetify.URI.isTrack(uri),
);

shareMenu.register();
```

## `Spicetify.ContextMenuV2`

`Spicetify.ContextMenuV2` is the layer `ContextMenu` and `Menu` are built on. Its `Item` and `ItemSubMenu` classes take one options object, and the functions register any React element as a context-menu entry.

```ts
namespace ContextMenuV2 {
  class Item {
    constructor(options: {
      children: React.ReactNode;
      disabled?: boolean;
      leadingIcon?: Icon | string;
      trailingIcon?: Icon | string;
      divider?: "before" | "after" | "both";
      onClick: (context: Context, self: Item, event: React.MouseEvent) => void;
      shouldAdd?: ShouldAddCallback;
    });
  }
  class ItemSubMenu {
    constructor(options: {
      text: string;
      disabled?: boolean;
      leadingIcon?: Icon | string;
      divider?: "before" | "after" | "both";
      items: SubMenuItems; // an array or a Set
      shouldAdd?: ShouldAddCallback;
    });
    addItem(item: Item | ItemSubMenu): void;
    removeItem(item: Item | ItemSubMenu): void;
  }
  function registerItem(item: React.ReactElement, shouldAdd?: ShouldAddCallback): void;
  function unregisterItem(item: React.ReactElement): void;
}
```

Both classes have `register()` and `deregister()`, and setters for each option. Use `ContextMenuV2` when you need an option the `ContextMenu` constructors don't take, such as `divider`.
