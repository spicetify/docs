---
title: Building a module
description: Scaffold, run and ship a Spicetify v3 module.
sidebar_position: 2
---

A module is the one thing you build for Spicetify v3. It can add a button, register a whole page, restyle the client, or all three. This page is the path from nothing to something running in your client; [the module standard](https://github.com/spicetify/modules/blob/main/docs/module-standard.md) is the contract it has to meet.

---

## Scaffold and run

```bash
npm create spicetify-module my-module
cd my-module
npm run dev -- --launch
```

`dev` rebuilds on every save and pushes the result into a running Spotify in about a second, with no re-apply and no restart. `--launch` starts (or reuses) Spotify with the remote debugging port; without it, start Spotify yourself with `--remote-debugging-port=9229`.

Drop the pushed override when you are done:

```js
Spicetify.Modules.removeLocal('my-module');
```

Templates: `--template basic` (a button and a route), `extension` (behaviour only), `app` (a nav entry and a full page), `theme` (CSS only, no TypeScript).

---

## What the scaffold gives you

| File | Role |
| --- | --- |
| `metadata.json` | id, version, entries, dependencies, and the store card's data |
| `index.ts` | the loader entry shim, leave it alone |
| `mod.tsx` | your module |
| `logic.ts` | dependency-free logic, unit testable in Node |
| `index.scss` | styles, adopted as a stylesheet and removed on unload |

---

## The entry point

A module default-exports one function, and the loader awaits it:

```ts
import { createRegistrar } from '/modules/stdlib/mod.ts';
import type { ModuleRuntimeContext } from '/modules/stdlib/mod.ts';

export default async function (ctx: ModuleRuntimeContext) {
  const registrar = createRegistrar(ctx);
  // register your UI here
  ctx.defer(() => {
    // clear the timers, listeners and overlays you own
  });
}
```

Two rules that matter more than they look:

:::danger
**Bound every wait.** The loader awaits this function, so an unbounded `await` (polling for a DOM node that never appears, for instance) hangs the loader and every other module silently fails to load with it. Cap the tries and degrade.
:::

:::warning
**Undo everything on unload.** Modules load and unload at runtime. The registrar removes what you registered and the stylesheet it adopted; the timers, subscriptions and overlays you created yourself are yours to clear through `ctx.defer`. A module that lingers after a reload is a bug.
:::

---

## Adding UI

**Buttons** go through `placeButton`, which handles ordering and placement for you:

```ts
registrar.placeButton('playbar', {
  label: 'Loop section',
  icon: LOOP_ICON,
  onClick: toggleLoop,
  near: { anchor: 'playbar:queue', side: 'before' },
});
```

Locations are `topbar-left`, `topbar-right` and `playbar`. `near` places the button next to one of Spotify's own controls by a stable name (`playbar:lyrics`, `playbar:queue`, `playbar:mute`, `playbar:miniplayer`, `playbar:fullscreen`) rather than a selector that changes with every client build. If the anchor cannot be found the button falls back to ordinary placement, so it is never hidden.

**A page** is a nav entry plus a route:

```ts
registrar.register(
  'navlink',
  <NavLink localizedApp="My Module" appRoutePath={ROUTE} icon={ICON} activeIcon={ICON} />,
);
registrar.registerRoute(ROUTE, <Page />);
```

**Settings** rows from every module render together under one Spicetify section in Spotify's own settings page, so a module with a single toggle does not need a page of its own.

---

## The Spicetify global

`Spicetify` is typed and available without importing anything, and it is the same surface v2 extensions used: `Player`, `Platform`, `URI`, `React`, `SVGIcons`, `CosmosAsync`, `GraphQL`, `Menu`, `PopupModal`, `LocalStorage` and the rest. See the [API reference](/docs/development/api-wrapper).

Reach for a native `Platform.*API` before making an HTTP call of your own.

---

## Class names

Spotify's own class names are hashed and change with every client build, so never hardcode one. Reference them through `MAP`:

```ts
const cls = MAP.main.topbar.right.button_t.wrapper;
```

Modules ship with those references intact and the CLI resolves them at apply time against the exact Spotify version installed, which is why one build of your module works on every supported client. `classmap.d.ts` is generated for you, so the paths autocomplete.

---

## Testing

Put anything worth testing in `logic.ts`, free of client imports, and inject the client objects from `mod.tsx`. Then:

```bash
npm run check   # typecheck
npm run test    # unit tests
```

UI is verified live through the dev loop, because JSX and the client's runtime URLs do not resolve in Node.

---

## Build and pack

```bash
spicetify-kit build                       # bundles TS/TSX and compiles index.scss
spicetify-kit pack dist/my-module@1.0.0   # zips it and prints the sha256
```

`build` enforces the standard's error tier: bad metadata or a missing loader shim aborts the build rather than producing something that fails at boot. `spicetify-kit check` runs the same audit on its own.

To sideload a packed build into a running client without publishing:

```bash
spicetify-kit install my-module@1.0.0.zip
```

---

## Then publish

[Publishing](/docs/development/publishing) covers getting it into the store.
