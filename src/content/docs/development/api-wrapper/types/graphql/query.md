---
title: Query
description: List of GraphQL definitions used by Spotify.
---

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

```ts
type Query = "decorateItemsForEnhance" |
    "imageURLAndSize" |
    "imageSources" |
    "audioItems" |
    "creator" |
    "extractedColors" |
    "extractedColorsAndImageSources" |
    "fetchExtractedColorAndImageForAlbumEntity" |
    "fetchExtractedColorAndImageForArtistEntity" |
    "fetchExtractedColorAndImageForEpisodeEntity" |
    "fetchExtractedColorAndImageForPlaylistEntity" |
    "fetchExtractedColorAndImageForPodcastEntity" |
    "fetchExtractedColorAndImageForTrackEntity" |
    "fetchExtractedColorForAlbumEntity" |
    "fetchExtractedColorForArtistEntity" |
    "fetchExtractedColorForEpisodeEntity" |
    "fetchExtractedColorForPlaylistEntity" |
    "fetchExtractedColorForPodcastEntity" |
    "fetchExtractedColorForTrackEntity" |
    "getAlbumNameAndTracks" |
    "getEpisodeName" |
    "getTrackName" |
    "queryAlbumTrackUris" |
    "queryTrackArtists" |
    "decorateContextEpisodesOrChapters" |
    "decorateContextTracks" |
    "fetchTracksForRadioStation" |
    "decoratePlaylists" |
    "playlistUser" |
    "FetchPlaylistMetadata" |
    "playlistContentsItemTrackArtist" |
    "playlistContentsItemTrackAlbum" |
    "playlistContentsItemTrack" |
    "playlistContentsItemLocalTrack" |
    "playlistContentsItemEpisodeShow" |
    "playlistContentsItemEpisode" |
    "playlistContentsItemResponse" |
    "playlistContentsItem" |
    "FetchPlaylistContents" |
    "episodeTrailerUri" |
    "podcastEpisode" |
    "podcastMetadataV2" |
    "minimalAudiobook" |
    "audiobookChapter" |
    "audiobookMetadataV2" |
    "fetchExtractedColors" |
    "queryFullscreenMode" |
    "queryNpvEpisode" |
    "queryNpvArtist" |
    "albumTrack" |
    "getAlbum" |
    "queryAlbumTracks" |
    "queryArtistOverview" |
    "queryArtistAppearsOn" |
    "discographyAlbum" |
    "albumMetadataReleases" |
    "albumMetadata" |
    "queryArtistDiscographyAlbums" |
    "queryArtistDiscographySingles" |
    "queryArtistDiscographyCompilations" |
    "queryArtistDiscographyAll" |
    "queryArtistDiscographyOverview" |
    "artistPlaylist" |
    "queryArtistPlaylists" |
    "queryArtistDiscoveredOn" |
    "queryArtistFeaturing" |
    "queryArtistRelated" |
    "queryArtistMinimal" |
    "searchModalResults" |
    "queryWhatsNewFeed" |
    "whatsNewFeedNewItems" |
    "SetItemsStateInWhatsNewFeed" |
    "browseImageURLAndSize" |
    "browseImageSources" |
    "browseAlbum" |
    "browseArtist" |
    "browseEpisode" |
    "browseChapter" |
    "browsePlaylist" |
    "browsePodcast" |
    "browseAudiobook" |
    "browseTrack" |
    "browseUser" |
    "browseMerch" |
    "browseArtistConcerts" |
    "browseContent" |
    "browseSectionContainer" |
    "browseClientFeature" |
    "browseItem" |
    "browseAll" |
    "browsePage";
```