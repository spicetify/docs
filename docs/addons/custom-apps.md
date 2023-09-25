---
title: Custom Apps
description: 💥 Custom Apps for Spicetify.
---

Below are list of default custom apps that come with the distributed package:

- [Reddit](#reddit)
- [New Releases](#new-releases)
- [Lyrics Plus](#lyrics-plus)

### Reddit

Fetching posts from any Spotify link sharing subreddit. You can add, remove, arrange subreddits and customize post visual in config menu (in Profile menu, top right button with your user name).

![Reddit](https://i.imgur.com/MC3tpNZ.png)

To install, run following commands:

```
spicetify config custom_apps reddit
spicetify apply
```

### New Releases

Aggregate all new releases from favorite artists, podcasts. Time range, release type, and other filters can be customized in config menu (in Profile menu, top right button with your user name). Date format is based on your locale code (BCP47).

![New Releases](https://i.imgur.com/MP9dTjt.png)

To install, run following commands:

```
spicetify config custom_apps new-releases
spicetify apply
```

### Lyrics Plus

Get access to the current track's lyrics from various lyrics providers (Musixmatch, Netease, Genius). Learn more [here](https://github.com/spicetify/spicetify-cli/tree/master/CustomApps/lyrics-plus).

Colors, lyrics providers can be customized in config menu (in Profile menu, top right button with your user name).

![Lyrics Plus](https://i.imgur.com/WtD080A.png)

To install, run following commands:

```
spicetify config custom_apps lyrics-plus
spicetify apply
```
