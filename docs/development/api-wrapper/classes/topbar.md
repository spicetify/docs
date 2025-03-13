---
title: Topbar
description: Create buttons in the top bar.
---

Create buttons in the top bar, next to the navigation buttons.

This is useful for creating buttons that are generally static and whose actions have an impact on the whole app, such as a button that opens a settings menu.

```ts
namespace Topbar {
    class Button {
        constructor(label: string, icon: SVGIcon | string, onClick: (self: Button) => void, disabled?: boolean, isRight?: boolean);
        label: string;
        icon: string;
        onClick: (self: Button) => void;
        disabled: boolean;
        isRight: boolean;
        element: HTMLButtonElement;
        tippy: any;
    }
};
```

#### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| label | `string` | Label of the button. |
| icon | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) &#124; `string` | Icon of the button. |
| onClick | `(self: Button) => void` | Callback function when the button is clicked. |
| disabled | `boolean` | Whether the button is disabled. |
| isRight | `boolean` | Whether the button is button placed on the right side. |

#### Properties

:::tip

All of the listed properties are dynamic and can be changed at any time. Look into the example below for more information.

:::

| Name | Type | Description |
| :--- | :--- | :--- |
| label | `string` | Label of the button. |
| icon | `string` | Icon of the button. |
| disabled | `boolean` | Whether the button is disabled. |
| onClick | `(self: Button) => void` | Callback function when the button is clicked. |
| element | `HTMLButtonElement` | HTML element of the button. |
| tippy | `any` | Tippy instance of the button. For more information, see [Tippy.js](https://atomiks.github.io/tippyjs/v6/tippy-instance/). |

#### Example

:::caution

Tippy, `onclick` or any other click events will **not** work if `disabled` is set to `true`. You will need to manually enable the button inside your extension.

This is due to the limitations of Tippy itself and how HTML elements work.

:::

```ts
// Button is automatically added to the top bar when created.
// Each button comes with a preconfigured Tippy instance that aims to mimic the original Spotify tooltip.
const button = new Spicetify.Topbar.Button("Hello", "download", () => {
    Spicetify.showNotification("Hello world!");
});

// Change button properties.
// Changing label will also change the tooltip content.
button.label = "Hello world!";
button.icon = "play";
button.disabled = true;

// You can also set properties of the HTML element.
button.element.style.color = "red";
button.element.oncontextmenu = () => {
    Spicetify.showNotification("You right-clicked me!");
};
button.element.addEventListener("click", () => {
    // Do something else.
    Spicetify.showNotification("You clicked me!");
});

// You can also change properties of the Tippy instance. For more information, see https://atomiks.github.io/tippyjs/v6/tippy-instance/.
button.tippy.setContent("Hello world!");

// Or if you want to use HTML.
button.tippy.setProps({
    content: "<b>Hello world!</b>",
    allowHTML: true,
});
```
