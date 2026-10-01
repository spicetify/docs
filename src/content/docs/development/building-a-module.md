---
title: Building a module
description: Scaffold, develop, test, and build a Spicetify v3 module.
sidebar_position: 2
---

A module is a folder with a `metadata.json` and a JavaScript entry, a CSS entry, or both. The [module standard](https://github.com/spicetify/modules/blob/main/docs/module-standard.md) lists the rules `spicetify-kit check` enforces. To port a classic extension, follow [Porting a v2 extension](/docs/development/migrating-v2-extensions).

## Requirements

You need Node 22.6 or newer and the standalone Spotify install with Spicetify v3 applied (`spicetify apply`). The kit can't start the Microsoft Store build with a debug port, and a stock Spotify can't load a pushed module.

## Scaffold a project

Run the scaffold and install its dependencies:

```bash
npm create spicetify-module my-module
cd my-module
npm install
```

The name must be kebab-case, and it becomes the module's id, which is permanent once you publish. Pick a template with `-- --template <name>`, as in `npm create spicetify-module my-theme -- --template theme`:

| Template | What you get |
| --- | --- |
| `basic` (default) | A top-bar button that opens a page |
| `extension` | A `songchange` listener, with no UI and no CSS |
| `app` | A nav entry and a full page |
| `theme` | `color.ini` and `index.css`, with no TypeScript |

The JavaScript templates generate `metadata.json`, `index.ts` (the loader entry shim, which you leave alone), `mod.tsx` (your module), `logic.ts` (code with no client imports, for unit tests), `test/` (a happy-dom setup and a starter test), `index.scss`, and `classmap.d.ts` (the `MAP` types, regenerated on every build).

## Run the dev loop

The dev loop rebuilds on every save and pushes the result into Spotify in about a second, with no apply and no restart:

```bash
npm run dev
```

`dev` starts Spotify with `--remote-debugging-port=9229`, or reuses a client already running with that port. Stopping it with ctrl-c removes the pushed copy, and Spotify falls back to the installed version of the module, if any. Flags go after `--`, as in `npm run dev -- --keep`:

| Flag | Effect |
| --- | --- |
| `--keep` | Leave the pushed copy installed when `dev` stops. `npm run remove` drops it later. |
| `--once` | Build and push once, then exit. The pushed copy stays. |
| `--no-launch` | Don't start Spotify. Wait for a client you started with `--remote-debugging-port=9229`. |
| `--port <n>` | Use another debug port. The default is 9229, or `SPICETIFY_CDP_PORT` when set. |

If another process holds port 9229, such as `node --inspect` or `wrangler dev`, `dev` stops and names it. Use `--port 9230` or `SPICETIFY_CDP_PORT=9230` instead.

UI that was on screen before a push keeps the old build until it remounts, so navigate away and back to see a change.

## Write the entry point

The loader imports `index.js` and calls its `load` export, which the scaffold's `index.ts` forwards to the default export of `mod.tsx`:

```ts
import { createRegistrar, type ModuleRuntimeContext } from '/modules/stdlib/mod.ts';

export default async function (ctx: ModuleRuntimeContext) {
  const registrar = createRegistrar(ctx);
  // Register UI here.
  ctx.defer(() => {
    // Clear your own timers, listeners, and overlays.
  });
}
```

An entry can also export `preload(ctx)`, which runs before the loader adopts the CSS and calls `load`, and `mixin(transformer, ctx)`, which runs before the client boots and needs `"hasMixins": true`. Most modules only need `load`.

:::danger
The loader awaits each entry in turn, in dependency order, so an unbounded `await`, such as polling for a DOM node that never appears, stops every later module from loading. Cap the attempts or the elapsed time, then let that feature degrade.
:::

:::warning
Modules unload while Spotify runs. The registrar removes what you registered and the loader removes your stylesheet, so clear your own timers, subscriptions, and overlays through `ctx.defer`.
:::

## Add UI

The registrar mounts your UI and removes it on unload. Registered elements don't re-render on their own, so a component that shows player or route state subscribes to it (`useHistoryRefresh` from stdlib does this for routes).

### Buttons

`placeButton` adds a top-bar or playbar button:

```ts
registrar.placeButton('playbar', {
  label: 'Loop section',
  icon: LOOP_ICON,
  onClick: toggleLoop,
  near: { anchor: 'playbar:queue', side: 'before' },
});
```

The locations are `topbar-left`, `topbar-right`, and `playbar`. `icon` is inner SVG markup on a 16-unit grid, such as `client.icons.<name>`. `order` sorts buttons in a slot, lowest first, and `isActive` lights a playbar button. `near` places the button beside `playbar:lyrics`, `playbar:queue`, `playbar:mute`, `playbar:miniplayer`, or `playbar:fullscreen`, and falls back to ordinary placement when that control is missing.

`placeButton` returns a handle with `remove()`. For a button that tracks its own state or needs its DOM element, register a component with `registrar.register('playbarButton', <MyButton />)`.

### Pages and panels

A page is a nav entry plus a route:

```tsx
import { NavLink } from '/modules/stdlib/mod.ts';

const ROUTE = '/bespoke/my-module';

registrar.register(
  'navlink',
  <NavLink localizedApp="My Module" appRoutePath={ROUTE} icon={ICON} activeIcon={ICON} />,
);
registrar.registerRoute(ROUTE, <Page />);
```

`registrar.registerPanel({ id, label, render })` shows content in the right sidebar and returns a controller with `open()`, `close()`, `toggle()`, and `subscribe()`. stdlib handles the panel's width, Escape, focus, and teardown. The panel's tree unmounts on close, so keep lasting state outside it. The [Bookmark module](https://github.com/spicetify/modules/tree/main/modules/bookmark) is a full example.

### Settings

Settings from every module render on the Spicetify Settings page. Register one preference with `settingsRow`, or a group with `settingsSection`, built from the stdlib settings components: `SettingsSection`, `SettingsToggleRow`, `SettingsButtonRow`, `SettingsTextInputRow`, `SettingsProviderRow` (with reorder controls), and `SettingsRow` for a custom control.

```tsx
import { SettingsButtonRow, SettingsSection, SettingsToggleRow } from '/modules/stdlib/lib/primitives.js';

registrar.register(
  'settingsSection',
  <SettingsSection title="My Module">
    <SettingsToggleRow label="Skip music videos" getValue={isEnabled} onChange={setEnabled} />
    <SettingsButtonRow label="Cache" buttonLabel="Clear cache" onClick={clearCache} />
  </SettingsSection>,
);
```

Don't restyle these components from module CSS. Spicetify Settings is for durable behavior, provider choices, credentials, and defaults, while filters, sorting, and appearance controls stay next to the feature they change.

### Other UI

The registrar also takes `menu` (context-menu items built with `MenuItem`), `playbarWidget`, `topbarLeftButton`, `topbarRightButton`, and `rootChild` (a body-level overlay). `displayModal({ title, content })` opens a modal. `Tooltip`, `Popover`, `Button`, `IconButton`, `Select`, `TextInput`, `Toggle`, `Card`, and `Dialog` are in `/modules/stdlib/lib/primitives.js`.

## Use stdlib

Import from two stdlib paths: `/modules/stdlib/mod.ts` for the client, React, registrars, storage, and types, and `/modules/stdlib/lib/primitives.js` for UI components. Everything under `stdlib/src/` is private, and the build fails on an import from it.

The `client` object gives typed access to the player, platform APIs, URIs, icons, storage, keyboard, context menus, and notifications:

```ts
import { client } from '/modules/stdlib/mod.ts';

client.player.next();
client.platform.History.push('/search');
client.notify('Done');
```

Use `client` instead of the global `Spicetify` object, which `spicetify-kit check` warns about. Prefer a native `client.platform.*API` to an HTTP request. External services can rate limit or CORS-block module requests, so they can't be a feature's only data source. The [API reference](/docs/development/api-wrapper) documents the wrapper behind `client`.

Import React from stdlib too. The build points JSX at the client's React, and a second bundled copy breaks hooks.

## Reference Spotify class names

Spotify's class names are hashed and change between client builds, so never copy one into a module. stdlib's components apply the classes they need. To style Spotify's own DOM, reference the class through `MAP`:

```tsx
<button className={MAP.main.playbar.buttons.button.wrapper} />
```

The build leaves `MAP.*` intact, and `spicetify apply` replaces each reference with the class from the installed Spotify version's classmap, so one build works on every supported version. If a path is missing or stale in that classmap, the CLI skips the whole module and reports it.

`spicetify-kit check` warns about direct `MAP.*`, global `Spicetify.*`, and Spotify DOM selectors. When a feature needs one, record an exception in `metadata.json`:

```json
"stdlibBoundary": {
  "exceptions": [
    { "file": "mod.tsx", "rules": ["direct-map"], "reason": "Styles the playbar button wrapper." }
  ]
}
```

The rules are `ambient-client`, `client-dom`, and `direct-map`, and the build fails on an exception whose file no longer needs it. The [stdlib boundary](https://github.com/spicetify/modules/blob/main/docs/stdlib-boundary.md#external-modules) has the details. If a capability or classmap path you need is missing, [open an issue](https://github.com/spicetify/cli/issues).

## Fill in metadata

`metadata.json` describes the module to the loader and the store:

```json
{
  "name": "my-module",
  "kind": "extension",
  "version": "0.1.0",
  "authors": ["you"],
  "description": "What it does",
  "entries": { "js": "index.js", "css": "index.css" },
  "hasMixins": false,
  "dependencies": { "stdlib": "^1.13.1" },
  "preview": "https://example.com/my-module-preview.png",
  "repository": "https://github.com/you/my-module",
  "license": "MIT"
}
```

`version` must be semver, and `entries` must name at least one of `js` and `css`. `kind` is `extension`, `theme`, `snippet`, `app`, or `lib`, and picks the store tab. A `theme` replaces whichever theme was active. The scaffold writes the older `tags` list instead, which the store reads the same way. Add `preview`, `repository`, and `license` before you [publish](/docs/development/publishing). Library modules can also set `compat` (older versions they still support), `hidden` (no store card), and `tree` (one output file per source file, so other modules can import them).

## Declare dependencies

List every module you import at runtime in `dependencies`, mapped to a version range: `*`, an exact version, `^`, `~`, or `>=`, `<=`, `>`, and `<` comparators. The loader starts dependencies first, and refuses to load a module whose range the installed dependency doesn't satisfy, with a message naming both.

The scaffold declares a `^` range on its stdlib version. Raise the minimum when you start using a newer stdlib API. A new stdlib release doesn't force a change, because stdlib lists older versions it still supports in `compat` (`["0.3.0"]` in 1.13.1), and the loader accepts any module whose range matches one of them. In the modules repository, `scripts/check-deps.ts` runs in `pnpm check` and fails when a range matches neither a dependency's version nor its `compat` list.

## Themes

A theme is a CSS-only module. Each `[Section]` of its `color.ini` is a color scheme users can switch to, and the loader sets each key as `--spice-<key>` and `--spice-rgb-<key>` on `:root`. Start one with `--template theme`, or convert a classic theme folder with `user.css` and `color.ini`:

```bash
npx spicetify-kit from-theme /path/to/classic-theme --name my-theme
```

Run the result through the dev loop and fix selectors that no longer match, without replacing them with hashed class names.

## Test

Keep testable logic in `logic.ts`, with no client imports, and pass it plain values from `mod.tsx`. Then run the checks:

```bash
npm run check   # tsc, then spicetify-kit check
npm test        # node --test on test/*.test.mts
```

Tests import `logic.ts`, never `mod.tsx`, because JSX and `/modules/*` URLs don't resolve in Node. Verify UI in the dev loop. Before a release, disable and re-enable the module from the Module Store's Installed tab, or with `Spicetify.Modules.disable('my-module')` and `Spicetify.Modules.enable('my-module')` in DevTools, and check that its UI and listeners appear once.

## Build and sideload

Build the module and zip it:

```bash
npm run build
npx spicetify-kit pack dist/my-module@0.1.0
```

`npm run build` writes `dist/<name>@<version>/`, and fails before writing anything on invalid metadata, a missing loader shim, or a private stdlib import. `pack` writes `my-module@0.1.0.zip` to the current folder and prints its sha256. To load that zip into the running client without publishing, run `npx spicetify-kit install my-module@0.1.0.zip`, which needs `unzip` on your `PATH`.

## Next steps

- [Publishing a module](/docs/development/publishing) gets the build into the Module Store.
- [The API reference](/docs/development/api-wrapper) documents the `Spicetify` wrapper.
