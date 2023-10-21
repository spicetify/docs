---
title: PanelProps
description: Properties that are used by the `registerPanel` function.
---

```ts
type PanelProps = {
    label?: string;
    children: React.ReactNode;
    isCustom?: boolean;
    style?: React.CSSProperties;
    wrapperClassname?: string;
    headerClassname?: string;
    headerVariant?: Variant;
    headerSemanticColor?: SemanticColor;
    headerLink?: string;
    headerActions?: React.ReactNode;
    headerOnClose?: () => void;
    headerPreventDefaultClose?: boolean;
    headerOnBack?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
```

| Property | Type | Description |
| --- | --- | --- |
| `label` | `string` &#124; `undefined` | Label of the Panel. |
| `children` | `React.ReactNode` | Children to render inside the Panel.<br />Must be a React Component. |
| `isCustom` | `boolean` &#124; `undefined` | Determine if the children passed is a custom Panel.<br />If true, the children will be rendered as is.<br />**Note**: All passed props except `children` will be ignored if enabled. |
| `style` | `React.CSSProperties` &#124; `undefined` | Inline styles to apply to the Panel skeleton. |
| `wrapperClassname` | `string` &#124; `undefined` | Additional class name to apply to the Panel content wrapper. |
| `headerClassname` | `string` &#124; `undefined` | Additional class name to apply to the Panel header. |
| `headerVariant` | [`Variant`](/docs/development/api-wrapper/types/variant) &#124; `undefined` | Font variant for the Panel header title. |
| `headerSemanticColor` | [`SemanticColor`](/docs/development/api-wrapper/types/semantic-color) &#124; `undefined` | Semantic color name for the Panel header title. |
| `headerLink` | `string` &#124; `undefined` | Href for the header link.<br />Can be either a URI, a path within the app, or a URL for an external link. |
| `headerActions` | `React.ReactNode` &#124; `undefined` | Additional actions to render in the header.<br />Will be rendered next to the close button. |
| `headerOnClose` | `() => void` &#124; `undefined` | Function to call when clicking on the header close button.<br />Called before the panel is closed. |
| `headerPreventDefaultClose` | `boolean` &#124; `undefined` | Prevent the panel from closing when clicking on the header close button. |
| `headerOnBack` | `(event: React.MouseEvent<HTMLButtonElement>) => void` &#124; `undefined` | Function to call when clicking on the header back button.<br />If not provided, the back button will not be rendered. |