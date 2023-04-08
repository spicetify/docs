---
title: TippyProps
description: Predefined props for Tippy.js tooltips.
---

Spicetify provides a set of predefined props for Tippy.js tooltips. This is aimed to create tooltips that mimic the style of Spotify's tooltips.

This is utilized for [`Topbar`](/docs/development/api-wrapper/classes/topbar) and [`Playbar`](/docs/development/api-wrapper/classes/playbar) tooltips.

```ts
Spicetify.TippyProps = {
    delay: [200, 0],
    animation: true,
    render(instance) {
        const popper = document.createElement('div');
        const box = document.createElement('div');

        popper.id = "context-menu";
        popper.appendChild(box);

        box.className = "main-contextMenu-tippy"
        box.textContent = instance.props.content;

        function onUpdate(prevProps, nextProps) {
            if (prevProps.content !== nextProps.content) {
            if (nextProps.allowHTML) box.innerHTML = nextProps.content;
            else box.textContent = nextProps.content;
            }
        }

        return { popper, onUpdate }
    },
    onShow(instance) {
        instance.popper.firstChild.classList.add("main-contextMenu-tippyEnter");
    },
    onMount(instance) {
        requestAnimationFrame(() => {
            instance.popper.firstChild.classList.remove("main-contextMenu-tippyEnter");
            instance.popper.firstChild.classList.add("main-contextMenu-tippyEnterActive");
        });
    },
    onHide(instance) {
        requestAnimationFrame(() => {
            instance.popper.firstChild.classList.remove("main-contextMenu-tippyEnterActive");
            instance.unmount();
        });
    },
},
```

#### Usage

If you want to use this set of props for your own Tippy.js tooltips, you can simply spread the `Spicetify.TippyProps` object into your Tippy.js instance.

```ts
const element = document.createElement("div");

const tooltip = tippy(element, {
    ...Spicetify.TippyProps,
    content: "Tooltip content",
    // For example, if you want to override the delay
    delay: [100, 0],
});
```
