---
title: Porting a v2 extension to v3
description: Move a classic Spicetify extension into the v3 module lifecycle.
sidebar_position: 3
---

A v2 extension does not need to be rewritten all at once. The `Spicetify` global is still available in v3, so playback, navigation, URI, storage, notification, and many menu APIs can move over largely unchanged. What must change is the code around them: how the add-on starts, owns UI and side effects, cleans up, refers to Spotify classes, and ships.

This guide takes a classic single-file extension and turns it into a module. For a new module, start with [Building a module](/docs/development/building-a-module) instead.

## The migration in one table

| v2 extension | v3 module |
| --- | --- |
| One `.js` file configured in `config-xpui.ini` | A directory with `metadata.json` and JS/CSS entries |
| Self-running IIFE | An exported `load(ctx)` lifecycle entry |
| Poll until `Spicetify` is ready | Start inside the loader; bound any later DOM wait |
| Side effects last until Spotify exits | Every side effect has an unload disposer |
| `Topbar.Button` and `Playbar.Button` own their placement | stdlib registers and `registrar.placeButton()` own placement and cleanup |
| A `<style>` element appended by the extension | `entries.css`, adopted on load and removed on unload |
| Spotify class hashes copied from DevTools | Typed `MAP.*` paths in code and semantic `main-*` selectors in CSS |
| Optional manual cleanup | Runtime enable, disable, update, and reload make cleanup mandatory |
| `spicetify config extensions …` then `spicetify apply` | Build and hot-push with `npm run dev` |
| Marketplace submission | A checksummed artifact and a vault entry |

:::tip
**If the port feels hacky, tell us.** Repeated polling, copied class hashes, DOM surgery against undocumented structure, monkey-patching, and private webpack searches often mean v3 is missing a supported surface. Do not assume every extension author should carry the same workaround. Open an issue with the use case, the v2 API or behavior you are replacing, and the smallest workaround you found; that gives us something concrete to add to the wrapper, stdlib, classmap, or module kit.

A temporary workaround should still be bounded, feature-detected, and completely removed on unload.
:::

## 1. Inventory the old extension

Before moving code, list what the extension owns. Search for:

- timers and recursive `setTimeout` readiness loops
- player, history, keyboard, document, and window listeners
- `MutationObserver`, `ResizeObserver`, and `IntersectionObserver`
- top-bar, playbar, menu, context-menu, modal, and panel UI
- DOM nodes, React roots, tooltips, and `<style>` elements it creates
- generated Spotify class names copied from DevTools
- webpack finders, source patches, and direct internal-module access
- local-storage keys and other persisted data

That list becomes the teardown checklist. A v3 module can be reloaded several times in one Spotify process, so anything left behind produces duplicate buttons, listeners, and behavior.

Keep the existing storage keys unless you intentionally want to reset users. `Spicetify.LocalStorage` and browser `localStorage` remain available.

## 2. Scaffold an extension module

Create a project beside the old source rather than editing the only copy:

```bash
npm create spicetify-module my-extension -- --template extension
cd my-extension
npm install
npm run dev -- --launch
```

The generated project contains:

- `metadata.json` — identity, version, entries, dependencies, and store metadata
- `index.ts` — the loader entry shim; leave it in place
- `mod.tsx` — the runtime integration you are porting
- `logic.ts` — client-independent behavior that can be unit tested
- `index.scss` — module CSS, adopted and removed with the module

Use a stable, kebab-case identifier. It becomes the store id, runtime id, and directory name.

## 3. Replace the readiness IIFE with a lifecycle

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

The scaffold's `index.ts` exports the loader-facing entry and defers the rest of the module:

```ts
import type { ModuleRuntimeContext } from '/modules/stdlib/mod.ts';

export async function load(ctx: ModuleRuntimeContext) {
  return (await import('./mod.js')).default(ctx);
}
```

Move the extension body into `mod.tsx` and register its cleanup with the context:

