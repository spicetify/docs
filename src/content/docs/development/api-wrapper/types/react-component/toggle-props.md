---
title: ToggleProps
description: Type definition for props of ReactComponent.Toggle.
---

The `ToggleProps` object is used to render a toggle.

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

```ts
type ToggleProps = {
    value: boolean;
    disabled?: boolean;
    onSelected: (value: boolean) => void;
    id?: string;
    className?: string;
}
```

#### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| value | `boolean` | The current state of the toggle. `true` means it's on, `false` means it's off. |
| disabled | `boolean` &#124; `undefined` | Determines if the toggle is disabled. If `true`, the toggle is not interactive. |
| onSelected | `(value: boolean) => void` | Callback function that is called when the toggle is clicked. The function receives the new state of the toggle. |
| id | `string` &#124; `undefined` | The ID for the toggle, useful for associating with a label for accessibility. |
| className | `string` &#124; `undefined` | Additional CSS class name to apply to the toggle. |
