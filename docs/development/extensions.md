---
title: Extensions
description: Creating extensions for Spicetify.
---

Extensions are JavaScript files that run alongside Spotify's main code. They can add UI elements, modify behavior, integrate with external services, and more.

## Extension Structure

```
~/.config/spicetify/Extensions/   # Linux/macOS
%appdata%\spicetify\Extensions\   # Windows
├── myExtension.js
├── anotherExtension.js
└── ...
```

Extensions are single JavaScript files. For complex extensions with multiple files, use [Spicetify Creator](/docs/development/spicetify-creator).

## Getting Started

### Location

Place your extension file in the Extensions folder:

| Platform | Path |
|----------|------|
| **Windows** | `%appdata%\spicetify\Extensions\` |
| **Linux / macOS** | `~/.config/spicetify/Extensions/` |

### Minimal Extension

```js
// myExtension.js
(function myExtension() {
    // Wait for Spicetify to be ready
    if (!Spicetify.Player || !Spicetify.Platform) {
        setTimeout(myExtension, 100);
        return;
    }

    console.log("My extension loaded!");

    // Your code here
})();
```

### Testing Your Extension

1. Save your file to the Extensions folder
2. Enable it:

   ```bash
   spicetify config extensions myExtension.js
   spicetify apply
   ```

3. Open DevTools in Spotify (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>) to see console output

---

## The Spicetify API

Extensions access Spotify through the global `Spicetify` object. Key namespaces:

| Namespace | Purpose |
|-----------|---------|
| `Spicetify.Player` | Playback control (play, pause, skip, volume) |
| `Spicetify.Platform` | Core platform APIs (history, library, playlists) |
| `Spicetify.CosmosAsync` | HTTP requests to Spotify's internal API |
| `Spicetify.URI` | Parse and create Spotify URIs |
| `Spicetify.React` | React instance for UI components |
| `Spicetify.ReactDOM` | ReactDOM for rendering |
| `Spicetify.Topbar` | Add buttons to the top bar |
| `Spicetify.Playbar` | Add buttons to the player bar |
| `Spicetify.ContextMenu` | Add items to right-click menus |

See the **[API Wrapper Reference](/docs/development/api-wrapper)** for complete documentation.

---

## Common Patterns

### Waiting for Spicetify

Always wait for Spicetify to be ready before accessing its APIs:

```js
(function init() {
    if (!Spicetify.Player || !Spicetify.Platform) {
        setTimeout(init, 100);
        return;
    }

    main();
})();

function main() {
    // Safe to use Spicetify here
}
```

### Adding a Top Bar Button

```js
const button = new Spicetify.Topbar.Button(
    "My Button",
    `<svg>...</svg>`,  // SVG icon
    () => {
        console.log("Button clicked!");
    }
);
```

### Adding a Context Menu Item

```js
new Spicetify.ContextMenu.Item(
    "My Menu Item",
    (uris) => {
        console.log("Selected URIs:", uris);
    },
    (uris) => {
        // Return true to show this item
        return true;
    },
    `<svg>...</svg>`  // Optional icon
).register();
```

### Listening to Player Events

```js
Spicetify.Player.addEventListener("songchange", (event) => {
    const track = Spicetify.Player.data?.item;
    console.log("Now playing:", track?.name);
});
```

### Making API Requests

```js
// GET request
const response = await Spicetify.CosmosAsync.get(
    "https://api.spotify.com/v1/me/player"
);

// POST request
await Spicetify.CosmosAsync.post(
    "https://api.spotify.com/v1/me/player/play",
    { uris: ["spotify:track:..."] }
);
```

### Storing Data

```js
// Save
Spicetify.LocalStorage.set("myExtension:setting", "value");

// Load
const value = Spicetify.LocalStorage.get("myExtension:setting");
```

### Showing Notifications

```js
Spicetify.showNotification("Hello from my extension!");
```

---

## UI Development

### Using React

Spicetify exposes React for building UI:

```js
const { React, ReactDOM } = Spicetify;
const { useState, useEffect } = React;

function MyComponent() {
    const [count, setCount] = useState(0);

    return React.createElement("button", {
        onClick: () => setCount(c => c + 1)
    }, `Clicked ${count} times`);
}
```

### Using Spotify's Components

Access Spotify's internal React components:

```js
const { Button, Toggle } = Spicetify.ReactComponent;

// Use in your components
React.createElement(Button, {
    onClick: () => console.log("clicked")
}, "Click me");
```

### Creating Modals

```js
Spicetify.PopupModal.display({
    title: "My Modal",
    content: React.createElement("div", null, "Hello!"),
});
```

---

## Spicetify Creator

For a better development experience with TypeScript, JSX, and hot reloading, use **[Spicetify Creator](/docs/development/spicetify-creator)**.

```bash
npx spicetify-creator
```

Benefits:
- TypeScript support with full type definitions
- JSX syntax (no manual `React.createElement`)
- Hot reloading during development
- Build tooling (bundling, minification)

---

## Best Practices

### Performance

- Avoid polling. Use event listeners when possible
- Debounce expensive operations
- Clean up listeners when no longer needed

### Error Handling

```js
try {
    const data = await Spicetify.CosmosAsync.get("...");
} catch (error) {
    console.error("Request failed:", error);
    Spicetify.showNotification("Something went wrong", true);
}
```

### Compatibility

- Test with both light and dark themes
- Check for API existence before using (APIs can change between Spotify versions)
- Use feature detection:

```js
if (Spicetify.Topbar?.Button) {
    // Safe to use
}
```

### Naming

- Use a unique prefix for localStorage keys: `myExtension:key`
- Use descriptive function and variable names

---

## Publishing

To share your extension:

1. **GitHub**: Create a repository with your extension file(s) and installation instructions

2. **Marketplace**: Submit to the [Spicetify Marketplace](https://github.com/spicetify/marketplace) for easy discovery and installation

---

## Resources

- **[API Wrapper Reference](/docs/development/api-wrapper)**: Complete API documentation
- **[Spicetify Creator](/docs/development/spicetify-creator)**: TypeScript development tool
- **[Built-in Extensions](https://github.com/spicetify/cli/tree/main/Extensions)**: Reference implementations
- **[Marketplace Extensions](https://github.com/spicetify/marketplace)**: Community examples
