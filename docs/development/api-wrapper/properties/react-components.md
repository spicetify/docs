---
title: ReactComponent
description: Set of stock React components used by Spotify.
---

Spicetify provides a set of stock React components used by Spotify. You can use these components to create your own custom UI.

:::note

It is recommended that you be familiar with [`React`](https://react.dev/) and [`spicetify-creator`](/docs/development/spicetify-creator/the-basics) before using these components.

:::

```ts
namespace ReactComponent {
    const ContextMenu: any;
    const RightClickMenu: any;
    const Menu: any;
    const MenuItem: any;
    const AlbumMenu: any;
    const PodcastShowMenu: any;
    const ArtistMenu: any;
    const PlaylistMenu: any;
    const TooltipWrapper: any;
    const IconComponent: any;
    const TextComponent: any;
    const ConfirmDialog: any;
    const PanelSkeleton: any;
    const PanelContent: any;
    const PanelHeader: any;
    const Toggle: any;
    const Slider: any
};
```

## Components

:::info

These components may be wrappers for other components such as [`Tippy`](https://atomiks.github.io/tippyjs/) or [`styled-components`](https://styled-components.com/). They may accept additional props that are not listed here.

As such, type definitions are not forced for these components but they act as a guideline for what you can use and what Spotify uses.

Refer to the underlying library's documentation for more information.

:::

### `ContextMenu`

Generic context menu provider. It is used by Spotify on a variety of elements, such as right-click menu, dropdown menu, etc.

#### Props

See [`ContextMenuProps`](/docs/development/api-wrapper/types/react-component/context-menu-props).

#### Example

```tsx
// See Menu section for more details
const menuWrapper = React.memo((props: MenuProps) =>
    <Spicetify.ReactComponent.Menu {...props}>
        <Spicetify.ReactComponent.MenuItem
            label="Hello World"
            onClick={() => Spicetify.showNotification('Hello World')}
        />
    </Spicetify.ReactComponent.Menu>
});

const contextMenu = React.memo((props: ContextMenuProps) => {
    return (
        <Spicetify.ReactComponent.ContextMenu {...props}
            trigger="click"
            menu={<menuWrapper {...props} />}
        >
            <div>Click me</div>
        </Spicetify.ReactComponent.ContextMenu>
    );
});
```

### `RightClickMenu`

Wrapper of [`ContextMenu`](#contextmenu) with predefined props: `action = 'toggle'` and `trigger = 'right-click'`.

#### Props

See [`ContextMenuProps`](/docs/development/api-wrapper/types/react-component/context-menu-props).

#### Example

```tsx
const menuWrapper = React.memo((props: MenuProps) =>
    <Spicetify.ReactComponent.Menu {...props}>
        <Spicetify.ReactComponent.MenuItem
            label="Hello World"
            onClick={() => Spicetify.showNotification('Hello World')}
        />
    </Spicetify.ReactComponent.Menu>
});
// Same as ContextMenu example, but appears on right-click
const contextMenu = React.memo((props: ContextMenuProps) => {
    return (
        <Spicetify.ReactComponent.RightClickMenu {...props}
            menu={<menuWrapper {...props} />}
        >
            <div>Right-click me</div>
        </Spicetify.ReactComponent.RightClickMenu>
    );
});
```

### `Menu`

Outer layer containing [`MenuItem`](#menuitem)s.

#### Props

See [`MenuProps`](/docs/development/api-wrapper/types/react-component/menu-props).

#### Example

```tsx
const menuWrapper = React.memo((props: MenuProps) =>
    <Spicetify.ReactComponent.Menu {...props} onClose={() => Spicetify.showNotification('Menu closed')}>
        <Spicetify.ReactComponent.MenuItem
            label="Hello World"
            onClick={() => Spicetify.showNotification('Hello World')}
        />
    </Spicetify.ReactComponent.Menu>
});
```

### `MenuItem`

Component to construct menu item. Used as [`Menu`](#menu) children.

#### Props

See [`MenuItemProps`](/docs/development/api-wrapper/types/react-component/menu-item-props).

#### Example

```tsx
const icon = React.memo((props: IconComponentProps) =>
    <Spicetify.ReactComponent.IconComponent {...props}
        semanticColor="textBase"
        dangerouslySetInnerHTML={{ __html: Spicetify.SVGIcons["play"] }}
        iconSize={16}
    />
);

const menuItem = React.memo((props: MenuItemProps) =>
    <Spicetify.ReactComponent.MenuItem {...props}
        onClick={() => Spicetify.showNotification('Hello World')}
        disabled={false}
        divider="after"
        {/* It is recommended that you use both `icon` and `trailingIcon` for compatibility between older versions */}
        icon={<icon />}
        trailingIcon={<icon />}
    >
        Hello World
    </Spicetify.ReactComponent.MenuItem>
);
```

### `AlbumMenu`, `PodcastShowMenu`, `ArtistMenu`, `PlaylistMenu`

Tailored [`Menu`](#menu) for specific type of object.

#### Props

Accepts `uri` and `onRemoveCallback` props along with [`MenuProps`](/docs/development/api-wrapper/types/react-component/menu-props).

```ts
interface AlbumMenuProps extends MenuProps {
    uri: string;
    onRemoveCallback?: (uri: string) => void;
};
```

#### Example

```tsx
const currentAlbumURI = Spicetify.Player.data.item.metadata.album_uri;

const albumMenu = React.memo((props: AlbumMenuProps) =>
    <Spicetify.ReactComponent.AlbumMenu {...props}
        onClose={() => Spicetify.showNotification('Menu closed')}
        uri={currentAlbumURI}
    />
);
```

### `TooltipWrapper`

Component to display tooltip when hovering over element. Useful for accessibility.

:::info

This component is a wrapper for [`Tippy`](https://atomiks.github.io/tippyjs/). It may accept additional props that are not listed here.

:::

#### Props

See [`TooltipProps`](/docs/development/api-wrapper/types/react-component/tooltip-props).

#### Example

```tsx
const elementHasTooltip = React.memo((props: TooltipProps) =>
    <Spicetify.ReactComponent.TooltipWrapper {...props}
        label="Hello World"
        placement="bottom"
    >
        <div>Hover me</div>
    </Spicetify.ReactComponent.TooltipWrapper>
);
```

### `IconComponent`

Component to render Spotify-style icon. It is used by Spotify on a variety of elements, such as buttons, icons, etc.

:::info

This component is a wrapper for [`styled-components`](https://styled-components.com/). It may accept additional props that are not listed here.

:::

#### Props

See [`IconComponentProps`](/docs/development/api-wrapper/types/react-component/icon-component-props).

#### Example

```tsx
const icon = React.memo((props: IconComponentProps) =>
    <Spicetify.ReactComponent.IconComponent {...props}
        semanticColor="textBase"
        dangerouslySetInnerHTML={{ __html: Spicetify.SVGIcons["play"] }}
        iconSize={16}
    />
);
```

### `TextComponent`

Component to render text. It is used by Spotify on a variety of elements, such as buttons, text, etc.

:::info

This component is a wrapper for [`styled-components`](https://styled-components.com/). It may accept additional props that are not listed here.

:::

#### Props

See [`TextComponentProps`](/docs/development/api-wrapper/types/react-component/text-component-props).

#### Example

```tsx
const text = React.memo((props: TextComponentProps) =>
    <Spicetify.ReactComponent.TextComponent {...props}
        semanticColor="textBase"
        variant="viola"
        weight="book"
    >
        Hello World
    </Spicetify.ReactComponent.TextComponent>
);
```

### `ConfirmDialog`

Component to display Spotify-style confirmation dialog. Used by Spotify on playlist, track removal, etc.

:::info

For each of the `onConfirm`, `onCancel`, and `onOutsideClick` props, the dialog will not close automatically. You must manually handle the state of the dialog.

:::

#### Props

See [`ConfirmDialogProps`](/docs/development/api-wrapper/types/react-component/confirm-dialog-props).

#### Example

```tsx
const ConfirmButton = () => {
    // Modal open state must be handled manually
    const [showModal, setShowModal] = React.useState(false);

    return (
        <Spicetify.ReactComponent.ConfirmDialog
            isOpen={showModal}
            onConfirm={() => {
                setShowModal(false);
                Spicetify.showNotification('Confirmed');
            }}
            onCancel={() => {
                setShowModal(false);
                Spicetify.showNotification('Cancelled');
            }}
            onOutsideClick={() => {
                setShowModal(false);
                Spicetify.showNotification('Clicked outside');
            }}
            titleText="Confirm Modal"
            descriptionText="Are you sure you want to confirm?"
            confirmText="Confirm"
            cancelText="Cancel"
        />
        <button onClick={() => setShowModal(true)}>Click me</button>
    );
}
```

### `Toggle`

Component to display Spotify-style toggle. Used by Spotify on the settings page.

#### Props

See [`ToggleProps`](/docs/development/api-wrapper/types/react-component/toggle-props).

```tsx
const Toggle = () => {
    const [enabled, setEnabled] = React.useState(false);

    return (
        <Spicetify.ReactComponent.Toggle
            value={enabled}
            onSelected={setEnabled}
            id="my-toggle-id"
            class="my-toggle-class"
        ></Spicetify.ReactComponent.Toggle>
    );
}
```

### `Slider`

Component to render sliders. It is used by Spotify for the volume/playing bars and on the settings page.

#### Props

See [`SliderProps`](/docs/development/api-wrapper/types/react-component/slider-props).

#### Example

```tsx
const Slider = () => {
    const [value, setValue] = useState(0);

    return (
        <Spicetify.ReactComponent.Slider
            max={100}
            step={1}
            value={value}
            onDragStart={() => {}}
            onDragMove={setValue}
            onDragEnd={(value) => {console.log(`final value is ${value}`)}}
        ></Spicetify.ReactComponent.Slider>
    );
}
```

### `PanelSkeleton`, `PanelContent`, `PanelHeader`

Components to render Spotify-style panel. Used by Spotify on their right sidebar panels (e.g. BuddyFeed, Now Playing, etc).

Refer to [`Panel.Components`](/docs/development/api-wrapper/methods/panel#components) for more details.