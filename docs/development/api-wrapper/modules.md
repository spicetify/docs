---
title: Modules
description: 🧩 Modules exposed via Spicetify object.
---

Spicetify exposes some modules via `Spicetify` object.

You can access them by typing `Spicetify.<module name>` in the DevTools console, inside your extension, or `window.top.Spicetify.<module name>` if you're developing an app inside an `iframe`.

Utilizing these modules can help you create more powerful extensions without having to include the whole module in your extension.

```js
Spicetify.React;
```

For usage of these modules, please refer to their official documentation.

### React

[React](https://reactjs.org/) is a JavaScript library for building user interfaces. It is used by Spotify to build their UI.

:::note

Spotify versions *below* 1.2.26 use version **17.0.2**, *after* - **18.2.0**.

:::

```js
Spicetify.React;
```

### ReactDOM

[ReactDOM](https://reactjs.org/docs/react-dom.html) is a package that provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside of the React model if you need to. It is used by Spotify to render React components to the DOM.

```js
Spicetify.ReactDOM;
```

### Tippy.js

[Tippy.js](https://atomiks.github.io/tippyjs/) is a highly customizable tooltip and popover library powered by Popper.

```js
Spicetify.Tippy;
```

### Mousetrap

[Mousetrap](https://craig.is/killing/mice) is a simple library for handling keyboard shortcuts in JavaScript.

```js
Spicetify.Mousetrap;
```

### React Flip Toolkit

[React Flip Toolkit](https://github.com/aholachek/react-flip-toolkit) is a collection of easy-to-use animation effects and utilities that can be used to enhance your React project.

```js
Spicetify.ReactFlipToolkit;
```

### React Query (v3)

[React Query](https://react-query.tanstack.com/) is a library for managing, caching, syncing, and refetching server state in React.

:::note

Spotify uses React Query v3, instead of the current latest version (v4). As such, the API may be different from the official documentation.

:::

```js
Spicetify.ReactQuery;
```

### classnames

[classnames](https://github.com/JedWatson/classnames) is a simple JavaScript utility for conditionally joining class names together.

```js
Spicetify.classnames;
```

### Snackbar

[Notistack](https://github.com/iamhosseindhv/notistack) is a JavaScript library for creating highly customizable notification snackbars (toasts) that can be stacked on top of each other.

:::note

Be aware that only `SnackbarProvider` and `useSnackbar` work as described in the official Notistack documentation.

:::

```js
Spicetify.Snackbar;
```
