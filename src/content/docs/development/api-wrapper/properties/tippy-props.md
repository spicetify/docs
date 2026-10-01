---
title: TippyProps
description: Tippy.js props that match Spotify's tooltip style.
---

`Spicetify.TippyProps` is a read-only set of [Tippy.js](https://atomiks.github.io/tippyjs/) props that renders a tooltip in Spotify's style. [`Topbar`](/docs/development/api-wrapper/classes/topbar) and [`Playbar`](/docs/development/api-wrapper/classes/playbar) buttons use it. In a module, use `client.tippyProps`.

```ts
const TippyProps: {
  delay: [number, number];
  animation: boolean;
  render(instance: any): { popper: HTMLElement; onUpdate: (prevProps: any, nextProps: any) => void };
  onShow(instance: any): void;
  onMount(instance: any): void;
  onHide(instance: any): void;
};
```

The props wait 200 milliseconds before showing and render the content as text, or as HTML when you set `allowHTML`. Spread them into your own Tippy.js call and override what you need.

```ts
Spicetify.Tippy(element, {
  ...Spicetify.TippyProps,
  content: 'Open settings',
  delay: [100, 0],
});
```
