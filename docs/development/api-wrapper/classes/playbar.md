---
title: Playbar
description: Create buttons in the player.
---

Create buttons in the player, next to the player controls.

This is useful for creating buttons which actions has an impact on/relating to the player and is generally dynamic/stateful, such as a button that toggles the player's loop mode.

```ts
namespace Playbar {
    class Button {
        constructor(label: string, icon: SVGIcon | string, onClick: (self: Button) => void, disabled?: boolean, active?: boolean, registerOnCreate?: boolean);
        label: string;
        icon: string;
        onClick: (self: Button) => void;
        disabled: boolean;
        active: boolean;
        element: HTMLButtonElement;
        tippy: any;
        register: () => void;
        deregister: () => void;
    }
};
```

#### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| label | `string` | Label of the button. |
| icon | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) &#124; `string` | Icon of the button. |
| onClick | `(self: Button) => void` | Callback function when button is clicked. |
| disabled | `boolean` &#124; `undefined` | Whether the button is disabled. |
| active | `boolean` &#124; `undefined` | Whether the button is active. |
| registerOnCreate | `boolean` &#124; `undefined` | Whether the button should be registered to the player on creation. |

#### Properties

:::tip

All of the listed properties are dynamic and can be changed at any time. Look into the example below for more information.

:::

| Name | Type | Description |
| :--- | :--- | :--- |
| label | `string` | Label of the button. |
| icon | `string` | Icon of the button. |
| disabled | `boolean` | Whether the button is disabled. |
| active | `boolean` | Whether the button is active. |
| onClick | `(self: Button) => void` | Callback function when button is clicked. |
| element | `HTMLButtonElement` | HTML element of the button. |
| tippy | `any` | Tippy instance of the button. For more information, see [Tippy.js](https://atomiks.github.io/tippyjs/v6/tippy-instance/). |

#### Methods

##### `register`

Register the button to the player.

```ts
register(): void;
```

##### `deregister`

Deregister the button from the player.

```ts
deregister(): void;
```

#### Example

:::caution

Tippy, `onlick` or any other click events will **not** work if `disabled` is set to `true`. You will need to manually enable the button inside your extension.

This is due to the limitations of Tippy itself and how HTML elements work.

:::

```ts
// By default, the button will be registered to the player on creation.
// You can disable this by setting registerOnCreate to false.
// Each button comes with a preconfigured Tippy instance that aims to mimic the original Spotify tooltip.
const button = new Spicetify.Playbar.Button(
    "My Button",
    "play",
    (self) => {
        // Do something when button is clicked.
    },
    false, // Whether the button is disabled.
    false, // Whether the button is active.
);

// You can also register the button to the player later.
button.register();

// Remove the button from the player when it is no longer needed.
button.deregister();
// If you don't want to remove the button entirely, you can also disable it.
button.disabled = true;

// Change button properties.
// Changing label will also change the tooltip content.
button.label = "Hello world!";
button.icon = "play";

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