---
title: Type
description: Type of a URI.
---

Type of a URI.

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

```ts
class URI {
    static Type: {
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
        /** URI particle; not an actual URI. */
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
};
```
