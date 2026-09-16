---
title: Development
description: Build modules for Spicetify v3, and work on Spicetify itself.
category_index: true
---

Everything you can add to Spotify in v3 is a module: a theme, an extension, a whole page in the sidebar. One format, one toolchain.

## Building modules

- [Building a module](/docs/development/building-a-module) takes you from `npm create spicetify-module` to something running in your client, through a dev loop that pushes changes in about a second.
- [Porting a v2 extension](/docs/development/migrating-v2-extensions) maps the classic IIFE, wrapper UI, listeners, styles and packaging onto the v3 lifecycle.
- [Publishing a module](/docs/development/publishing) covers submitting it to the store and what CI checks before it merges.
- [The API reference](/docs/development/api-wrapper) documents the `Spicetify` global your module talks to.

The rules a module has to follow live in the [module standard](https://github.com/spicetify/modules/blob/main/docs/module-standard.md), next to the code that enforces them.

## Debugging the client

- [React DevTools](/docs/development/react-devtools) for inspecting the client's component tree.
- [Spotify CLI flags](/docs/development/spotify-cli-flags) for the switches Spotify itself understands, including the remote debugging port the dev loop uses.
- `spicetify dev` turns on Inspect Element in the client.

## Working on Spicetify

- [Compiling](/docs/development/compiling) builds the CLI from source, which is currently how you run v3.

## Coming from v2

Extensions, custom apps and Spicetify Creator are v2 concepts. They still work with v2 and their guides are in the [legacy section](/docs/legacy); in v3 all three are modules. [What changes in v3](/docs/whats-new) maps the old model onto the new one, and the [extension migration guide](/docs/development/migrating-v2-extensions) walks through a real port.
