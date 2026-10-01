---
title: Modules
description: The Spicetify.Modules loader manager and the libraries the wrapper exposes from Spotify's bundle.
---

This page covers `Spicetify.Modules`, which manages installed modules at runtime, and the third-party libraries that the wrapper takes from Spotify's own bundle.

## `Spicetify.Modules`

The module loader adds `Spicetify.Modules` after it has run every module's `load`, so the object is absent while modules load. In a module, read it through `client.modules`, which stdlib resolves when you access it.

```ts
interface ModuleState {
  identifier: string;
  version: string;
  loaded: boolean;
  mixedIn: boolean;
  local: boolean;
  failed?: string;
}

interface ModulesManifest {
  spotifyVersion: string;
  cliVersion?: string;
  modules: Array<{ identifier: string; name: string; version: string }>;
}

interface LocalModuleRecord {
  metadata: object;
  files: Record<string, string>;
  sidecar: object;
}

namespace Modules {
  const report: { loaded: string[]; failed: Record<string, string> };
  const manifest: ModulesManifest;
  const registry: unknown;
  function list(): ModuleState[];
  function enable(id: string): Promise<boolean>;
  function disable(id: string): Promise<boolean>;
  function unload(id: string): Promise<boolean>;
  function reload(id: string): Promise<boolean>;
  function schemes(id: string): { active: string; names: string[] } | null;
  function setScheme(id: string, name: string): boolean;
  function entryUrl(identifier: string, entry: string): string;
  function installLocal(id: string, record: LocalModuleRecord): Promise<boolean | { requiresRestart: true } | { disabled: true }>;
  function removeLocal(id: string): Promise<void | { requiresRestart: true } | { revertedTo: string }>;
  function listLocal(): LocalModuleRecord[];
}
```

- `report` lists the modules that loaded at boot and maps each failed module to its error message.
- `manifest` is the manifest that `spicetify apply` staged. Its `cliVersion` field holds the CLI version.
- `list` returns the state of every registered module.
- `enable` loads a module and its dependencies, then clears the user's saved disable. `disable` unloads a module and saves that choice across restarts.
- `unload` stops a module for this session without saving a choice. `reload` unloads and loads it again. Unloading a module also unloads the modules that depend on it.
- `schemes` returns the color schemes of a theme module and the active one. `setScheme` switches the scheme, saves the choice, and returns `false` when the theme or scheme does not exist.
- `entryUrl` returns the URL the loader serves a module file from, in the form `/modules/<identifier>/<entry>`.
- `installLocal`, `removeLocal` and `listLocal` manage modules that the store installs into `localStorage`. A result with `requiresRestart` means the change takes effect after a restart. A result with `revertedTo` means the staged copy of that version is running again.

`registry` is the loader's internal registry and has no stable interface. To remove a module that the CLI staged on disk, use [`Spicetify.Daemon.uninstallStaged`](/docs/development/api-wrapper#spicetifydaemon).

```ts
Spicetify.Modules.report.failed;
Spicetify.Modules.list().filter((module) => !module.loaded);
```

## Libraries

The wrapper finds these libraries in Spotify's webpack bundle and exposes them on `Spicetify`. They are the versions Spotify ships, which change with Spotify releases. In a module, import React from `/modules/stdlib/mod.ts` instead, so you never bundle a second copy.

| Member | Library |
| --- | --- |
| `Spicetify.React` | [React](https://react.dev/) |
| `Spicetify.ReactDOM` | [ReactDOM](https://react.dev/reference/react-dom) |
| `Spicetify.ReactDOMServer` | [ReactDOMServer](https://react.dev/reference/react-dom/server) |
| `Spicetify.ReactJSX` | React's JSX runtime |
| `Spicetify.Tippy` | [Tippy.js](https://atomiks.github.io/tippyjs/) |
| `Spicetify.Mousetrap` | [Mousetrap](https://craig.is/killing/mice) |
| `Spicetify.ReactFlipToolkit` | [React Flip Toolkit](https://github.com/aholachek/react-flip-toolkit), with `Flipper` and `Flipped` |
| `Spicetify.ReactQuery` | [TanStack Query](https://tanstack.com/query) for React, in the version Spotify uses |
| `Spicetify.classnames` | [classnames](https://github.com/JedWatson/classnames) |
| `Spicetify.Snackbar` | [notistack](https://notistack.com/), with `enqueueSnackbar`, `SnackbarProvider` and `useSnackbar` |

```ts
const { useState } = Spicetify.React;
```

For a cached request in a module, stdlib's `/modules/stdlib/query.ts` gives each module its own query client. We recommend it over `Spicetify.ReactQuery`.
