---
title: Building And Testing
description: 🛠 Ensuring the quality of your creations.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Building

Open a terminal in the project's directory and run this:

<Tabs groupId="package-managers">
  <TabItem value="npm" label="npm" default>
    ```shell
    npm run build
    ```
  </TabItem>
  <TabItem value="yarn" label="Yarn">
    ```shell
    yarn run build
    ```
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    ```shell
    pnpm build
    ```
  </TabItem>
</Tabs>

Then make sure you've added your app to Spicetify's config by running this:

<Tabs groupId="app-types">
  <TabItem value="extension" label="Extension" default>
    ```shell
    spicetify config extensions my-app.js
    ```
  </TabItem>
  <TabItem value="custom-app" label="Custom App">
    ```shell
    spicetify config custom_apps my-app
    ```
  </TabItem>
</Tabs>

Finally, do

```shell
spicetify apply
```

and you'll see your app in Spotify.

## Watching

Please first [build your app](#building) at least once before watching.

Watching means that it'll rebuild the app every time the code changes.  
Go into your project's directory and enter the following command:
<Tabs groupId="package-managers">
<TabItem value="npm" label="npm" default>
    ```shell
    npm run watch
    ```
  </TabItem>
  <TabItem value="yarn" label="Yarn">
    ```shell
    yarn run watch
    ```
  </TabItem>
<TabItem value="pnpm" label="pnpm" default>
    ```shell
    pnpm watch
    ```
  </TabItem>
</Tabs>

Then, run Spotify in watch mode:

<Tabs groupId="app-types">
  <TabItem value="extension" label="Extension" default>
    ```shell
    spicetify watch -le
    ```
  </TabItem>
  <TabItem value="custom-app" label="Custom App">
    ```shell
    spicetify watch -la
    ```
  </TabItem>
</Tabs>

## Building locally

If you want to upload the build files with your repository or just see them, you can do:

<Tabs groupId="package-managers">
  <TabItem value="npm" label="npm" default>
    ```shell
    npm run build-local
    ```
  </TabItem>
  <TabItem value="yarn" label="Yarn">
    ```shell
    yarn run build-local
    ```
  </TabItem>
  <TabItem value="pnpm" label="pnpm" default>
    ```shell
    pnpm build-local
    ```
  </TabItem>
</Tabs>

And the compiled files will be created in a local `dist` folder.