```ts
import type { ModuleRuntimeContext } from '/modules/stdlib/mod.ts';

export default async function (ctx: ModuleRuntimeContext) {
  const onSongChange = () => {
    console.log(Spicetify.Player.data?.item?.name);
  };

  Spicetify.Player.addEventListener('songchange', onSongChange);
  ctx.defer(() => {
    Spicetify.Player.removeEventListener('songchange', onSongChange);
  });
}
```

The loader calls `load` after the client API is ready, so the old top-level readiness loop goes away.

:::danger
The loader awaits your entry. Never replace a readiness loop with an unbounded `await`. If you still need a DOM node or optional API that appears later, cap the attempts or the elapsed time and let that feature degrade when it never arrives. One unbounded wait can hold up the rest of the module load.
:::

## 4. Make every side effect reversible

Register a disposer immediately after creating something. Do not leave teardown for the end of the port.

```ts
export default async function (ctx: ModuleRuntimeContext) {
  const interval = window.setInterval(refresh, 5_000);
  ctx.defer(() => window.clearInterval(interval));

  const observer = new MutationObserver(refresh);
  observer.observe(document.body, { childList: true, subtree: true });
  ctx.defer(() => observer.disconnect());

  const onKeyDown = (event: KeyboardEvent) => handleKey(event);
  document.addEventListener('keydown', onKeyDown);
  ctx.defer(() => document.removeEventListener('keydown', onKeyDown));
}
```

The same rule applies to compatibility helpers that still expose their v2 API:

```ts
const item = new Spicetify.ContextMenu.Item(
  'Do something',
  ([uri]) => actOn(uri),
  ([uri]) => Spicetify.URI.fromString(uri).type === Spicetify.URI.Type.TRACK,
);

item.register();
ctx.defer(() => item.deregister());
```

If an API returns its own cleanup function, pass that function to `ctx.defer`. For DOM or React UI you create yourself, remove the host and unmount the root there as well.

## 5. Move UI onto owned surfaces

Create one registrar in the module entry. Anything it registers is removed automatically when the module unloads:

```tsx
import { createRegistrar } from '/modules/stdlib/mod.ts';
import type { ModuleRuntimeContext } from '/modules/stdlib/mod.ts';

export default async function (ctx: ModuleRuntimeContext) {
  const registrar = createRegistrar(ctx);
  // Register module UI here.
}
```

Prefer the v3 surface that matches the old UI:

| Old pattern | Preferred v3 surface |
| --- | --- |
| `new Spicetify.Topbar.Button(...)` | `registrar.placeButton('topbar-left' | 'topbar-right', …)` |
| `new Spicetify.Playbar.Button(...)` | `registrar.placeButton('playbar', …)` or `playbarButton` for self-managed state |
| `new Spicetify.Playbar.Widget(...)` | `playbarWidget` register |
| Profile-menu settings item | `settingsRow` or `settingsSection` on Spotify's settings page |
| General profile-menu action | `menu` register with the kit's `MenuItem` |
| App-like page | `navlink` plus `registerRoute()` |
| Panel | `panel` register; `Spicetify.Panel` is not available in v3 |
| Body-level popup or overlay | `rootChild` register, or an owned host disposed through `ctx.defer` |
| Selected-track context action | The compatible `Spicetify.ContextMenu` API, explicitly deregistered on unload |

### Top-bar and playbar buttons

Replace a v2 button:

```js
new Spicetify.Topbar.Button('My extension', ICON, openPage);
```

with a registrar-owned button:

```ts
const registrar = createRegistrar(ctx);

registrar.placeButton('topbar-right', {
  label: 'My extension',
  icon: ICON,
  onClick: openPage,
});
```

For a playbar button, `near` can place it relative to a stable Spotify control without a build-specific selector:

```ts
registrar.placeButton('playbar', {
  label: 'Loop section',
  icon: LOOP_ICON,
  onClick: toggleLoop,
  near: { anchor: 'playbar:queue', side: 'before' },
});
```

Use a self-managing React component through `playbarButton` when the icon, active state, or disabled state changes with playback. Registered elements are not re-rendered by the register itself; the component must subscribe to the player state it displays.

