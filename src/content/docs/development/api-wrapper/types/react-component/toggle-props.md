---
title: ToggleProps
description: The props of ReactComponent.Toggle.
---

`ToggleProps` are the props of [`ReactComponent.Toggle`](/docs/development/api-wrapper/properties/react-components#toggle-and-slider). The wrapper's type declarations do not cover this component, so the props come from Spotify's settings page.

```ts
type ToggleProps = {
  value: boolean;
  onSelected: (value: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
};
```

| Prop | Description |
| --- | --- |
| `value` | `true` when the toggle is on. |
| `onSelected` | Runs with the new value when the user clicks the toggle. |
| `disabled` | Disables the toggle. |
| `id` | The input's ID, which a `<label htmlFor>` can point to. |
| `className` | Extra class names. |
