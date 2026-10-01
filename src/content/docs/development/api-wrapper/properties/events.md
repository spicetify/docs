---
title: Events
description: One-time events the Spicetify wrapper fires while Spotify starts.
---

`Spicetify.Events` holds two one-time events the wrapper fires while Spotify starts. Use them to wait for an API that the wrapper sets later in startup.

```ts
namespace Events {
  interface Event {
    on(callback: () => void): void;
  }
  const platformLoaded: Event;
  const webpackLoaded: Event;
}
```

| Event | Fires when |
| --- | --- |
| `platformLoaded` | Spotify's webpack modules have loaded, before Spicetify exposes them. |
| `webpackLoaded` | Spicetify has exposed the APIs it extracts from webpack, such as `React`, `ReactComponent`, `URI`, `Locale` and `Color`. |

`on` runs `callback` when the event fires, or right away if it already fired, so a late listener never misses it. An error in one callback is logged and doesn't stop the others.

```ts
Spicetify.Events.webpackLoaded.on(() => {
  console.log(Spicetify.Locale.formatNumber(1234.5));
});
```

In a v3 module, the loader runs `load()` after the wrapper is ready, so you rarely need these. They're for code that runs earlier, such as a mixin.
