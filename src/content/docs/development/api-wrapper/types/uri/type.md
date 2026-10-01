---
title: Type
description: The URI types in Spicetify.URI.Type.
---

`Spicetify.URI.Type` maps each URI type name to the value of `URI.type`. The wrapper reads it from the client, so the set can change between Spotify versions. Check `Object.keys(Spicetify.URI.Type)` in DevTools for the current list.

```ts
const Type: {
  AD: string;
  ALBUM: string;
  GENRE: string;
  QUEUE: string;
  APPLICATION: string;
  ARTIST: string;
  ARTIST_TOPLIST: string;
  ARTIST_CONCERTS: string;
  AUDIO_FILE: string;
  COLLECTION: string;
  COLLECTION_ALBUM: string;
  COLLECTION_ARTIST: string;
  COLLECTION_MISSING_ALBUM: string;
  COLLECTION_TRACK_LIST: string;
  CONCERT: string;
  CONTEXT_GROUP: string;
  DAILY_MIX: string;
  EMPTY: string;
  EPISODE: string;
  FACEBOOK: string;
  FOLDER: string;
  FOLLOWERS: string;
  FOLLOWING: string;
  IMAGE: string;
  INBOX: string;
  INTERRUPTION: string;
  LIBRARY: string;
  LIVE: string;
  ROOM: string;
  EXPRESSION: string;
  LOCAL: string;
  LOCAL_TRACK: string;
  LOCAL_ALBUM: string;
  LOCAL_ARTIST: string;
  MERCH: string;
  MOSAIC: string;
  PLAYLIST: string;
  PLAYLIST_V2: string;
  PRERELEASE: string;
  PROFILE: string;
  PUBLISHED_ROOTLIST: string;
  RADIO: string;
  ROOTLIST: string;
  SEARCH: string;
  SHOW: string;
  SOCIAL_SESSION: string;
  SPECIAL: string;
  STARRED: string;
  STATION: string;
  TEMP_PLAYLIST: string;
  TOPLIST: string;
  TRACK: string;
  TRACKSET: string;
  USER_TOPLIST: string;
  USER_TOP_TRACKS: string;
  UNKNOWN: string;
  MEDIA: string;
  QUESTION: string;
  POLL: string;
};
```

`FACEBOOK` is a URI fragment, not a full URI type.
