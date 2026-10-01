---
title: SliderProps
description: The props of ReactComponent.Slider.
---

`SliderProps` are the props of [`ReactComponent.Slider`](/docs/development/api-wrapper/properties/react-components#toggle-and-slider).

```ts
type SliderProps = {
  value: number;
  min: number;
  max: number;
  step: number;
  labelText?: string;
  isInteractive?: boolean;
  forceActiveStyles?: boolean;
  onDragStart: (value: number) => void;
  onDragMove: (value: number) => void;
  onDragEnd: (value: number) => void;
  onStepForward?: () => void;
  onStepBackward?: () => void;
};
```

| Prop | Description |
| --- | --- |
| `value`, `min`, `max` | The current value and its range. |
| `step` | The amount one keyboard step changes the value. |
| `labelText` | The accessible label. |
| `isInteractive` | Lets the user drag the slider. |
| `forceActiveStyles` | Shows the active style when the user is not dragging. |
| `onDragStart`, `onDragMove`, `onDragEnd` | Run with the value when a drag starts, moves and ends. |
| `onStepForward`, `onStepBackward` | Deprecated step callbacks. |
