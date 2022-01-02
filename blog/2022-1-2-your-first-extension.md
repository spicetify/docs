---
slug: your-first-extension
title: Your first extension
authors: [CharlieS1103]
tags: [spicetify, documentation, community,development]
---

## So you want to make an extension....


### First step:
Start out by setting up your environment: 
In terminal or powershell, run ``spicetify enable-devtool apply``
Ensure that you have a text editor or IDE at the ready.


### Second step:
First, run spicetify config-dir, this should open up file explorer or finder(dependent on your OS), next, open the "Extensions folder" and create a file title extension.js, or whichever title you choose(For this tutorial we will be using extension.js). Open up this file, and input the following code:
```js
// The async modifier allows for the user of await, which converts a promise into an object, when not using await, async is not necessary.
(async function extension() {
    //The following code segment waits for platform to load before running the code, this is important to avoid errors. When using things such as Player or URI, it is necessary to add those as well.
    const { Platform } = Spicetify;
    if (!(Platform)) {
        setTimeout(extension, 300)
        return
    }
    console.log("Hello world!")
})()
```
Next, run ``spicetify config extensions extension.js``, and follow with ``spicetify apply``
When you open up the Spotify console, which can be done via right clicking anywhere on the page, clicking Inspect Element, and clicking console in the window that pops up, you should see "Hello World" displayed.

### Third Step:
For this example, we will be making an extension to welcome the user on load, paste the following code segment following the Hello world statement:
```js
const user = await Spicetify.Platform.UserAPI.getUser();
Spicetify.showNotification(`Hello ` + user.displayName)
```
![](../static/img/spicetify-full.png)