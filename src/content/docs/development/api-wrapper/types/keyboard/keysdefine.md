---
title: KeysDefine
description: Keyboard KeyDefine type definition.
---

```ts
type KeysDefine = string | {
    key: string;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    meta?: boolean;
};
```

`KeysDefine` is a type that defines a keyboard shortcut. It can be a string or an object.

In the string format, it should be a list of keys separated by `+`. For example, `ctrl+shift+p` is a valid shortcut.

In the object format, it should be an object with the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `key` | `string` | Key name. Refer to [this table](/docs/development/api-wrapper/types/keyboard/validkey) for a list of valid keys. |
| `ctrl` | `boolean` &#124; `undefined` | Whether to require `CTRL` key. |
| `shift` | `boolean` &#124; `undefined` | Whether to require `SHIFT` key. |
| `alt` | `boolean` &#124; `undefined` | Whether to require `ALT` key. |
| `meta` | `boolean` &#124; `undefined` | Whether to require the meta key. This could be the <kbd>🪟</kbd> key on Windows or the <kbd>⌘</kbd> key on Mac. |
