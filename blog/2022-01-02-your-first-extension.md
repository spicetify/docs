---
slug: your-first-extension
title: Your First Extension
authors: [charlies1103]
tags: [spicetify, documentation, community, development]
---

## So you want to make an extension....

### First step:

Start out by setting up your environment:
In terminal or powershell, run `spicetify enable-devtools`
If at any point devtools stops working, simply run this command again.
Ensure that you have a text editor or IDE ready.

### Second step:

Firstly, run `spicetify config-dir`, this should open up your default file manager. Secondly, open the `Extensions` folder and create a file titled `extension.js`, or whichever title you choose, for this tutorial we will be using extension.js for consistency purposes. Finally, open this file, and paste the following code:

```js
// The async modifier allows for the user of await, which converts a promise into an object, when not using await, async is not necessary.
(async function extension() {
  // The following code segment waits for platform to load before running the code, this is important to avoid errors. When using things such as Player or URI, it is necessary to add those as well.
  const { Platform } = Spicetify;
  if (!Platform) {
    setTimeout(extension, 300);
    return;
  }
  console.log('Hello world!');
})();
```

Next, run `spicetify config extensions extension.js`, and follow with `spicetify apply`.
Open up the Spotify console, which can be done via right clicking anywhere on the page, however, there are some places that Spotify overrides this right click; if that is the case, right click somewhere else. Then, click `Inspect Element`, and open the console tab in the window that just popped up. You should see your new "Hello World" displayed!

### Third Step:

Let's finish up this blog post by creating a message that welcomes the user on load. For that, you can paste the following code segment in place of the `console.log("Hello world!"); `statement:

```js
const user = await Spicetify.Platform.UserAPI.getUser();
Spicetify.showNotification(`Hello ` + user.displayName);
```
