---
title: API wrapper
description: Reference for the Spicetify global that the v3 wrapper installs in the Spotify client.
---

`spicetify apply` injects two scripts into Spotify: the wrapper, which builds the `Spicetify` global, and the module loader, which boots modules and adds `Spicetify.Modules`. This reference documents what the global holds in v3.

## Which entry point to use

In a v3 module, import `client` from stdlib instead of reading `Spicetify` directly. `client` is stdlib's typed adapter over the same wrapper objects, so stdlib can repair a capability in one release when Spotify changes it. `spicetify-kit check` warns when module code reads `Spicetify.*`, and a module that needs the global can record an `ambient-client` exception in its `metadata.json`. The [stdlib boundary](https://github.com/spicetify/modules/blob/main/docs/stdlib-boundary.md) describes the contract.

```ts
import { client } from '/modules/stdlib/mod.ts';

client.player.next();
client.notify('Saved');
```

These `client` members map to the global:

| `client` member | Wrapper object |
| --- | --- |
| `player` | [`Spicetify.Player`](/docs/development/api-wrapper/methods/player) |
| `platform` | [`Spicetify.Platform`](/docs/development/api-wrapper/methods/platform) |
| `storage` | [`Spicetify.LocalStorage`](/docs/development/api-wrapper/methods/local-storage) |
| `uri` | [`Spicetify.URI`](/docs/development/api-wrapper/methods/uri) |
| `cosmos` | [`Spicetify.CosmosAsync`](/docs/development/api-wrapper/methods/cosmos-async), with `unknown` response bodies |
| `graphQL` | [`Spicetify.GraphQL`](/docs/development/api-wrapper/methods/graphql) |
| `keyboard`, `mousetrap` | [`Spicetify.Keyboard`](/docs/development/api-wrapper/methods/keyboard), `Spicetify.Mousetrap` |
| `contextMenu` | [`Spicetify.ContextMenu`](/docs/development/api-wrapper/classes/context-menu) |
| `playbar` | [`Spicetify.Playbar`](/docs/development/api-wrapper/classes/playbar) |
| `icons` | [`Spicetify.SVGIcons`](/docs/development/api-wrapper/properties/svgicons) |
| `notify` | [`Spicetify.showNotification`](/docs/development/api-wrapper/functions/show-notification) |
| `tippy`, `tippyProps` | `Spicetify.Tippy`, [`Spicetify.TippyProps`](/docs/development/api-wrapper/properties/tippy-props) |
| `react`, `reactDOM` | `Spicetify.React`, `Spicetify.ReactDOM` |
| `locale`, `snackbar` | `Spicetify.Locale`, `Spicetify.Snackbar` |
| `modules` | [`Spicetify.Modules`](/docs/development/api-wrapper/modules#spicetifymodules) |
| `daemon` | [`Spicetify.Daemon`](#spicetifydaemon) |
| `corsProxy` | [`Spicetify.CORSProxy`](#spicetifycorsproxy) |
| `config` | [`Spicetify.Config`](/docs/legacy/development/api-wrapper/properties/config), which v3 does not set |
| `spicetifyVersion` | The CLI version from the loader manifest |

`client.popupModal` is deprecated. Import `displayModal` and `hideModal` from `/modules/stdlib/mod.ts` instead.

Code outside a module, such as the DevTools console or a v2 extension, uses the global directly. Inside an `iframe`, use `window.top.Spicetify`.

## What the global contains

The wrapper attaches these members to `Spicetify`. Several are filled in after Spotify's webpack modules load, so read them when you need them instead of caching them at startup.

- Player and playback: [`Player`](/docs/development/api-wrapper/methods/player), [`Queue`](/docs/development/api-wrapper/properties/queue), [`addToQueue`](/docs/development/api-wrapper/functions/add-to-queue), [`removeFromQueue`](/docs/development/api-wrapper/functions/remove-from-queue), [`getAudioData`](/docs/development/api-wrapper/functions/get-audio-data), [`colorExtractor`](/docs/development/api-wrapper/functions/color-extractor).
- Spotify internals: [`Platform`](/docs/development/api-wrapper/methods/platform), [`CosmosAsync`](/docs/development/api-wrapper/methods/cosmos-async), [`GraphQL`](/docs/development/api-wrapper/methods/graphql), [`URI`](/docs/development/api-wrapper/methods/uri), `Locale`, `Color`, `extractColorPreset`.
- UI: [`ContextMenu`](/docs/development/api-wrapper/classes/context-menu), [`Menu`](/docs/development/api-wrapper/classes/menu), [`Topbar`](/docs/development/api-wrapper/classes/topbar), [`Playbar`](/docs/development/api-wrapper/classes/playbar), [`PopupModal`](/docs/development/api-wrapper/methods/popup-modal), [`AppTitle`](/docs/development/api-wrapper/methods/app-title), [`showNotification`](/docs/development/api-wrapper/functions/show-notification), [`ReactComponent`](/docs/development/api-wrapper/properties/react-components), [`ReactHook`](/docs/development/api-wrapper/properties/react-hook), [`SVGIcons`](/docs/development/api-wrapper/properties/svgicons), [`TippyProps`](/docs/development/api-wrapper/properties/tippy-props).
- Input and storage: [`Keyboard`](/docs/development/api-wrapper/methods/keyboard), [`LocalStorage`](/docs/development/api-wrapper/methods/local-storage).
- Libraries from Spotify's bundle: see [Modules](/docs/development/api-wrapper/modules#libraries).
- v3 runtime: [`Modules`](/docs/development/api-wrapper/modules#spicetifymodules), [`Daemon`](#spicetifydaemon), [`CORSProxy`](#spicetifycorsproxy), `Events`.

`Spicetify.Events.platformLoaded.on(callback)` runs `callback` once Spotify's webpack chunks have loaded. `Spicetify.Events.webpackLoaded.on(callback)` runs it once the wrapper has added the members it reads from those chunks. A callback registered after its event runs immediately.

`Spicetify.test()` logs which expected members are missing on the running client.

v3 removed `Spicetify.Panel`, `Spicetify.getFontStyle` and the panel components. Their pages remain for v2 code.

## `Spicetify.Daemon`

`Spicetify.Daemon` talks to the local Spicetify daemon on `127.0.0.1:7967`. Every method except `available`, `daemonInfo` and `updateAndApplySupported` sends the token that `spicetify apply` injected into the page, so those methods reject on a client that a v3 apply did not patch.

```ts
namespace Daemon {
  function available(): Promise<boolean>;
  function daemonInfo(): Promise<{ version: string | null; autoUpdate: boolean | null; autoUpdateActive: boolean | null } | null>;
  function send(uri: string, options?: { expectReply?: boolean; timeoutMs?: number }): Promise<string | null>;
  function apply(): Promise<null>;
  function blockUpdates(): Promise<null>;
  function unblockUpdates(): Promise<null>;
  function setAutoUpdate(on: boolean): Promise<string>;
  function uninstallStaged(id: string, version: string): Promise<null>;
  function acquireWindowControls(onDisconnect: (error: Error) => void, options?: { timeoutMs?: number }): Promise<{ release(): Promise<void> }>;
  function updateAndApplySupported(): Promise<boolean | null>;
  const updateAndApply: {
    (): Promise<{ jobId: string; disposition: 'accepted' | 'joined' }>;
    observe(listener: (status: { kind: string }) => void): () => void;
  };
  const managedSpotify: {
    status(): Promise<unknown>;
    check(): Promise<unknown>;
    update(): Promise<unknown>;
  };
}
```

- `available` resolves `true` when the daemon's health endpoint answers.
- `daemonInfo` returns the daemon version and its automatic update setting, or `null` when the daemon is unreachable. A field is `null` when the daemon is older than that field.
- `send` sends a CLI command URI over the daemon's WebSocket and resolves with the reply text. It rejects when the reply starts with `error:` or when no reply arrives within `timeoutMs`, which defaults to 15000.
- `apply`, `blockUpdates` and `unblockUpdates` restart Spotify. They resolve once the daemon receives the command, so you must warn the user before you call them.
- `setAutoUpdate` turns the CLI's automatic updates on or off and resolves once `config.toml` records the choice.
- `uninstallStaged` removes a module that the CLI staged on disk, then runs `apply`. `Spicetify.Modules.removeLocal` cannot remove these modules.
- `acquireWindowControls` gives the caller the daemon's Windows title bar hit-test filter until it calls `release`. `onDisconnect` runs if the connection drops first.
- `updateAndApplySupported` resolves `true` when both the daemon and Spotify's `Platform.UpdateAPI` support a one-step Spotify update, and `false` or `null` otherwise.
- `updateAndApply` starts that update. `updateAndApply.observe` calls the listener with each job status and returns a function that stops observing.
- `managedSpotify` reads and updates a Spotify installation that `spicetify spotify install` manages.

In a module, read these through `client.daemon`. Its stdlib type covers `available`, `apply`, `blockUpdates`, `unblockUpdates`, `acquireWindowControls`, `updateAndApplySupported`, `updateAndApply` and `managedSpotify`.

## `Spicetify.CORSProxy`

`Spicetify.CORSProxy` routes requests that Spotify's page cannot make directly because of CORS. By default it tries the daemon's proxy and then `https://cors-proxy.spicetify.app`. A custom template replaces that chain.

```ts
namespace CORSProxy {
  type Mode = 'automatic' | 'custom';
  interface Configuration {
    mode: Mode;
    template: string | null;
    automaticTemplates: string[];
  }
  function url(target: string): string;
  function fetch(target: string, options?: RequestInit): Promise<Response>;
  function templates(): string[];
  function configuration(): Configuration;
  function configure(options: { mode: 'automatic' } | { mode: 'custom'; template: string }): Configuration;
  function isValidTemplate(template: string): boolean;
}
```

A template is an absolute `http` or `https` URL that contains `{url}`, which the proxy replaces with the target. `fetch` moves to the next template only when a request fails without a response, and returns an HTTP error response to you unchanged. `configure` throws a `TypeError` for an invalid custom template.

```ts
const response = await Spicetify.CORSProxy.fetch('https://example.com/lyrics.json');
```
