---
title: Query
description: A historical list of GraphQL operation names from Spotify.
---

`Query` lists GraphQL operation names that Spotify has used. It is a historical list, so an operation on it may be missing from your client, and your client may have operations it does not list. To see what the running client offers, read `Object.keys(Spicetify.GraphQL.Definitions)` and check each definition before you request it. See [GraphQL](/docs/development/api-wrapper/methods/graphql).

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
