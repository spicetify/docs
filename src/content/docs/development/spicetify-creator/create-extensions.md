---
title: Create Extensions
description: 🔨 Creating small addons for Spicetify.
---

Notes:

- This tutorial assumes you have chosen to generate an example using Create Spicetify App.

After creating a new Spicetify Creator project and choosing "Extension" as your app's type, your project's structure should look like this (With the generated example):

```
my-app/
  .gitattributes
  .gitignore
  package.json
  README.md
  tsconfig.json
  yarn.lock
  src/
    ...
  node_modules/
    ...
```

For now, we only care about the `src/` folder, whose structure looks like this

```
src/
  app.tsx
  settings.json
  types/
    ...
```

`app.tsx` exports a function that will be executed every time Spotify starts up.
It comes with an example that says "Hello!" to the user when Spotify starts up.  
`settings.json` is a simple JSON file containing 1 key:

```json
{
  "nameId": "my-app" // The id of your app
}
```
