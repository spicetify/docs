---
title: ReactComponent
description: React components from the Spotify client.
---

`Spicetify.ReactComponent` holds React components that the wrapper finds in Spotify's bundle. Render them with the client's React, `Spicetify.React`. In a module, we recommend stdlib's primitives from `/modules/stdlib/lib/primitives.js`, which stdlib keeps working across Spotify versions.

The wrapper finds each component by matching Spotify's code, so any component can be `undefined` on a given client. `Slider`, `Toggle`, `Dropdown` and the `Artist`, `Audiobook`, `Profile`, `Show` and `Track` cards load later than the rest. Check a component before you render it.

```ts
namespace ReactComponent {
  const ContextMenu: any;
  const RightClickMenu: any;
  const Menu: any;
  const MenuItem: any;
  const MenuSubMenuItem: any;
  const AlbumMenu: any;
  const PodcastShowMenu: any;
  const ArtistMenu: any;
  const PlaylistMenu: any;
  const TrackMenu: any;
  const TooltipWrapper: any;
  const IconComponent: any;
  const TextComponent: any;
  const ConfirmDialog: any;
  const Slider: any;
  const Toggle: any;
  const Dropdown: any;
  const ButtonPrimary: any;
  const ButtonSecondary: any;
  const ButtonTertiary: any;
  const Chip: any;
  const Cards: Record<'Default' | 'FeatureCard' | 'Hero' | 'CardImage' | 'Album' | 'Artist' | 'Audiobook' | 'Episode' | 'Playlist' | 'Profile' | 'Show' | 'Track', any>;
  const Navigation: any;
  const ScrollableContainer: any;
  const Router: any;
  const Routes: any;
  const Route: any;
  const StoreProvider: any;
  const RemoteConfigProvider: any;
  const Snackbar: { wrapper: any; simpleLayout: any; ctaText: any; styledImage: any };
}
```

v3 has no `PanelSkeleton`, `PanelContent` or `PanelHeader`. See [Panel](/docs/development/api-wrapper/methods/panel).

## Menus

`ContextMenu` opens a menu from its child element. `RightClickMenu` is `ContextMenu` with `trigger` set to `right-click` and `action` set to `toggle`. Both take [`ContextMenuProps`](/docs/development/api-wrapper/types/react-component/context-menu-props).

`Menu` takes [`MenuProps`](/docs/development/api-wrapper/types/react-component/menu-props) and holds `MenuItem` children, which take [`MenuItemProps`](/docs/development/api-wrapper/types/react-component/menu-item-props). `MenuSubMenuItem` is an item that opens a nested menu.

`AlbumMenu`, `PodcastShowMenu`, `ArtistMenu`, `PlaylistMenu` and `TrackMenu` are Spotify's own menus for each item type. They take `MenuProps` with a `uri` and an optional `onRemoveCallback(uri)`.

```tsx
const { ContextMenu, Menu, MenuItem } = Spicetify.ReactComponent;

function SortMenu() {
  return (
    <Menu>
      <MenuItem onClick={() => Spicetify.showNotification('Sorted by title')}>Title</MenuItem>
      <MenuItem onClick={() => Spicetify.showNotification('Sorted by date')}>Date added</MenuItem>
    </Menu>
  );
}

function SortButton() {
  return (
    <ContextMenu trigger="click" menu={<SortMenu />}>
      <button>Sort</button>
    </ContextMenu>
  );
}
```

## `TooltipWrapper`

`TooltipWrapper` shows a tooltip when the user hovers over its child. It takes [`TooltipProps`](/docs/development/api-wrapper/types/react-component/tooltip-props).

```tsx
<Spicetify.ReactComponent.TooltipWrapper label="Shuffle" placement="top">
  <button>Shuffle</button>
</Spicetify.ReactComponent.TooltipWrapper>
```

## `IconComponent` and `TextComponent`

`IconComponent` renders an icon in Spotify's style and takes [`IconComponentProps`](/docs/development/api-wrapper/types/react-component/icon-component-props). `TextComponent` renders text in one of Spotify's type styles and takes [`TextComponentProps`](/docs/development/api-wrapper/types/react-component/text-component-props). Both accept more props than these types list.

```tsx
<Spicetify.ReactComponent.IconComponent
  iconSize={16}
  semanticColor="textBase"
  dangerouslySetInnerHTML={{ __html: Spicetify.SVGIcons.play }}
/>

<Spicetify.ReactComponent.TextComponent variant="viola" semanticColor="textSubdued">
  12 songs
</Spicetify.ReactComponent.TextComponent>
```

## `ConfirmDialog`

`ConfirmDialog` shows Spotify's confirmation dialog and takes [`ConfirmDialogProps`](/docs/development/api-wrapper/types/react-component/confirm-dialog-props). The dialog does not close by itself, so close it in each handler.

```tsx
function DeleteButton() {
  const [isOpen, setIsOpen] = Spicetify.React.useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Delete</button>
      <Spicetify.ReactComponent.ConfirmDialog
        isOpen={isOpen}
        titleText="Delete this preset?"
        descriptionText="You cannot undo this."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
        onOutside={() => setIsOpen(false)}
      />
    </>
  );
}
```

## `Toggle` and `Slider`

`Toggle` is the switch from Spotify's settings page and takes [`ToggleProps`](/docs/development/api-wrapper/types/react-component/toggle-props). `Slider` is the bar used for volume and playback position and takes [`SliderProps`](/docs/development/api-wrapper/types/react-component/slider-props).

```tsx
function Settings() {
  const [enabled, setEnabled] = Spicetify.React.useState(false);
  const [volume, setVolume] = Spicetify.React.useState(50);

  return (
    <>
      <Spicetify.ReactComponent.Toggle id="crossfade" value={enabled} onSelected={setEnabled} />
      <Spicetify.ReactComponent.Slider
        min={0}
        max={100}
        step={1}
        value={volume}
        onDragStart={() => {}}
        onDragMove={setVolume}
        onDragEnd={setVolume}
      />
    </>
  );
}
```

## Other components

`ButtonPrimary`, `ButtonSecondary`, `ButtonTertiary`, `Chip` and `Dropdown` are Spotify's Encore controls. `Cards` holds Spotify's card components for each item type. `Navigation`, `ScrollableContainer`, `Router`, `Routes`, `Route`, `StoreProvider` and `RemoteConfigProvider` are parts of Spotify's app shell. These have no documented props. Inspect them in [React DevTools](/docs/development/react-devtools).
