---
title: Validation functions
description: The type check functions on Spicetify.URI.
---

The wrapper adds one check to `Spicetify.URI` for each key of [`URI.Type`](/docs/development/api-wrapper/types/uri/type), named `is` followed by the key in camel case. Each returns `true` when the argument parses to a URI of that type. `isPlaylistV1OrV2` is true for both playlist types.

```ts
class URI {
  static isAd(uri: URI | string): boolean;
  static isAlbum(uri: URI | string): boolean;
  static isGenre(uri: URI | string): boolean;
  static isQueue(uri: URI | string): boolean;
  static isApplication(uri: URI | string): boolean;
  static isArtist(uri: URI | string): boolean;
  static isArtistToplist(uri: URI | string): boolean;
  static isArtistConcerts(uri: URI | string): boolean;
  static isAudioFile(uri: URI | string): boolean;
  static isCollection(uri: URI | string): boolean;
  static isCollectionAlbum(uri: URI | string): boolean;
  static isCollectionArtist(uri: URI | string): boolean;
  static isCollectionMissingAlbum(uri: URI | string): boolean;
  static isCollectionTrackList(uri: URI | string): boolean;
  static isConcert(uri: URI | string): boolean;
  static isContextGroup(uri: URI | string): boolean;
  static isDailyMix(uri: URI | string): boolean;
  static isEmpty(uri: URI | string): boolean;
  static isEpisode(uri: URI | string): boolean;
  static isFacebook(uri: URI | string): boolean;
  static isFolder(uri: URI | string): boolean;
  static isFollowers(uri: URI | string): boolean;
  static isFollowing(uri: URI | string): boolean;
  static isImage(uri: URI | string): boolean;
  static isInbox(uri: URI | string): boolean;
  static isInterruption(uri: URI | string): boolean;
  static isLibrary(uri: URI | string): boolean;
  static isLive(uri: URI | string): boolean;
  static isRoom(uri: URI | string): boolean;
  static isExpression(uri: URI | string): boolean;
  static isLocal(uri: URI | string): boolean;
  static isLocalTrack(uri: URI | string): boolean;
  static isLocalAlbum(uri: URI | string): boolean;
  static isLocalArtist(uri: URI | string): boolean;
  static isMerch(uri: URI | string): boolean;
  static isMosaic(uri: URI | string): boolean;
  static isPlaylist(uri: URI | string): boolean;
  static isPlaylistV2(uri: URI | string): boolean;
  static isPrerelease(uri: URI | string): boolean;
  static isProfile(uri: URI | string): boolean;
  static isPublishedRootlist(uri: URI | string): boolean;
  static isRadio(uri: URI | string): boolean;
  static isRootlist(uri: URI | string): boolean;
  static isSearch(uri: URI | string): boolean;
  static isShow(uri: URI | string): boolean;
  static isSocialSession(uri: URI | string): boolean;
  static isSpecial(uri: URI | string): boolean;
  static isStarred(uri: URI | string): boolean;
  static isStation(uri: URI | string): boolean;
  static isTempPlaylist(uri: URI | string): boolean;
  static isToplist(uri: URI | string): boolean;
  static isTrack(uri: URI | string): boolean;
  static isTrackset(uri: URI | string): boolean;
  static isUserToplist(uri: URI | string): boolean;
  static isUserTopTracks(uri: URI | string): boolean;
  static isUnknown(uri: URI | string): boolean;
  static isMedia(uri: URI | string): boolean;
  static isQuestion(uri: URI | string): boolean;
  static isPoll(uri: URI | string): boolean;
  static isPlaylistV1OrV2(uri: URI | string): boolean;
}
```

```ts
Spicetify.URI.isPlaylistV1OrV2('spotify:playlist:37i9dQZF1DXcBWIGoYBM5M'); // true
```
