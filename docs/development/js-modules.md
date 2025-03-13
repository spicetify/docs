---
title: Javascript NPM Modules
description: 📦 Using NPM Modules for Spicetify.
---

Since v0.9.8, Spicetify injects extension with file extension `.mjs` as a script with type="module" and automatically symlink `node_modules` folder found in user's Extensions folder to `zlink` app.

In Javascript module, Javascript would work just the same as normal script but now you can use `import` to include other Javascript files. [Click here for details](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

Node Package Manager (NPM) is a commandline app bundled with NodeJS. You can use it to download and install hundreds of utility packages to ease your development process. Since Spicetify symlinks `node_modules` to Spotify main app folder, all packages files are mutually linked and available for you to use in your extension. Simply just use `import`:

```js
import './node_modules/package_name/file.js';
```

Careful! Javascript file you import has to be supported by Browser, not NodeJS. In other words, that Javascript should not use `require` function to include other packages or NodeJS API. Whenever you decide to use a package, check its readme page to see if its author already export distributed file as ES6 Module.

### Example

For Japanese studying purpose, I'm developing an extension that shows the Romaji form of Japanese track titles or artist names.

The idea is when I right click at track name and choose Show Romaji:

![img1](https://i.imgur.com/kkSOtwG.png)

Result should show as a notification:

![img2](https://i.imgur.com/LLF5ZGh.png)

To translate Japanese text to Romaji, I use a package named [kuroshiro](https://github.com/hexenq/kuroshiro). Luckily, this package will export distribution files as ES6 Module. This is quite important because package itself relies on other utilities packages too. When it is compiled as an ES6 module, everything is transpiled to Browser supported Javascript and combined in one file. Moreover, kuroshiro also needs [kuroshiro-analyzer-kuromoji](https://github.com/hexenq/kuroshiro-analyzer-kuromoji) package to be usable, which relies on dictionaries gzip files. You can see there is no easy way to utiltise both packages and their external files if we use traditional Javascript extension.

**Following are steps to make and install this extension from scratch:**

1. First, change director to the user's `Extensions` folder:

- **Windows, in Powershell:**

```powershell
cd "$(dirname "$(spicetify -c)")/Extensions"
```

- **Linux and MacOS**, in Bash:

```
cd "$(dirname "$(spicetify -c)")/Extensions"
```

2. Now install needed packages with NPM

```bash
npm install kuroshiro kuroshiro-analyzer-kuromoji
```

Go to user's `Extensions` folder, you can see `node_modules` folder is created and contains all installed packages files. Next, go to the `kuroshiro` and `kuroshiro-analyzer-kuromoji`folder to locate ES6 Module distribution files.

3. After that I can comfortably include both of them in my extension. Following is extension code:

**romaji.mjs**:

```javascript
import './node_modules/kuroshiro/dist/kuroshiro.min.js';
import './node_modules/kuroshiro-analyzer-kuromoji/dist/kuroshiro-analyzer-kuromoji.min.js';

const kuroshiro = new Kuroshiro.default();
kuroshiro.init(new KuromojiAnalyzer());

function converter(input) {
  return kuroshiro.convert(input, {
    to: 'romaji',
    mode: 'spaced',
    romajiSystem: 'passport',
  });
}

const fetchAlbum = async (uri) => {
  const res = await Spicetify.CosmosAsync.get(`hm://album/v1/album-app/album/${uri.split(':')[2]}/desktop`);
  return res.name;
};

const fetchShow = async (uri) => {
  const res = await Spicetify.CosmosAsync.get(
    `sp://core-show/v1/shows/${uri.split(':')[2]}?responseFormat=protobufJson`,
    {
      policy: { list: { index: true } },
    }
  );
  return res.header.showMetadata.name;
};

const fetchArtist = async (uri) => {
  const res = await Spicetify.CosmosAsync.get(`hm://artist/v1/${uri.split(':')[2]}/desktop?format=json`);
  return res.info.name;
};

const fetchTrack = async (uri) => {
  const res = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/tracks/${uri.split(':')[2]}`);
  return res.name;
};

const fetchEpisode = async (uri) => {
  const res = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/episodes/${uri.split(':')[2]}`);
  return res.name;
};

const fetchPlaylist = async (uri) => {
  const res = await Spicetify.CosmosAsync.get(`sp://core-playlist/v1/playlist/${uri}/metadata`, {
    policy: { name: true },
  });
  return res.metadata.name;
};

async function showRomaji([uri]) {
  const type = uri.split(':')[1];
  let name;
  switch (type) {
    case Spicetify.URI.Type.TRACK:
      name = await fetchTrack(uri);
      break;
    case Spicetify.URI.Type.ALBUM:
      name = await fetchAlbum(uri);
      break;
    case Spicetify.URI.Type.ARTIST:
      name = await fetchArtist(uri);
      break;
    case Spicetify.URI.Type.SHOW:
      name = await fetchShow(uri);
      break;
    case Spicetify.URI.Type.EPISODE:
      name = await fetchEpisode(uri);
      break;
    case Spicetify.URI.Type.PLAYLIST:
    case Spicetify.URI.Type.PLAYLIST_V2:
      name = await fetchPlaylist(uri);
      break;
  }
  if (Kuroshiro.default.Util.hasJapanese(name)) {
    name = await converter(name);
    name = name.replace(/(^|\s)\S/g, (t) => t.toUpperCase());
  }
  Spicetify.showNotification(name);
}

new Spicetify.ContextMenu.Item(`Show Romaji`, showRomaji).register();
```

Save this file to `Extensions` folder.

4. Finally, push my extension to Spotify:

```bash
spicetify config extensions romaji.mjs
spicetify apply
```
