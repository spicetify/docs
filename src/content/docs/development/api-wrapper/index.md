---
title: API Wrapper
description: 🧰 Everything you need to know about the Spicetify object and API Wrapper.
---

:::note
This reference covers the `Spicetify` compatibility wrapper. v2 extensions access it directly; v3 modules import stdlib's typed `client` capability surface, whose members adapt the same underlying APIs. Pages carry a warning where v3 differs, checked against a running v3 client on Spotify 1.2.94.

If you are writing a new v3 module, [Building a module](/docs/development/building-a-module) is the place to start. If you have existing v2 extension code, use the [migration guide](/docs/development/migrating-v2-extensions). This page is the reference for what you can call once you are there.
:::
Making an extension from scratch can be a daunting task. Luckily, Spicetify provides a powerful API Wrapper that makes it easy to interact with Spotify's internal APIs as well as provide out-of-the-box methods to help you easily create extensions.

## Spicetify Object
You can access the Spicetify object by typing `Spicetify` in the DevTools console, inside your extension, or `window.top.Spicetify` if you're developing an app inside an `iframe`.

```ts
Spicetify
```

Navigate the sidebar to see all the methods and properties available in the Spicetify object!
