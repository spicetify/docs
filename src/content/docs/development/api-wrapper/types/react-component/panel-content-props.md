---
title: PanelContentProps
description: Type definition for props of ReactComponent.PanelContent.
---

:::warning
Not available in Spicetify v3. The v3 wrapper exposes no `Spicetify.Panel` and no `Platform.PanelAPI`, verified against a running client. Modules register a panel through stdlib's panel register instead: see [Building a module](/docs/development/building-a-module). This page documents the v2 API.
:::

The `PanelContentProps` object is used to render a panel content wrapper.

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

```ts
type PanelContentProps = {
    className?: string;
    children?: React.ReactNode;
};
```

#### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| className | `string` &#124; `undefined` | Additional class name to apply to the panel. |
| children | `React.ReactNode` &#124; `undefined` | Children to render inside the panel. |