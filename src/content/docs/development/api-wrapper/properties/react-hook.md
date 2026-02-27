---
title: ReactHook
description: Set of React hooks used by the Spotify client.
---

Spicetify provides a set of React hooks used by the Spotify client. You can use these hooks to create a React component interactive with the client.

:::note

It is recommended that you be familiar with [`React`](https://react.dev/) before using these hooks.

:::

```ts
namespace ReactHook {
    function DragHandler(
        uris?: string[],
        label?: string,
        contextUri?: string,
        sectionIndex?: number,
        dropOriginUri?: string
    ): (event: React.DragEvent, uris?: string[], label?: string, contextUri?: string, sectionIndex?: number) => void;
    function usePanelState(id: number): { toggle: () => void, isActive: boolean };
    function useExtractedColor(uri: string, fallbackColor?: string, variant?: "colorRaw" | "colorLight" | "colorDark"): string;
}
```

## Hooks

### `DragHandler`

React Hook to create interactive drag-and-drop element.

Used to create a draggable element that can be dropped into Spotify's components (e.g. Playlist, Folder, Sidebar, Queue)

```ts
function DragHandler(
    uris?: string[],
    label?: string,
    contextUri?: string,
    sectionIndex?: number,
    dropOriginUri?: string
): (event: React.DragEvent, uris?: string[], label?: string, contextUri?: string, sectionIndex?: number) => void;
```

#### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| uris | `string[]` &#124; `undefined` | List of URIs to be dragged. |
| label | `string` &#124; `undefined` | Label to be displayed when dragging. |
| contextUri | `string` &#124; `undefined` | Context URI of the element from which the drag originated (e.g. Playlist URI). |
| sectionIndex | `number` &#124; `undefined` | Index of the section in which the drag originated. |
| dropOriginUri | `string` &#124; `undefined` | URI of the desired drop target. Leave empty to allow drop anywhere. |

#### Returns

Function to handle drag event. Should be passed to `onDragStart` prop of the element. All parameters passed onto the hook will be passed onto the handler unless declared otherwise.

#### Example

```tsx
const DraggableComponent = () => {
    // Do I Wanna Know? by Arctic Monkeys
    const uri = "spotify:track:5FVd6KXrgO9B3JPmC8OPst";
    const label = "Do I Wanna Know? - Arctic Monkeys";

    const handleDragStart = Spicetify.ReactHook.DragHandler([uri], label);

    return (
        <div draggable onDragStart={handleDragStart}>
            {label}
        </div>
    );
}
```

### `usePanelState`

React Hook to use panel state.

```ts
function usePanelState(id: number): { toggle: () => void, isActive: boolean };
```

#### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| id | `number` | ID of the panel to use. |

#### Returns

Object with methods of the panel.

| Property | Type | Description |
| :--- | :--- | :--- |
| toggle | `() => void` | Toggle the panel. |
| isActive | `boolean` | Whether the panel is active. |

#### Example

```tsx
const PanelComponent = () => {
    // The ID can be either Spotify's default panel IDs or your custom panel ID registered via `Spicetify.Panel.registerPanel`
    const { toggle, isActive } = Spicetify.ReactHook.usePanelState(5);

    return (
        <div>
            <button onClick={toggle}>
                {isActive ? "Close" : "Open"} Panel
            </button>
        </div>
    );
}
```

### `useExtractedColor`

React Hook to use extracted color from GraphQL.

```ts
function useExtractedColor(uri: string, fallbackColor?: string, variant?: "colorRaw" | "colorLight" | "colorDark"): string;
```

:::note

This is a wrapper of ReactQuery's `useQuery` hook. The component using this hook must be wrapped in a `QueryClientProvider` component.

Look into the example below for more information.

:::

#### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| uri | `string` | URI of the Spotify image to extract color from. |
| fallbackColor | `string` &#124; `undefined` | Fallback color to use if the image is not available. Defaults to `#535353`. |
| variant | `"colorRaw"` &#124; `"colorLight"` &#124; `"colorDark"` &#124; `undefined` | Variant of the color to use. Defaults to `colorRaw`. |

#### Returns

Extracted color hex code.

#### Example

```tsx
import { useEffect, useState } from "react";

const { QueryClient, QueryClientProvider } = Spicetify.ReactQuery;
const { useExtractedColor } = Spicetify.ReactHook;

const queryClient = new QueryClient();

const Component = () => {
    const [imageUri, setImageUri] = useState(Spicetify.Player.data?.item?.metadata?.image_xlarge_url ?? "");
    const color = useExtractedColor(imageUri);

    useEffect(() => {
        // Listen to track change
        const listener = () => {
            setImageUri(Spicetify.Player.data?.item?.metadata?.image_xlarge_url ?? "");
        };
        Spicetify.Player.addEventListener("songchange", listener);

        return () => Spicetify.Player.removeEventListener("songchange", listener);
    }, []);

    return (
        <div style={{ backgroundColor: color }}>
            Hello World
        </div>
    );
}

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Component />
        </QueryClientProvider>
    );
}
```
