---
title: getFontStyle
description: Returns the font style for a given variant.
---

Spicetify provides a function that returns the CSS style for a given font variant used in the Spotify app.

:::tip

This function is used to provide backwards compatibility for older Spicetify extensions and custom apps that use `main-type-` classes.

Instead of using this function to get Spotify stylings, you can simply add the `main-type-<variant>` class to your element.

:::

```ts
function getFontStyle(font: Variant): string;
```

#### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| font | [`Variant`](/docs/development/api-wrapper/types/variant) | Font variant |

#### Returns

`string` - CSS style for the given font variant.

#### Example

```ts
const style = getFontStyle("forte");

// Returns "viola" if given an invalid variant
// Equivalent to `getFontStyle("viola");`
const style = getFontStyle("invalid-variant");
```
