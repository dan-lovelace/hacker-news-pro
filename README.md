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

In development mode via `yarn start`, hot reloading is enabled by default. All
changes to the `dist` directory automatically reload the extension and the
browser page after a brief wait. You may turn this off using a `NO_WATCH`
environment variable like so:

```sh
$ NO_WATCH=true yarn start
```

There are several other configurations in the
[reload script itself](./scripts/hot-reload/src/index.ts) such as on which port
to start the websocket server and any files to exclude from the watch list.

### All options

| Option          | Description                       |
| --------------- | --------------------------------- |
| `NO_WATCH=true` | Disables hot reloading altogether |
| `QUIET=true`    | Disables console output messages  |

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
