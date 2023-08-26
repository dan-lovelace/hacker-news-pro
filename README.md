# Hacker News Pro

A browser extension for developers to create their own custom Hacker News
interfaces using HTML and CSS. The built-in code editor makes theme creation a
breeze. Also comes with a number of premade themes.

<!-- TODO: add links to stores -->
<!-- TODO: add screenshots -->

## How it works

TBD

# Creating your first theme

TBD

# Template API

TBD

# Contributing

Hacker News Pro is open source and looking for contributors! If you'd like to
make changes, first check
[open issues](https://github.com/dan-lovelace/hacker-news-pro/issues) to see if
anyone else is working in a similar area. To make a change:

1. Follow the [Local Development](#local-development) section below to get up
   and running locally
1. Create a new branch with a name that describes the types of changes being
   made (i.e. `feature/gif-previews`)
1. Make code changes locally, testing as you go
1. Once you're happy with the updates:
   [create a new PR](https://github.com/dan-lovelace/hacker-news-pro/compare),
   fill out the template and assign another contributor

## Other methods

If writing code is not your thing and you're considering a monetary
contribution, the easiest way is through Buy Me a Coffee.

<a href="https://www.buymeacoffee.com/danlovelace" target="_blank">
   <img
      src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
      alt="Buy Me A Coffee"
      style="aspect-ratio: 1 / .276; height: 50px"
   />
</a>

<br />

# Local Development

## Requirements

- [NodeJS](https://nodejs.org/en/blog/release/v18.17.1/) v18.17.1
- [Yarn](https://yarnpkg.com/) v1.22.19

## 1. Install

```sh
$ git clone https://github.com/dan-lovelace/hacker-news-pro.git
$ cd hacker-news-pro
$ yarn
```

## 2. Build

Once complete, build assets can be located in the `dist` directory at the
project root. Keep this in mind when adding the unpacked version to your browser
for testing.

### Build commands

| Command        | Description                                                                      |
| -------------- | -------------------------------------------------------------------------------- |
| `yarn start`   | Creates a Manifest V3 build and starts file watchers on all packages<sup>+</sup> |
| `yarn build 2` | Creates a build using Manifest V2                                                |
| `yarn build 3` | Creates a build using Manifest V3                                                |

<sup>+</sup> If you'd instead like to develop using V2, you'll need to copy the
contents of [assets/manifest-v2.json](./assets/manifest-v2.json) into
[packages/content/public/manifest.json](./packages/content/public/manifest.json)
and run a clean build. Be sure to remove the `$schema` property after doing so.

## 3. Add browser extension

After starting or building, the extension's distribution is located in the
`dist` directory at the root of the project. Add the unpacked assets to your
browser of choice. For now, Manifest V3 builds are only supported by Chrome.

Chrome: https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked

Firefox:
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing

## Hot reloading

Hot reloading allows you to save time by automatically restarting the extension
and refreshing the page when changes are made. If you are working on the `popup`
package, simply close the popup window and reopen it. However, other packages
require the hot reload server running in the background. To enable the server,
add `WATCH=true` to the `yarn start` command like this:

```sh
$ WATCH=true yarn start
```

### Notes

Hot reloading is not perfect and you'll likely need to manually refresh the
extension from time to time. If it seems like it's refreshing before files are
done building, you may change the debounce timing in the
[reload script itself](./scripts/hot-reload/src/index.ts) by modifying the
`debounceMs` variable. You may also notice the error
`Extension context invalidated` which seems to be caused by selecting the
"Extensions" page where the extension is loaded. If possible, avoid focusing
this page and let the hot reload feature do it's thing.

There are several other configurations in the script such as on which port to
start the websocket server and any files to exclude from the watch list.

### CLI options

| Option       | Description                      |
| ------------ | -------------------------------- |
| `WATCH=true` | Enables the file watcher         |
| `QUIET=true` | Disables console output messages |

## Tips

### Clearing storage

It can be helpful when making code changes to delete all storage items and start
from scratch. To do that, inspect the background script in the browser's
extension UI and run the following command in the console:

```js
chrome.storage.local.get((result) => {
  Object.keys(result).forEach((key) => chrome.storage.local.remove(key));
});
```

# Creating & publishing versions

To create and package a new version for publishing:

1. Increment the version in `package.json` - Use
   [Semantic Versioning](https://semver.org/) standards
1. Run `yarn package <manifest version>` - Target either Manifest version `2` or
   `3` (i.e. `yarn package 3`)
1. Inspect the output zip file in the `versions` directory to make sure
   everything looks right

Log in to either the [Chrome Web Store](https://chrome.google.com/webstore/)
(Manifest V3) or [Firefox Addon Hub](https://addons.mozilla.org/en-US/firefox/)
(Manifest V2), upload the new version and submit for review.

When complete, create a new release in GitHub with a tag that matches the new
version (i.e. `v0.0.1`). Highlight changes under a "Changes" heading as seen in
previous releases.
