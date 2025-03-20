---
title: PopupModal
description: Set of methods to create and control popup modals.
---

Spicetify provides a set of methods to create and control popup modals. This will display a modal on top of the client, which can be used to display information or ask for user input.

```ts
namespace PopupModal {
    interface Content {
        title: string;
        content: string | Element;
        isLarge?: boolean;
    }

    function display(content: Content): void;
    function hide(): void;
};
```

## Interface

### `Content`

`Content` is an object that contains the information needed to display the modal.

| Property | Type | Description |
| --- | --- | --- |
| `title` | `string` | Title of the modal. |
| `content` | `string` | Content of the modal. You can specify a string for simple text display or an HTML element for interactive config/setting menu. |
| `isLarge` | `boolean` &#124; `undefined` | Bigger modal. |

## Methods

### `display`

Displays a modal on top of the client.

:::note

This method will replace the current modal if there is one.

:::

| Parameter | Type | Description |
| --- | --- | --- |
| `content` | [`Content`](#content) | Information about the modal. |

```ts
Spicetify.PopupModal.display({
    title: 'Hello World',
    content: 'This is a simple text',
});
```

### `hide`

Hides the current modal.

:::note

This method will hide *any* modal currently displayed via `Spicetify.PopupModal.display`.

:::

```ts
Spicetify.PopupModal.hide();
```
