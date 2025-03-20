---
title: Panel
description: API wrapper to interact with Spotify's panel/right sidebar.
---

Spicetify provides a wrapper for the Spotify `PanelAPI` method to make it easier to use, as well as providing a method to help you register your own panel.

```ts
namespace Panel {
  const reservedPanelIds: Record<string | number, string | number>;
  const Components: {
    PanelSkeleton: any;
    PanelContent: any;
    PanelHeader: any;
  };
  function hasPanel(id: number): boolean;
  function getPanel(id: number): React.ReactNode | undefined;
  function setPanel(id: number): Promise<void>;
  function subPanelState(callback: (id: number) => void): void;
  function registerPanel(props: PanelProps): {
    id: number;
    toggle: () => Promise<void>;
    onStateChange: (callback: (isActive: boolean) => void) => void;
    isActive: boolean;
  };
  const currentPanel: number;
}
```

Internally, Spotify uses an enum to cross-reference the IDs of the panels with the panels themselves. As such, all methods in `Panel` will only accept IDs that are reserved by Spotify and those that are manually registered via `registerPanel`.

## Properties

### `reservedPanelIds`

An object of reserved panel IDs used by Spotify.

```ts
const reservedPanelIds: Record<string | number, string | number>;
```

This list is dynamic, so it is recommended to check the list in the console.

As of Spotify `1.2.12`, there are currently 5 reserved IDs:

```ts
{
    0: "Disabled",
    1: "BuddyFeed",
    2: "NowPlayingView",
    3: "WhatsNewFeed",
    4: "Puffin",
}
```

### `Components`

Collection of React Components used by Spotify in the Panel.

