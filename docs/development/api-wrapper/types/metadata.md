---
title: Metadata
description: Type of metadata object.
---

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

```ts
type Metadata = Partial<Record<string, string>>;
```

An example of metadata object, **not** a type definition, may not include all properties.

```ts
type Metadata = {
    actions.skipping_next_past_track: string;
    actions.skipping_prev_past_track: string;
    added_at: `${bigint}`;
    album_artist_name: string;
    album_disc_count: `${number}`;
    album_disc_number: `${number}`;
    album_title: string;
    album_track_count: `${number}`;
    album_track_number: `${number}`;
    album_uri: string;
    artist_name: string;
    artist_uri: string;
    // URL
    canvas.artist.avatar: string;
    canvas.artist.name: string;
    canvas.artist.uri: string;
    canvas.canvasUri: string;
    canvas.entityUri: string;
    canvas.explicit: "true" | "false";
    canvas.fileId: string;
    canvas.id: string;
    canvas.type: string;
    canvas.uploadedBy: string;
    // URL
    canvas.url: string;
    collection.can_add: "true" | "false";
    collection.can_ban: "true" | "false";
    collection.in_collection: "true" | "false";
    collection.is_banned: "true" | "false";
    context_uri: string;
    duration: `${bigint}`;
    entity_uri: string;
    has_lyrics: "true" | "false";
    // Internal URL paths, not URLs
    image_large_url: string;
    image_small_url: string;
    image_url: string;
    image_xlarge_url: string;
    interaction_id: string;
    iteration: `${number}`;
    marked_for_download:  "true" | "false";
    page_instance_id: string;
    popularity: `${number}`;
    title: string;
    track_player: string;
}
```
