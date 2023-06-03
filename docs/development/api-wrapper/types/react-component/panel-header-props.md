---
title: PanelHeaderProps
description: Type definition for props of ReactComponent.PanelHeader.
---

The `PanelHeaderProps` object is used to render a panel header.

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

```ts
type PanelHeaderProps = {
    link?: string;
    title?: string;
    panel: number;
    isAdvert?: boolean;
    actions?: React.ReactNode;
    onClose?: () => void;
    preventDefaultClose?: boolean;
    onBack?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    titleVariant?: Variant;
    titleSemanticColor?: SemanticColor;
};
```

#### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| link | `string` &#124; `undefined` | Href for the header link.<br />Can be either a URI, a path within the app, or a URL for an external link. |
| title | `string` &#124; `undefined` | Title of the header. |
| panel | `number` | Panel ID. Used to toggle panel open/closed state. |
| isAdvert | `boolean` &#124; `undefined` | Whether or not the panel contains advertisements. Defaults to `false` |
| actions | `React.ReactNode` &#124; `undefined` | Actions to render in the header. |
| onClose | `() => void` &#124; `undefined` | Function to call when clicking on the close button.<br />Called before the panel is closed. |
| preventDefaultClose | `boolean` &#124; `undefined` | Prevent the panel from closing when clicking on the header close button. Defaults to `false` |
| onBack | `(event: React.MouseEvent<HTMLButtonElement>) => void` &#124; `undefined` | Function to call when clicking on the header back button.<br />If not provided, the back button will not be rendered. |
| titleVariant | [`Variant`](/docs/development/api-wrapper/types/variant) &#124; `undefined` | Font variant for the header title. Defaults to `"balladBold"` |
| titleSemanticColor | [`SemanticColor`](/docs/development/api-wrapper/types/semantic-color) &#124; `undefined` | Semantic color name for the header title. Defaults to `"textBase"` |