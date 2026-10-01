---
title: PopupModal
description: Show a modal dialog over the Spotify client.
---

`Spicetify.PopupModal` shows one modal over the client. In a module, import `displayModal` and `hideModal` from `/modules/stdlib/mod.ts` instead. `client.popupModal` is a deprecated alias of them.

```ts
namespace PopupModal {
  interface Content {
    title: string;
    content: string | Element | React.ReactElement;
    isLarge?: boolean;
  }
  function display(content: Content): void;
  function hide(): void;
}
```

- `display` shows the modal and replaces any modal it already shows. A string `content` is set as HTML, and a React element renders with `ReactDOM.render`. `isLarge` uses the wider layout.
- `hide` closes the modal. The modal also closes when the user clicks the close button or outside the dialog.

```ts
Spicetify.PopupModal.display({
  title: 'Keyboard shortcuts',
  content: '<p>Press Ctrl+K to search.</p>',
});
```
