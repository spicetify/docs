---
title: Playbar
description: Add buttons and widgets to the now playing bar.
---

`Spicetify.Playbar` adds controls to the now playing bar. In a module, use `client.playbar`, or stdlib's `registrar.placeButton('playbar', options)` and the `playbarWidget` register.

```ts
namespace Playbar {
  class Button {
    constructor(label: string, icon: SVGIcon | string, onClick?: (self: Button) => void, disabled?: boolean, active?: boolean, registerOnCreate?: boolean);
    label: string;
    icon: string;
    onClick: (self: Button) => void;
    disabled: boolean;
    active: boolean;
    element: HTMLButtonElement;
    tippy: any;
    register(): void;
    deregister(): void;
  }

  class Widget {
    constructor(label: string, icon: SVGIcon | string, onClick?: (self: Widget) => void, disabled?: boolean, active?: boolean, registerOnCreate?: boolean);
    label: string;
    icon: string;
    onClick: (self: Widget) => void;
    disabled: boolean;
    active: boolean;
    element: HTMLButtonElement;
    tippy: any;
    register(): void;
    deregister(): void;
  }
}
```

`Button` sits with the extra controls on the right of the bar, such as lyrics and the queue. Use it for player actions with an on or off state. `Widget` sits next to the current track's title, like the like button. Use it for actions on the current track.

| Parameter | Type | Description |
| --- | --- | --- |
| `label` | `string` | The tooltip text. |
| `icon` | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) &#124; `string` | An icon name or SVG markup. |
| `onClick` | `(self) => void` | Runs when the user clicks the control. Defaults to a function that does nothing. |
| `disabled` | `boolean` | Disables the control. Defaults to `false`. |
| `active` | `boolean` | Shows the active style. Defaults to `false`. |
| `registerOnCreate` | `boolean` | Adds the control to the bar in the constructor. Defaults to `true`. |

`register` adds the control and `deregister` removes it. Setting `label`, `icon`, `onClick`, `disabled` or `active` updates the control. `tippy` is the [Tippy.js instance](https://atomiks.github.io/tippyjs/v6/tippy-instance/) that shows the label, styled with [`TippyProps`](/docs/development/api-wrapper/properties/tippy-props). A disabled control receives no click events.

```ts
const loopButton = new Spicetify.Playbar.Button('Loop section', 'repeat', (self) => {
  self.active = !self.active;
});

const saveWidget = new Spicetify.Playbar.Widget('Save to playlist', 'plus-alt', () => {
  Spicetify.showNotification('Saved');
});

loopButton.deregister();
saveWidget.deregister();
```
