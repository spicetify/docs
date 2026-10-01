---
title: LocalStorage
description: Read and write string values in localStorage.
---

`Spicetify.LocalStorage` calls `window.localStorage` with the key you pass, so values are shared across Spotify accounts. For values stored per account, use [`Platform.LocalStorageAPI`](/docs/development/api-wrapper/methods/platform#localstorageapi). In a module, use `client.storage`, or stdlib's storage helpers.

```ts
namespace LocalStorage {
  function get(key: string): string | null;
  function set(key: string, value: string): void;
  function remove(key: string): void;
  function clear(): void;
}
```

`get` returns `null` for a missing key. `set` stores the value as a string.

:::caution
`clear` empties all of `localStorage`, including Spotify's settings and the data of every installed module.
:::

```ts
Spicetify.LocalStorage.set('my-module:theme', 'dark');
Spicetify.LocalStorage.get('my-module:theme'); // "dark"
Spicetify.LocalStorage.remove('my-module:theme');
```
