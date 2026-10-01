---
title: getFontStyle
description: A v2 helper for Spotify font styles, which Spicetify v3 does not provide.
---

:::warning
`Spicetify.getFontStyle` is not available in Spicetify v3. The v3 wrapper does not define it.
:::

In v2, `getFontStyle(font: Variant): string` returned the CSS for a [`Variant`](/docs/development/api-wrapper/types/variant) and fell back to `viola` for an unknown variant. In v3, render text with [`ReactComponent.TextComponent`](/docs/development/api-wrapper/properties/react-components#iconcomponent-and-textcomponent) and its `variant` prop, or with stdlib's primitives.
