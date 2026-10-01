---
title: Topbar
description: Add buttons to the top bar.
---

`Spicetify.Topbar.Button` adds a button to the top bar, next to the navigation buttons or on the right side. In a v3 module, use `registrar.placeButton('topbar-left', options)` or `'topbar-right'` from stdlib instead.

```ts
namespace Topbar {
  class Button {
    constructor(label: string, icon: SVGIcon | string, onClick: (self: Button) => void, disabled?: boolean, isRight?: boolean);
    label: string;
    icon: string;
    onClick: (self: Button) => void;
    disabled: boolean;
    element: HTMLDivElement;
    button: HTMLButtonElement;
    tippy: any;
  }
}
```

| Parameter | Type | Description |
| --- | --- | --- |
| `label` | `string` | The tooltip and accessible label. |
| `icon` | [`SVGIcon`](/docs/development/api-wrapper/types/svgicon) &#124; `string` | An icon name or SVG markup. |
| `onClick` | `(self: Button) => void` | Runs when the user clicks the button. |
| `disabled` | `boolean` | Disables the button. Defaults to `false`. |
| `isRight` | `boolean` | Places the button on the right side of the top bar. Defaults to `false`. |

The constructor adds the button to the top bar. `Topbar.Button` has no `register` or `deregister`, so remove the button with `button.element.remove()`.

Setting `label`, `icon`, `onClick` or `disabled` updates the button. `element` is the wrapper `div`, and `button` is the `button` inside it. `tippy` is the [Tippy.js instance](https://atomiks.github.io/tippyjs/v6/tippy-instance/) that shows the label, styled with [`TippyProps`](/docs/development/api-wrapper/properties/tippy-props). A disabled button receives no click events.

```ts
const lyricsButton = new Spicetify.Topbar.Button('Lyrics', 'lyrics', () => {
  Spicetify.Platform.History.push('/lyrics-plus');
});

lyricsButton.label = 'Open lyrics';
lyricsButton.element.remove();
```
