---
title: showNotification
description: Show a toast notification inside Spotify.
---

Show a toast notification inside Spotify.

```ts
function showNotification(text: string, isError?: boolean, msTimeout?: number): void;
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| text | `string` | Message to display. Can use inline HTML for styling. |
| isError | `boolean` | If true, toast will be red. Defaults to false. |
| msTimeout | `number` | Time in milliseconds to display the toast. Defaults to Spotify's value. |

#### Example

```ts
// Display a notification
Spicetify.showNotification("My Menu Item clicked!");

// Display a notification with a custom timeout
Spicetify.showNotification("My Menu Item clicked!", false, 1000);

// Display an error notification
Spicetify.showNotification("Something wrong happened", true);

// Display a bolded error notification
Spicetify.showNotification("<b>Something wrong happened</b>", true);
```
