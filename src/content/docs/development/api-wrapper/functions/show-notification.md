---
title: showNotification
description: Show a toast notification in Spotify.
---

`Spicetify.showNotification` shows a toast through Spotify's snackbar. In a module, use `client.notify`.

```ts
function showNotification(message: React.ReactNode, isError?: boolean, msTimeout?: number): void;
```

| Parameter | Type | Description |
| --- | --- | --- |
| `message` | `React.ReactNode` | The message. A string renders as plain text. |
| `isError` | `boolean` &#124; `undefined` | Shows the error style when `true`. Defaults to `false`. |
| `msTimeout` | `number` &#124; `undefined` | How long the toast stays, in milliseconds. Defaults to Spotify's duration. |

```ts
Spicetify.showNotification('Playlist saved');
Spicetify.showNotification('Could not reach the lyrics provider', true, 5000);
```
