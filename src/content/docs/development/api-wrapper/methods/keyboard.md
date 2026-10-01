---
title: Keyboard
description: Register global keyboard shortcuts.
---

`Spicetify.Keyboard` registers global keyboard shortcuts through [`Spicetify.Mousetrap`](/docs/development/api-wrapper/modules#libraries). In a module, use `client.keyboard`.

```ts
namespace Keyboard {
  const KEYS: Record<ValidKey, string>;
  function registerShortcut(keys: KeysDefine, callback: (event: KeyboardEvent) => void): void;
  function registerIsolatedShortcut(keys: KeysDefine, callback: (event: KeyboardEvent) => void): void;
  function registerImportantShortcut(keys: KeysDefine, callback: (event: KeyboardEvent) => void): void;
  function _deregisterShortcut(keys: KeysDefine): void;
  function deregisterImportantShortcut(keys: KeysDefine): void;
  function changeShortcut(keys: KeysDefine, newKeys: KeysDefine): void;
}
```

Shortcuts are global, so pick key combinations that Spotify and other modules do not use. `keys` is a [`KeysDefine`](/docs/development/api-wrapper/types/keyboard/keysdefine). An invalid value throws.

- `KEYS` maps each [`ValidKey`](/docs/development/api-wrapper/types/keyboard/validkey) to its Mousetrap name, so `KEYS.CAPS` is `"capslock"`.
- `registerShortcut` binds `callback` to `keys`. `registerIsolatedShortcut` and `registerImportantShortcut` are aliases of it in v3.
- `_deregisterShortcut` unbinds `keys`. `deregisterImportantShortcut` is an alias of it.
- `changeShortcut` moves the callback bound to `keys` onto `newKeys`, and throws when `keys` has no binding.

```ts
Spicetify.Keyboard.registerShortcut({ key: 'p', ctrl: true, shift: true }, () => {
  Spicetify.showNotification('Shortcut pressed');
});

Spicetify.Keyboard.changeShortcut(
  { key: 'p', ctrl: true, shift: true },
  { key: 'o', ctrl: true, shift: true },
);
```