### Settings

A single boolean belongs in the shared Spicetify section of Spotify's settings page:

```tsx
import { SettingsToggleRow } from '/modules/stdlib/lib/primitives.js';

const KEY = 'my-extension:enabled';
const isEnabled = () => localStorage.getItem(KEY) !== '0';

registrar.register(
  'settingsRow',
  <SettingsToggleRow
    label="Enable my extension"
    getValue={isEnabled}
    onChange={(enabled) => localStorage.setItem(KEY, enabled ? '1' : '0')}
  />,
);
```

Use `settingsSection` for several related controls. Build controls from stdlib primitives such as `Button`, `Toggle`, `Select`, and `TextInput` rather than copying Spotify's internal component classes.

### A page

What used to require a custom app can live in the same module as the extension behavior:

```tsx
import { NavLink } from '/modules/stdlib/src/registers/navlink.tsx';

const ROUTE = '/bespoke/my-extension';

registrar.register(
  'navlink',
  <NavLink
    localizedApp="My extension"
    appRoutePath={ROUTE}
    icon={ICON}
    activeIcon={ACTIVE_ICON}
  />,
);
registrar.registerRoute(ROUTE, <Page />);
```

The route, nav item, and module behavior now share one lifecycle and package.

## 6. Keep one React instance

Do not bundle React and do not import it from an unrelated package at runtime. Use the client instance exposed by stdlib:

```tsx
import { React } from '/modules/stdlib/src/expose/React.ts';
```

The scaffold and build configuration already direct JSX at the compatible runtime. Copy the old component body, but replace hand-picked `Spicetify.ReactComponent` internals with stdlib primitives or the typed component library where possible. The [API reference](/docs/development/api-wrapper) marks wrapper members that are absent or degraded in v3.

Keep data and transformations that do not need Spotify in `logic.ts`. Pass client values into those functions from `mod.tsx`; tests can then import the logic without trying to boot the Spotify runtime.

## 7. Replace generated class names

There are three different class-name cases:

1. **Classes you own**, such as `.my-extension-card`: keep them.
2. **A Spotify class applied by your TS/TSX code**: use a typed `MAP.*` path.
3. **CSS targeting the existing Spotify client**: use a stable semantic `main-*` selector supplied by the css-map when one exists.

```tsx
<button className={MAP.main.playbar.buttons.button.wrapper}>…</button>
```

Never copy a generated value such as `sXjzYBob5Y4psogB` from DevTools into the module. The build leaves `MAP.*` references intact, and Spicetify resolves them against the exact installed client while applying. That lets one artifact serve multiple Spotify versions.

If the semantic path or selector you need does not exist, request a classmap or css-map addition. A private hash may work today and silently stop matching after the next Spotify update.

## 8. Move injected CSS into the CSS entry

Delete code that creates a global `<style>` tag and move those rules to `index.scss`. The build emits `index.css`; the loader adopts it after preload and removes it on unload.

Scope every module-owned rule under a class or data attribute you own:

```scss
.my-extension-page {
  color: var(--spice-text);

  .my-extension-card {
    background: var(--spice-card);
  }
}
```

Use `--spice-*` variables for theme-aware colors. Test at least one light and one dark theme; a rule that looks correct against Spotify's default palette may be unreadable elsewhere.

## 9. Treat webpack and source patches as a redesign point

Wrapper APIs such as `Player`, `Platform`, `URI`, `LocalStorage`, and notifications are the easiest part of a port because v3 preserves the `Spicetify` global. Direct client internals are different:

- Prefer a typed stdlib exposure over scanning webpack yourself.
- Let a missing optional export disable one feature rather than throw at module import time.
- Do not destructure a finder result at the top level; the entire module then fails when that result drifts.
- Source transforms are disabled by default in the beta. A v2 extension that rewrites Spotify's bundle cannot be mechanically ported; redesign around a public wrapper or stdlib surface, or make the feature degrade until a safe surface exists.
- `Spicetify.GraphQL.Definitions` is currently empty in v3. Use a known persisted query deliberately or prefer a native `Platform.*API` when one provides the data.

