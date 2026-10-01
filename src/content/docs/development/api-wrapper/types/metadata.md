---
title: Metadata
description: The string metadata Spotify attaches to tracks and contexts.
---

`Metadata` is a map of string values. Spotify chooses the keys, and every value is a string, including numbers and booleans.

```ts
type Metadata = Partial<Record<string, string>>;
```

Track metadata often includes these keys:

- `title`, `artist_name`, `artist_uri`, `album_title`, `album_uri` and `album_artist_name` name the track and where it comes from.
- `duration`, `album_track_number`, `album_disc_number` and `popularity` hold numbers as strings.
- `image_url`, `image_small_url`, `image_large_url` and `image_xlarge_url` point to the artwork in different sizes.
- `collection.in_collection`, `collection.can_add` and `has_lyrics` hold `"true"` or `"false"`.
- Keys that start with `canvas.` describe the track's Canvas video, when it has one.

```ts
const liked = Spicetify.Player.data?.item.metadata['collection.in_collection'] === 'true';
```
