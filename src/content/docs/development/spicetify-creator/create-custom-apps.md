---
title: Create Custom Apps
description: 🔧 Creating single-page apps for Spicetify.
---

Notes:

- It is recommended to learn React before starting to create Custom Apps.
- This tutorial assumes you have chosen to generate an example using Create Spicetify App.

After creating a new Spicetify Creator project and choosing "Custom App" as your app's type, your project's structure should look like this (With the generated example):

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
  extensions/
    extension.tsx
  css/
    icon.svg
    app.module.scss
  types/
    ...
```

`app.tsx` exports a React Component that will be mounted to Spotify every time the user enters your custom app.
It comes with an example of a simple counter using React's logic, and usages for SCSS modules.  
`settings.json` is a simple JSON file containing 4 keys:

```json
{
  "displayName": "My App", // The name of your app in the left sidebar
  "nameId": "my-app", // The id of your app
  "icon": "css/icon.svg", // The icon that will be displayed in the sidebar
  "activeIcon": "css/icon.svg" // The icon that will be displayed upon selecting the app in the sidebar.
}
```

The `extensions/` folder takes all the files inside it and transforms them into extensions that will run on Spotify's startup.  
The `extensions/extension.tsx` file is an example that says "Welcome!" whenever Spotify starts.

<details>
<summary>extension.tsx's content</summary>

```ts
(async () => {
  while (!Spicetify?.showNotification) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Show message on start.
  Spicetify.showNotification('Welcome!');
})();
```

</details>
