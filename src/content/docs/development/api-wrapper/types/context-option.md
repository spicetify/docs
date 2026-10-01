---
title: ContextOption
description: Playback options for a context in Spotify's player.
---

`ContextOption` describes how Spotify's player starts a context. Spotify defines it, and its fields can change. Neither the v3 wrapper nor its type declarations use it.

```ts
type ContextOption = {
  contextURI?: string;
  index?: number;
  trackUri?: string;
  page?: number;
  trackUid?: string;
  sortedBy?: string;
  filteredBy?: string;
  shuffleContext?: boolean;
  repeatContext?: boolean;
  repeatTrack?: boolean;
  offset?: number;
  next_page_url?: string;
  restrictions?: Record<string, string[]>;
  referrer?: string;
};
```
