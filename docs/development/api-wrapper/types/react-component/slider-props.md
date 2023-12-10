---
title: SliderProps
description: Type definition for props of ReactComponent.PanelSkeleton.
---

The `SliderProps` object is used to render a slider.

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

```ts
type SliderProps = {
    value: number;
    max: number;
    step: number;
    labelText?: string;
    isInteractive?: boolean;
    forceActiveStyles?: boolean;
    onDragStart: (value: number) => void;
    onDragMove: (value: number) => void;
    onDragEnd: (value: number) => void;
    onStepForward?: (value: number) => void;
    onStepBackward?: (value: number) => void;
}
```

#### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| value | `number` | The current value of the slider. |
| max | `number` | The maximum value the slider can have. |
| step | `number` | The increment/decrement value when the slider is moved. |
| labelText | `string` &#124; `undefined` | The label text displayed for the slider. |
| isInteractive | `boolean` &#124; `undefined` | Determines if the slider is interactive. |
| forceActiveStyles | `boolean` &#124; `undefined` | Forces the active styles regardless of interaction state. |
| onDragStart | `(value: number) => void` | Callback function when dragging starts. |
| onDragMove | `(value: number) => void` | Callback function when the slider is being dragged. |
| onDragEnd | `(value: number) => void` | Callback function when dragging ends. |
| onStepForward | `(value: number) => void` &#124; `undefined` | Callback function when the slider steps forward. **Deprecated.** |
| onStepBackward | `(value: number) => void` &#124; `undefined` | Callback function when the slider steps backward. **Deprecated.** |
