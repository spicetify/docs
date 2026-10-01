---
title: Development
description: Build modules for Spicetify v3, and work on Spicetify itself.
category_index: true
---

In v3, everything you add to Spotify is a module: a theme, an extension, or a page in the sidebar. All of them use the same format and the same toolchain, `@spicetify/kit`.

## Building modules

These pages take a module from scaffold to the Module Store:

- [Building a module](/docs/development/building-a-module) covers the scaffold, the dev loop, stdlib, dependencies, tests, and the build.
- [Porting a v2 extension](/docs/development/migrating-v2-extensions) moves a classic extension onto the v3 lifecycle.
- [Publishing a module](/docs/development/publishing) covers the vault submission, the checks CI runs, and new versions.
- [The API reference](/docs/development/api-wrapper) documents the `Spicetify` wrapper that stdlib's `client` object wraps.

The rules `spicetify-kit check` enforces are in the [module standard](https://github.com/spicetify/modules/blob/main/docs/module-standard.md).

## Debugging the client

These pages help you inspect Spotify while you develop:

- [React DevTools](/docs/development/react-devtools) inspects the client's component tree.
- [Spotify CLI flags](/docs/development/spotify-cli-flags) lists the switches Spotify accepts.

`spicetify dev` turns on Spotify's developer mode, which adds Inspect Element to the client.

## Working on Spicetify

[Compiling](/docs/development/compiling) builds the CLI and daemon from source.

