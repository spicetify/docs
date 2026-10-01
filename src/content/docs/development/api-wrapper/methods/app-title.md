---
title: AppTitle
description: Read and override the default title of the Spotify window.
---

`Spicetify.AppTitle` reads and overrides the default window title, which Spotify shows when no track is playing.

```ts
interface Subscription {
  cancel(): void;
}

namespace AppTitle {
  function set(title: string): Promise<Subscription>;
  function get(): Promise<string>;
  function reset(): Promise<void>;
  function sub(callback: (title: string) => void): Subscription;
}
```

- `set` overrides the default title and keeps reapplying it until you call `reset` or `cancel` on the subscription it returns. Each call replaces the previous override. A playing track still shows its own title.
- `get` returns the default title, not the title of the playing track.
- `reset` stops the override and restores Spotify's default title.
- `sub` calls `callback` when the default title changes. Call `cancel` on the result to stop.

```ts
const override = await Spicetify.AppTitle.set('Focus mode');
override.cancel();
await Spicetify.AppTitle.reset();
```
