---
title: LocalStorage
description: Get and set data in local storage.
---

Spicetify provides a wrapper for `localStorage` to make it easier to use.

```ts
namespace LocalStorage {
    /**
     * Empties the list associated with the object of all key/value pairs, if there are any.
     */
    function clear(): void;
    /**
     * Get key value
     */
    function get(key: string): string | null;
    /**
     * Delete key
     */
    function remove(key: string): void;
    /**
     * Set new value for key
     */
    function set(key: string, value: string): void;
};
```

## Methods

### `clear`

Empties the list associated with the object of all key/value pairs, if there are any.

:::warning

This method will remove all data in local storage, not just the data that Spicetify uses. This essentially resets the client to its default state.

:::

```ts
clear(): void
```

### `get`

Get key value from local storage.

```ts
get(key: string): string | null
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| key | `string` | Key to get value from. |

#### Example

```ts
const value = Spicetify.LocalStorage.get("foo");
```

### `remove`

Delete key from local storage.

```ts
remove(key: string): void
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| key | `string` | Key to delete. |

#### Example

```ts
Spicetify.LocalStorage.remove("foo");
```

### `set`

Set new value for key in local storage.

```ts
set(key: string, value: string): void
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| key | `string` | Key to set value for. |
| value | `string` | Value to set. |

#### Example

```ts
Spicetify.LocalStorage.set("foo", "bar");
```