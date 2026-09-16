---
title: Building a module
description: Scaffold, run and ship a Spicetify v3 module.
sidebar_position: 2
---

A module is the one thing you build for Spicetify v3. It can add a button, register a whole page, restyle the client, or all three. This page is the path from nothing to something running in your client; [the module standard](https://github.com/spicetify/modules/blob/main/docs/module-standard.md) is the contract it has to meet.

Already have a classic extension? Follow [Porting a v2 extension to v3](/docs/development/migrating-v2-extensions) for the lifecycle, cleanup, UI, classmap, and packaging changes.

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

:::tip
If the implementation needs copied Spotify class hashes, repeated DOM polling, private webpack searches, or another workaround that feels hacky, [tell us what capability is missing](https://github.com/spicetify/cli/issues). A shared client capability, register, primitive or classmap path is better than making every module author carry the same workaround.
:::

## What the scaffold gives you

| File | Role |
| --- | --- |
| `metadata.json` | id, version, entries, dependencies, and the store card's data |
| `index.ts` | the loader entry shim, leave it alone |
| `mod.tsx` | your module |
| `logic.ts` | dependency-free logic, unit testable in Node |
| `index.scss` | styles, adopted as a stylesheet and removed on unload |

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

**Settings** from every module render together on the standalone Spicetify
Settings page. Register a single preference with `settingsRow`, or a named
group with `settingsSection`.

Choose the surface by asking whether the control still makes sense when its
feature is not visible:

- Put durable module-wide behavior, provider/integration choices, credentials,
  caches, and defaults in Spicetify Settings.
- Keep filters, sorting, layout, appearance, and other controls that manipulate
  the current page or presentation beside that surface. Use its toolbar for a
  small set or a feature-owned modal for a larger set.
- Put infrastructure shared by every module, such as CORS routing, in its own
  global Spicetify section rather than under an arbitrary module.

A module can use both surfaces. For example, a lyrics module can keep provider
selection and its token in Spicetify Settings while opening font, alignment,
and background controls from the lyrics view. Do not duplicate a contextual
control globally for discoverability; give the feature a clear local settings
button or context-menu entry instead.

Use the React settings primitives from stdlib instead of rebuilding their
layout in module CSS:

| Primitive | Use it for |
| --- | --- |
| `SettingsToggleRow` | One boolean preference registered through `settingsRow` |
| `SettingsSection` | A named group registered through `settingsSection` |
| `SettingsButtonRow` | A labelled action, with an optional description |
| `SettingsTextInputRow` | A controlled text input and optional action button |
| `SettingsProviderRow` | A compact provider row with description, ordering controls, and toggle |
| `SettingsRow` | A custom control that does not fit one of the patterns above |

For one boolean setting:

```tsx
import { SettingsToggleRow } from '/modules/stdlib/lib/primitives.js';

registrar.register(
  'settingsRow',
  <SettingsToggleRow
    label="Skip music videos"
    getValue={() => localStorage.getItem(KEY) !== '0'}
    onChange={(enabled) => localStorage.setItem(KEY, enabled ? '1' : '0')}
  />,
);
```

For a module with several related settings:

```tsx
import {
  SettingsButtonRow,
  SettingsProviderRow,
  SettingsSection,
  SettingsTextInputRow,
} from '/modules/stdlib/lib/primitives.js';
import { SETTINGS_SECTION_SUBHEADING_CLASS } from '/modules/stdlib/lib/primitives-classes.js';

registrar.register(
  'settingsSection',
  <SettingsSection title="Lyrics">
    <SettingsButtonRow
      label="Lyrics cache"
      description="Loaded lyrics are cached in memory for faster reloading."
      buttonLabel="Clear cached lyrics"
      onClick={clearCache}
    />
    <h3 className={SETTINGS_SECTION_SUBHEADING_CLASS}>Providers</h3>
    {providers.map((provider, index) => (
      <SettingsProviderRow
        key={provider.id}
        label={provider.name}
        description={provider.description}
        value={provider.enabled}
        index={index}
        total={providers.length}
        onMove={(direction) => moveProvider(provider.id, direction)}
        onChange={(enabled) => setProviderEnabled(provider.id, enabled)}
      />
    ))}
    <SettingsTextInputRow
      label="Provider token"
      value={token}
      onInput={setToken}
      actionLabel="Refresh token"
      onAction={refreshToken}
    />
  </SettingsSection>,
);
```

The primitives own label hierarchy, descriptions, native control styling,
keyboard semantics, and spacing between actions. Do not target their inputs,
buttons, rows, or action groups from module CSS. If a recurring settings
layout is missing, propose or add a stdlib primitive instead of copying the
pattern into another module.

The same register system covers menus, top-bar and playbar controls, panels, overlays and root-level UI. Prefer those owned surfaces and stdlib's React or vanilla primitives over inserting raw DOM into Spotify's private structure: the register handles placement and cleanup, while the primitives share the native-looking control contract.

## The client capability surface

Import `client` from stdlib instead of reading the ambient compatibility global throughout module code:

```ts
import { client } from '/modules/stdlib/mod.ts';

client.player.next();
client.platform.History.push('/search');
client.notify('Done');
```

It provides typed, lazy capabilities for player, platform, URI, icons, networking, storage, keyboard, context menus, notifications, and the other client services. stdlib currently adapts the compatibility wrapper internally, but keeping that access behind one boundary lets the implementation change without rewriting every module. See the [API reference](/docs/development/api-wrapper) for the underlying behavior.

Reach for a native `client.platform.*API` before making an HTTP call of your own.

## Class names

Spotify's own class names are hashed and change with every client build, so never hardcode one. Reference them through `MAP`:

```ts
const cls = MAP.main.topbar.right.button_t.wrapper;
```

Modules ship with those references intact and the CLI resolves them at apply time against the exact Spotify version installed, which is why one build of your module works on every supported client. `classmap.d.ts` is generated for you, so the paths autocomplete.

## Themes

Start a new CSS-only theme module from the scaffold:

```bash
npm create spicetify-module my-theme -- --template theme
```

Or migrate a classic theme containing `color.ini` and `user.css`:

```bash
spicetify-kit from-theme /path/to/classic-theme --name my-theme
```

The migration copies the classic CSS and `color.ini`; at runtime, each INI section becomes a switchable scheme whose colours are exposed as `--spice-*` variables. Treat the result as a starting point: run it through the live dev loop, update selectors that no longer match, and never replace them with Spotify's generated class hashes.

## Testing

Put anything worth testing in `logic.ts`, free of client imports, and pass plain values from `client` into it from `mod.tsx`. Then:

```bash
npm run check   # typecheck
npm run test    # unit tests
```

UI is verified live through the dev loop, because JSX and the client's runtime URLs do not resolve in Node.

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

## Then publish

[Publishing](/docs/development/publishing) covers getting it into the store.
