---
title: KeysDefine
description: The keyboard shortcut argument that Spicetify.Keyboard accepts.
---

`KeysDefine` describes a keyboard shortcut for [`Spicetify.Keyboard`](/docs/development/api-wrapper/methods/keyboard).

```ts
type KeysDefine =
  | string
  | {
      key: string;
      ctrl?: boolean;
      shift?: boolean;
      alt?: boolean;
      meta?: boolean;
    };
```

A string must be a single key name from [`KEYS`](/docs/development/api-wrapper/types/keyboard/validkey), such as `"f8"`. A combined string such as `"ctrl+shift+p"` throws. Use the object form for a key with modifiers.

In the object form, `key` must also be a key name from `KEYS`. `ctrl` binds Mousetrap's `mod` modifier, which is <kbd>Cmd</kbd> on macOS and <kbd>Ctrl</kbd> on Windows and Linux. `meta` binds the <kbd>Cmd</kbd> or <kbd>Windows</kbd> key.

```ts
const openSearch: Spicetify.Keyboard.KeysDefine = { key: 'k', ctrl: true };
```
