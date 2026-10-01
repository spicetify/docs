---
title: Spicetify v2
description: Documentation for the released v2 CLI, kept while v2 is the stable release.
category_index: true
---

This section documents **Spicetify v2**, the released, stable CLI. It is still what `install.sh` and `install.ps1` give you by default, and it is what most people are running today.

[Spicetify v3](/docs/getting-started) is the rewrite: one kind of add-on instead of four, a store inside Spotify, and a client that repairs itself after Spotify updates. It is the current version; this section stays while v2 is still supported.

:::note
The two are not interchangeable. They keep their backups differently and must never be pointed at the same client. If you are moving between them, restore with the one you applied with first. [What changes in v3](/docs/whats-new) has the full path.
:::

## Using v2

- [Getting started](/docs/legacy/getting-started) installs v2 and applies it
- [Customization](/docs/legacy/customization) covers the Marketplace, themes, extensions and custom apps
- [Configuration reference](/docs/legacy/customization/config-file) documents `config-xpui.ini`
- [CLI reference](/docs/legacy/cli) documents the v2 commands
- [Uninstallation](/docs/legacy/uninstallation)
- [FAQ](/docs/legacy/faq)

## Developing for v2

- [Themes](/docs/legacy/development/themes), [extensions](/docs/legacy/development/extensions) and [custom apps](/docs/legacy/development/custom-apps)
- [JS modules](/docs/legacy/development/js-modules)
- [Spicetify Creator](/docs/legacy/spicetify-creator/the-basics), the v2 authoring toolchain

In v3 all of the above are one thing, a [module](/docs/development/building-a-module).

## The API reference is shared

The `Spicetify` global that v2 extensions use is the same surface v3 modules get, so [the API reference](/docs/development/api-wrapper) is not duplicated here. It applies to both.