If the extension reaches an external service, prefer the client's authenticated native APIs first. External requests can be rate-limited or CORS-blocked and should not be the only path to a usable UI.

This is also the point to [report a missing v3 capability](https://github.com/spicetify/cli/issues). Include what the extension is trying to accomplish rather than only the old implementation: the right replacement may be a wrapper API, a stdlib register, a new typed exposure, or a classmap path rather than another webpack finder.

## 10. Preserve data, split logic, and declare dependencies

Reuse the old extension's storage prefix to preserve settings:

```ts
const KEY = 'my-extension:settings';
const saved = Spicetify.LocalStorage.get(KEY);
```

Move parsing, filtering, state transitions, and formatting into named exports in `logic.ts`. Keep browser, React, and `Spicetify.*` access in `mod.tsx`. This is usually the cleanest seam in an old single-file extension and gives the port useful tests without mocking the whole client.

Declare every runtime module dependency in `metadata.json`. The scaffold adds stdlib; add other modules with semver ranges rather than assuming load order:

```json
{
  "dependencies": {
    "stdlib": "^1.0.0"
  }
}
```

The loader starts dependencies first and refuses an incompatible version with an actionable failure instead of letting imports resolve unpredictably.

## 11. Verify the port by unloading it

Do not stop after the first successful load. The v3-specific test is a full lifecycle:

1. Start the dev loop with `npm run dev -- --launch`.
2. Exercise every button, menu item, setting, route, and player listener.
3. Disable or reload the module from the Module Store or module manager.
4. Confirm its UI, styles, listeners, observers, timers, and overlays disappear.
5. Enable it again and confirm there is exactly one of everything.
6. Navigate away and back to remount route-dependent UI.
7. Restart Spotify and confirm persisted settings still load.

Run the local gates too:

```bash
npm run check
npm run test
spicetify-kit check .
```

During development, inspect the loader report in DevTools:

```js
Spicetify.Modules.report
```

Depending on the beta build, `report` may be a property or a function. A failed module should appear there with its reason while unrelated modules continue loading.

When the hot-pushed build is no longer needed, remove the local override:

```js
Spicetify.Modules.removeLocal('my-extension');
```

## 12. Package and publish

Build and sideload the same artifact users will receive:

```bash
spicetify-kit build
spicetify-kit pack dist/my-extension@0.1.0
spicetify-kit install my-extension@0.1.0.zip
```

Complete `metadata.json` before publishing. The store requires an HTTPS preview, repository URL, SPDX license, name, version, and consistent module identity.

Then follow [Publishing a module](/docs/development/publishing) to create the checksummed vault entry. The source and releases stay in your repository; the shared registry is the reviewed index that makes the module discoverable in Spotify.

## Porting checklist

- [ ] The self-running IIFE and readiness polling are gone.
- [ ] The loader entry is bounded and cannot hang indefinitely.
- [ ] Every listener, timer, observer, root, tooltip, and DOM host has a disposer.
- [ ] Buttons, settings, pages, panels, and overlays use an owned v3 surface.
- [ ] React comes from stdlib, not from a bundled second copy.
- [ ] No generated Spotify class name is hardcoded.
- [ ] Injected styles moved to the CSS entry and are scoped.
- [ ] Existing storage keys were preserved or deliberately migrated.
- [ ] Client-independent logic has unit tests.
- [ ] Missing internal APIs degrade one feature instead of crashing the module.
- [ ] Disable, reload, re-enable, and Spotify restart were tested live.
- [ ] The packed artifact was sideloaded before publishing.

For complete examples, compare the v3 modules `auto-skip-explicit`, `trashbin`, `shuffle-plus`, `bookmark`, and `new-releases` in the [modules repository](https://github.com/spicetify/modules). They cover behavior-only extensions, settings, playbar UI, context menus, and app-like routes.
