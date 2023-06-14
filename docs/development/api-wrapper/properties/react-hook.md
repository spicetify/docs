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
}
```

## Hooks

### `DragHandler`

React Hook to create interactive drag-and-drop element.

Used to create a draggable element that can be dropped into Spotify's components (e.g. Playlist, Folder, Sidebar, Queue)

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