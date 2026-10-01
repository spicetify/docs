---
title: Porting a v2 extension to v3
description: Move a classic Spicetify extension into the v3 module lifecycle.
sidebar_position: 3
---

Most of a v2 extension's API calls carry over. stdlib's `client` object returns the same wrapper objects as `Spicetify`, so player, platform, URI, storage, notification, and context-menu calls work once you replace `Spicetify.` with `client.`. For a new module, start with [Building a module](/docs/development/building-a-module) instead.

If the port needs polling, copied class hashes, DOM surgery, monkey-patching, or private webpack searches, [open an issue](https://github.com/spicetify/cli/issues) with the use case, the v2 API you're replacing, and your smallest workaround. Meanwhile, keep the workaround bounded, feature-detected, and removed on unload.

## 1. List what the extension owns

A v3 module can load and unload several times in one Spotify session, so anything it leaves behind duplicates buttons, listeners, and behavior. Before you move code, list what the extension creates or touches, as your teardown checklist:

- Timers, `setTimeout` readiness loops, and `MutationObserver`, `ResizeObserver`, and `IntersectionObserver` instances.
- Player, history, keyboard, document, and window listeners.
- Top-bar, playbar, menu, context-menu, modal, and panel UI.
- DOM nodes, React roots, tooltips, and `<style>` elements it creates.
- Spotify class names copied from DevTools.
- Webpack lookups, source patches, and direct access to internal modules.
- `localStorage` keys and other saved data.

## 2. Scaffold the module

Create the module next to the old source:

```bash
npm create spicetify-module my-extension -- --template extension
cd my-extension
npm install
npm run dev
```

`npm run dev` replaces `spicetify config extensions` and `spicetify apply`, and pushes each save into the running client. The id must be kebab-case, because it's also the store id and folder name. [Scaffold a project](/docs/development/building-a-module#scaffold-a-project) describes the generated files.

## 3. Replace the readiness loop

A typical v2 extension starts itself and retries until the wrapper is ready:

```js
(function start() {
  if (!Spicetify.Player || !Spicetify.Platform) {
    setTimeout(start, 100);
    return;
  }

  const onSongChange = () => console.log(Spicetify.Player.data?.item?.name);
  Spicetify.Player.addEventListener('songchange', onSongChange);
})();
```

The loader calls the module's `load` export after the client API is ready, so the loop goes away. Move the extension body into the default export of `mod.tsx` and register its cleanup:

```ts
import { client, type ModuleRuntimeContext } from '/modules/stdlib/mod.ts';

export default async function (ctx: ModuleRuntimeContext) {
  const onSongChange = () => {
    console.log(client.player.data?.item?.name);
  };

  client.player.addEventListener('songchange', onSongChange);
  ctx.defer(() => {
    client.player.removeEventListener('songchange', onSongChange);
  });
}
```

Don't replace the loop with an unbounded `await`, because it blocks every later module (see [Write the entry point](/docs/development/building-a-module#write-the-entry-point)).

## 4. Make every side effect reversible

Register a disposer right after you create something:

```ts
export default async function (ctx: ModuleRuntimeContext) {
  const interval = window.setInterval(refresh, 5_000);
  ctx.defer(() => window.clearInterval(interval));

  const observer = new MutationObserver(refresh);
  observer.observe(document.body, { childList: true, subtree: true });
  ctx.defer(() => observer.disconnect());
}
```

v2 helpers you keep using need the same treatment. After `item.register()` on a `client.contextMenu.Item`, call `ctx.defer(() => item.deregister())`. If an API returns its own cleanup function, pass it to `ctx.defer`. For DOM or React UI you mount yourself, unmount the root and remove the host element there too.

## 5. Move UI onto the registrar

Create one registrar with `createRegistrar(ctx)`. Everything you register through it is removed when the module unloads. Replace each v2 UI call with its v3 counterpart:

| v2 | v3 |
| --- | --- |
| `new Spicetify.Topbar.Button(...)` | `registrar.placeButton('topbar-left' \| 'topbar-right', …)` |
| `new Spicetify.Playbar.Button(...)` | `registrar.placeButton('playbar', …)`, or a `playbarButton` component when its state changes |
| `new Spicetify.Playbar.Widget(...)` | The `playbarWidget` register |
| A settings item in the profile menu | `settingsRow` or `settingsSection` on the Spicetify Settings page |
| Another profile-menu action | The `menu` register with the `MenuItem` component |
| A custom app page | `navlink` plus `registerRoute()` |
| `Spicetify.Panel` (not in v3) | `registrar.registerPanel()` |
| A popup or overlay on `body` | `displayModal()`, or the `rootChild` register |
| A track context-menu action | `client.contextMenu.Item`, deregistered on unload |

stdlib keeps the v2 `Topbar.Button` and `Playbar.Button` constructors working so an unported extension still runs, but a module uses the registrar. [Add UI](/docs/development/building-a-module#add-ui) has examples for the other registers.

## 6. Use React from stdlib

Import React from `/modules/stdlib/mod.ts` instead of bundling it. Keep the old component bodies, but replace `Spicetify.ReactComponent` internals with [stdlib components](/docs/development/building-a-module#other-ui). The [API reference](/docs/development/api-wrapper) marks wrapper members that are missing or reduced in v3.

## 7. Replace hashed class names

The extension's class names fall into three groups:

1. Classes you own, such as `.my-extension-card`. Keep them.
2. A Spotify class your TS or TSX applies. Use a stdlib component that applies it for you, or a `MAP.*` path such as `MAP.main.playbar.buttons.button.wrapper`.
3. CSS that targets Spotify's DOM. Use a stable `main-*` selector from the css-map when one exists.

Never copy a generated value such as `sXjzYBob5Y4psogB` into the module, because it stops matching after a Spotify update. Direct `MAP.*` use needs a `stdlibBoundary` exception (see [Reference Spotify class names](/docs/development/building-a-module#reference-spotify-class-names)). If the path or selector you need doesn't exist, ask for a classmap or css-map addition in an issue.

## 8. Move injected CSS into the CSS entry

Delete the code that appends a `<style>` element and move its rules to `index.scss`. The build emits `index.css`, and the loader adopts it before `load` and removes it on unload. Add `"css": "index.css"` to `entries` in `metadata.json`, because the extension template ships without CSS.

Scope every rule under a class or data attribute you own, and use `--spice-*` variables such as `var(--spice-text)` so the rules follow the active theme. Test with at least one light theme and one dark theme.

## 9. Rethink webpack lookups and source patches

Code that reaches into Spotify's internals needs more than a rename:

- Use a typed stdlib export instead of scanning webpack yourself.
- When an optional export is missing, disable that one feature instead of throwing when the module loads.
- Don't destructure a lookup result at the top level of a file. When the lookup drifts, the whole file fails.
- v3 doesn't apply source transforms by default, so rebuild a feature that rewrote Spotify's bundle on a wrapper or stdlib API, or let it degrade until one exists.
- `client.graphQL.Definitions` lists the operations found in the running client. Check that an operation exists before you call it, because v2 operation names and hashes can be gone. See [GraphQL](/docs/development/api-wrapper/methods/graphql) for the CLI version this needs.

## 10. Keep saved data and split out logic

Keep the old storage keys so users keep their settings. `client.storage` behaves like `Spicetify.LocalStorage`, as in `client.storage.get('my-extension:settings')`. `createStorage(ctx)` from stdlib namespaces keys per module, which suits new data, but switching to it means migrating the old keys yourself.

Move parsing, filtering, state transitions, and formatting into named exports in `logic.ts`, and keep browser, React, and `client` access in `mod.tsx`, so tests can import the logic without a client. Declare every module you import at runtime in [`dependencies`](/docs/development/building-a-module#declare-dependencies).

## 11. Test by unloading

With `npm run dev` running, go through the full lifecycle:

1. Use every button, menu item, setting, route, and listener.
2. Disable the module from the Module Store's Installed tab, or run `Spicetify.Modules.disable('my-extension')` in DevTools.
3. Check that its UI, styles, listeners, observers, timers, and overlays are gone.
4. Enable it again and check that there's exactly one of everything.
5. Navigate away from its routes and back.
6. Restart Spotify and check that saved settings load.

Then run `npm run check` and `npm test`. `Spicetify.Modules.report` in DevTools lists the modules that loaded and the reason each failed module failed.

## 12. Package and publish

[Build and sideload](/docs/development/building-a-module#build-and-sideload) the zip users will install. Then add `preview`, `repository`, and `license` to `metadata.json`, and [publish](/docs/development/publishing) a checksummed artifact and vault entry, which replace the Marketplace listing.

## Next steps

The [modules repository](https://github.com/spicetify/modules) has ported examples: `auto-skip-explicit` (behavior and one setting), `trashbin` and `shuffle-plus` (context menus, playbar buttons, and settings sections), `bookmark` (a panel), and `new-releases` (a page).