Refer to [Registering a custom Panel](#registering-a-custom-panel) for more information on how to use these components.

```ts
const Components: {
  PanelSkeleton: any;
  PanelContent: any;
  PanelHeader: any;
};
```

### `currentPanel`

ID of the current Panel.

```ts
const currentPanel: number;
```

Example:

```ts
console.log(Spicetify.Panel.currentPanel); // 0
```

## Methods

### `hasPanel`

Check whether or not a Panel with the provided ID is registered.

```ts
function hasPanel(id: number): boolean;
```

Example:

```ts
Spicetify.Panel.hasPanel(0); // true, reserved to "Disabled" by Spotify
Spicetify.Panel.hasPanel('Disabled'); // false, ID is not a number
Spicetify.Panel.hasPanel(5); // false, ID is not registered
```

### `getPanel`

Get the Panel with the provided ID.

```ts
function getPanel(id: number): React.ReactNode | string | undefined;
```

Example:

```ts
Spicetify.Panel.getPanel(0); // "Disabled"
Spicetify.Panel.getPanel('Disabled'); // undefined, ID is not a number
Spicetify.Panel.getPanel(5); // undefined, ID is not registered
```

### `setPanel`

Set the Panel state with the provided ID.

```ts
function setPanel(id: number): Promise<void>;
```

:::caution

On older Spotify versions (around `1.2.6`), the `PanelAPI` method is incomplete, most notably the `getPanel` method.

Spicetify offers a workaround for this by storing its own state of the current Panel ID, however this state is only updated after Spotify internal components are rendered due to how the `PanelAPI` method works on older versions.

If you decide to interact directly with the `PanelAPI` method instead of using the wrapper, the `render` method will not work as expected.

```ts
// Normal way of using the Panel method, will work as expected
Spicetify.Panel.setPanel(0);

// Interacting directly with the PanelAPI method will cause some abnormalities
// as state is updated after Spotify internal components are rendered
Spicetify.Platform.PanelAPI.setPanel(0);
```

:::

Example:

```ts
await Spicetify.Panel.setPanel(0); // Close the Panel

await Spicetify.Panel.setPanel(1); // Open BuddyFeed

// Open the Panel with ID 5
// If the ID is not registered, it will be set to 0
await Spicetify.Panel.setPanel(5);
```

### `subPanelState`

Subscribe to Panel changes.

```ts
function subPanelState(callback: (id: number) => void): void;
```

Example:

```ts
Spicetify.Panel.subPanelState((id) => {
  console.log(id); // 2
  // Do something
});
```

### `registerPanel`

Register a new Panel and return its methods and properties.

:::note

To avoid conflict with Spotify and other extensions on current version and future updates, an ID will be automatically assigned to the Panel.

:::

:::tip

To make it easier and convenient for developers to use the Panel API, this method by default wraps the children passed into a Panel skeleton and content wrapper.

However, this also means that the props passed onto the Panel cannot be updated after the Panel is registered. (most notably the `label` and `header` props)

If you want to customize the Panel, look into [Registering a custom Panel](#registering-a-custom-panel).

:::

```ts
function registerPanel(props: PanelProps): {
  id: number;
  toggle: () => Promise<void>;
  onStateChange: (callback: (isActive: boolean) => void) => void;
  isActive: boolean;
};
```

#### Parameters

| Name    | Type                                                                | Description             |
| ------- | ------------------------------------------------------------------- | ----------------------- |
| `props` | [PanelProps](/docs/development/api-wrapper/types/panel/panel-props) | Properties of the Panel |

Example:

```ts
const { id, toggle, onStateChange, isActive } = Spicetify.Panel.registerPanel({
  label: 'My Panel',
  children: <div>My Panel</div>,
});

console.log(id); // 5
console.log(isActive); // false

await toggle(); // Open the Panel

console.log(isActive); // true

onStateChange((isActive) => {
  console.log(isActive); // false
});
```

:::tip

`onStateChange` callback function will be called immediately after registering a callback due to how the `PanelAPI` method works.

:::

#### Registering a custom Panel

Ideally, you would not need to use these components directly, but in case the `registerPanel` method does not satisfy your needs, you can use these along with the `isCustom` prop to create your own customised panel.

#### Props

See [`PanelHeaderProps`](/docs/development/api-wrapper/types/react-component/panel-header-props), [`PanelContentProps`](/docs/development/api-wrapper/types/react-component/panel-content-props), and [`PanelSkeletonProps`](/docs/development/api-wrapper/types/react-component/panel-skeleton-props).

#### Example

```tsx
const PanelAction = () => {
    return (
        <Spicetify.ReactComponent.TooltipWrapper label="Show notification">
            <button onClick={() => Spicetify.showNotification('Hello World')}>
                <Spicetify.ReactComponent.IconComponent
                    semanticColor="textBase"
                    dangerouslySetInnerHTML={{ __html: Spicetify.SVGIcons["play"] }}
                    iconSize={16}
                />
            </button>
        </Spicetify.ReactComponent.TooltipWrapper>
    )
}

// Ideally, you would want to memoize this component
// to prevent unnecessary re-renders if you were to pass props

// Props will have a single `panel` property for the panel ID
const Panel = ({ panel }) => {
    // For example, if you want to change the header title
    const [title, setTitle] = React.useState('Hello World');
    // Or if you want to display extra actions on the header in a stateful manner
    const [showActions, setShowActions] = React.useState(false);

    return (
        <Spicetify.ReactComponent.PanelSkeleton
            label="Hello World"
            style={{
                "--panel-width": "300px"
            }}
        >
            <Spicetify.ReactComponent.PanelContent className="my-panel-content">
                <Spicetify.ReactComponent.PanelHeader
                    title={title}
                    link="/collection" // Can be an URI or an external URL
                    panel={panel}
                    actions={showActions && <PanelAction />}
                    onClose={() => Spicetify.showNotification('Closed')}
                    onBack={() => Spicetify.showNotification('Back')}
                />
                <div className="my-panel-body">
                    Hello World
                </div>
                <button onClick={() => setTitle('Hello World 2')}>Change title</button>
                <button onClick={() => setShowActions(!showActions)}>Toggle actions</button>
            </Spicetify.ReactComponent.PanelContent>
        </Spicetify.ReactComponent.PanelSkeleton>
    )
};

// Finally, register the Panel
const { id, toggle, onStateChange, isActive } = Spicetify.Panel.registerPanel({
    children: <Panel />,
    isCustom: true
});
```
