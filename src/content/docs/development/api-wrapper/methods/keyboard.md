---
title: Keyboard
description: A wrapper for keyboard shortcuts.
---

Spicetify provides its own method for global keyboard shortcuts. You can specify actions for your extension when the user presses a keyboard shortcut.

:::tip

`Spicetify.Keyboard` is a wrapper of [`Spicetify.Mousetrap`](/docs/development/api-wrapper/modules#mousetrap) configured to be compatible with legacy Spotify.

New extensions are advised to use the module instead.

:::

:::caution

All shortcuts registered by `Spicetify.Keyboard` are global. Be mindful of conflicts with other extensions or the Spotify client itself.

:::

```ts
namespace Keyboard {
    const KEYS: Record<ValidKey, string>;
    function registerShortcut(keys: KeysDefine, callback: (event: KeyboardEvent) => void): void;
    function _deregisterShortcut(keys: KeysDefine): void;
    function changeShortcut(keys: KeysDefine, newKeys: KeysDefine): void;
};
```

## Properties

### `KEYS`

An object containing a list of valid keys, mapped to their valid names.

```ts
const { KEYS } = Spicetify.Keyboard;
```

Refer to [this table](/docs/development/api-wrapper/types/keyboard/validkey) for a list of valid keys.

#### Example

```ts
const { KEYS } = Spicetify.Keyboard;
console.log(KEYS["CAPS"]); // "Capslock"
```

## Methods

### `registerShortcut`

Register a global keyboard shortcut.

```ts
function registerShortcut(keys: KeysDefine, callback: (event: KeyboardEvent) => void): void;
```

#### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| keys | [`KeysDefine`](/docs/development/api-wrapper/types/keyboard/keysdefine) | Keyboard shortcut to register. |
| callback | `(event: KeyboardEvent) => void` | Callback function to run when the shortcut is triggered. |

#### Example

```ts
// Equivalent to `Spicetify.Keyboard.registerShortcut({ key: "p", ctrl: true, shift: true }, (event) => { ... })`
Spicetify.Keyboard.registerShortcut("ctrl+shift+p", (event) => {
    // Do something with the event
    Spicetify.showNotification("Shortcut triggered!");
});
```

### `_deregisterShortcut`

Deregister a global keyboard shortcut.

```ts
function _deregisterShortcut(keys: KeysDefine): void;
```

#### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| keys | [`KeysDefine`](/docs/development/api-wrapper/types/keyboard/keysdefine) | Keyboard shortcut to deregister. |

#### Example

```ts
Spicetify.Keyboard._deregisterShortcut("ctrl+shift+p");
```

### `changeShortcut`

Change a global keyboard shortcut to a new shortcut while keeping the callback.

```ts
function changeShortcut(keys: KeysDefine, newKeys: KeysDefine): void;
```

#### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| keys | [`KeysDefine`](/docs/development/api-wrapper/types/keyboard/keysdefine) | Keyboard shortcut to change. |
| newKeys | [`KeysDefine`](/docs/development/api-wrapper/types/keyboard/keysdefine) | New keyboard shortcut to change to. |

#### Example

```ts
Spicetify.Keyboard.changeShortcut("ctrl+shift+p", "ctrl+shift+o");
```
