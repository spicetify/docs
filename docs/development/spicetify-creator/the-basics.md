---
title: The Basics
description: 🤠 Spicetify Creator 101.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

[Spicetify Creator](https://github.com/FlafyDev/spicetify-creator) is a tool to compile modern TypeScript/JavaScript code to Spicetify extensions and custom apps.

Its built-in features include:

- TypeScript and React syntax
- [Import node packages](#node-packages)
- [CSS/SCSS with PostCSS support](#css)
- Extremely fast compile time with esbuild.
- [Plugins](#plugins)

## Getting Started

The easiest way to start using Spicetify Creator is with Create Spicetify App.  
Create Spicetify App allows you to effortlessly create new Spicetify Creator projects through the terminal.

Install Node.js and either npm or Yarn.  
Open the terminal in your desired directory and enter the following command

<Tabs groupId="package-managers">
  <TabItem value="npm" label="npm" default>
    ```shell
      npx create-spicetify-app
    ```
  </TabItem>
  <TabItem value="yarn" label="Yarn">
    ```shell
      yarn create spicetify-app
    ```
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    ```shell
      pnpm create spicetify-app
    ```
  </TabItem>
</Tabs>

The command will ask you 3-4 simple questions about the app you plan to create and generate a Spicetify Creator project accordingly.  
After creation, read one of the following pages depending on what type of app you chose to create.

<div style={{width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', padding: '20px', textAlign: 'center'}}>
  <span style={{margin: '0 20px'}}><a href='/docs/development/spicetify-creator/create-extensions'>Create Extensions</a></span>
  <span style={{margin: '0 20px'}}><a href='/docs/development/spicetify-creator/create-custom-apps'>Create Custom Apps</a></span>
</div>

## CSS

To apply a CSS/SCSS file to your app you have to import it like this:

```ts
import './my-css-file.css'; // For CSS
import './my-scss-file.scss'; // For SCSS
```

There is also support for [CSS Modules](https://github.com/css-modules/css-modules) and you import them like this:

```ts
import styles from './item-list.module.css'; // For CSS
import styles from './item-list.module.scss'; // For SCSS
```

## Node packages

You can use node packages in your app by installing them with your package manager.

<Tabs groupId="package-managers">
  <TabItem value="npm" label="npm" default>
    ```shell
      npm install <package-name>
    ```
  </TabItem>
  <TabItem value="yarn" label="Yarn">
    ```shell
      yarn add <package-name>
    ```
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    ```shell
      pnpm add <package-name>
    ```
  </TabItem>
</Tabs>

then simply import the package in the code and you're good to go.

```ts
import packageName from '<package-name>';
```

## Plugins

Plugins are node packages designed for Spicetify Creator projects, and they support either extensions, custom apps, or both.  
The convention is to name every plugin like so: `spcr-<name>`.

For a list of plugins: https://github.com/FlafyDev/spicetify-creator-plugins

To install and import a plugin:
<Tabs groupId="package-managers">
<TabItem value="npm" label="npm" default>
    ```shell
      npm install spcr-<name>
    ```
  </TabItem>
  <TabItem value="yarn" label="Yarn">
    ```shell
      yarn add spcr-<name>
    ```
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    ```shell
      pnpm add spcr-<name>
    ```
  </TabItem>
</Tabs>

```ts
import plugin from 'spcr-<name>';
```

#### Example of 2 plugins you can already use in your own apps:

- [spcr-settings](https://github.com/FlafyDev/spicetify-creator-plugins/tree/main/packages/spcr-settings)
- [spcr-navigation-bar](https://github.com/FlafyDev/spicetify-creator-plugins/tree/main/packages/spcr-navigation-bar)

## Update Spicetify Creator

<Tabs groupId="package-managers">
  <TabItem value="npm" label="npm" default>
    ```shell
      npm update spicetify-creator
    ```
  </TabItem>
  <TabItem value="yarn" label="Yarn">
    ```shell
      yarn upgrade spicetify-creator
    ```
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    ```shell
      pnpm update spicetify-creator
    ```
  </TabItem>
</Tabs>
