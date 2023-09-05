<h1>
   <span>
      Hacker News Pro
   </span>
   <a href="https://www.buymeacoffee.com/danlovelace" target="_blank">
      <img
         src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
         alt="Buy Me A Coffee"
         style="aspect-ratio: 1 / .276; height: 38px; float: right;"
      />
   </a>
</h1>

Welcome to Hacker News Pro, the browser extension designed for developers to
create their own unique, fully-customized
[Hacker News](https://news.ycombinator.com/) interfaces using HTML and CSS. The
built-in code editor makes theme creation a breeze. Explore a collection of
pre-made themes that may be cloned and edited to get up and running quickly.

Available for
[![chrome logo](./assets/img/chrome_logo.svg) Chrome](https://chrome.google.com/webstore/detail/hacker-news-pro/ihcblehlmbfeecfaiomaihjkeedjepoc)
and
[![firefox logo](./assets/img/firefox_logo.svg) Firefox](https://addons.mozilla.org/en-US/firefox/addon/hacker-news-pro/).

# Table of contents

1. [Template reference](#template-reference)
1. [Theming](#theming)
   - [Views](#views)
   - [Components](#components)
   - [Styles](#styles)
1. [Local development](#local-development)
   - [Requirements](#requirements)
   - [Install](#install)
   - [Build](#build)
     - [Build commands](#build-commands)
   - [Add unpacked extension](#add-unpacked-extension)
   - [Hot reloading](#hot-reloading)
     - [Notes](#notes)
     - [CLI options](#cli-options)
   - [Tips](#tips)
     - [Clearing storage](#clearing-storage)
1. [Creating and publishing versions](#creating-and-publishing-versions)

# Template reference

Templates in Hacker News Pro are written using
[Handlebars](https://handlebarsjs.com/). As you navigate Hacker News pages, the
extension works quietly in the background, scraping page contents and
transforming them into an object internally known as the page's "context." You
can explore the comprehensive types reference for the context object
[here](https://dan-lovelace.github.io/hacker-news-pro/modules/types_views.html).

When you're just starting, consider enabling "Developer mode" on the extension's
**Options** page. This mode prints the context object to the console each time
Hacker News Pro re-renders the page, helping you quickly grasp what's available
to your templates without frequent trips to the documentation.

In addition to the context object, a number of
[Handlebars helpers](https://handlebarsjs.com/guide/block-helpers.html#basic-blocks)
are available to your templates.
[Check out our documentation](https://dan-lovelace.github.io/hacker-news-pro/modules/handlebars_helpers.html)
for more details.

# Theming

Theming lies at the core of Hacker News Pro, enabling you to write a
personalized Hacker News experience by defining your own HTML and CSS. Themes
are made up of three fundamental elements: Views, Components, and Styles.

## Views

Views correspond to specific Hacker News page types and fall into three
categories:

- **Lists**: Pages that display various types of items, such as stories or jobs.
  For example, the homepage or https://news.ycombinator.com/newcomments.
- **Items**: Pages that show detailed information about a single item, like the
  comments page for a story. Items can belong to one of four types: story,
  comment, job, or poll.
- **Other**: Any page that doesn't fit the List or Item category. For instance,
  the comment reply or submission pages.

## Components

Themes often require the use of templates across multiple views. Components,
defined using Handlebars' **Partials** syntax, come in handy here. Give a
component a name, like "Header," which can then be injected into other templates
using `{{> header}}`. Refer to the
[Handlebars partials guide](https://handlebarsjs.com/guide/partials.html) for
more details.

## Styles

A well-rounded theme encompasses its unique style. When crafting your theme,
several methods are available for defining styles:

- **Custom CSS**: Write your own custom CSS to tailor the theme to your liking.
- **Bootstrap**: Hacker News Pro ships with
  [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
  which makes it easy to add personalized styles without needing to write
  extensive custom CSS.
- **Material Icons**: Add a special touch to your theme using Google's
  [Material icons](https://fonts.google.com/icons).

# Local development

## Requirements

- [NodeJS](https://nodejs.org/en/blog/release/v18.17.1/) v18.17.1
- [Yarn](https://yarnpkg.com/) v1.22.19

## Install

```bash
$ git clone https://github.com/dan-lovelace/hacker-news-pro.git
$ cd hacker-news-pro
$ yarn
```

## Build

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

## Add unpacked extension

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

```bash
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

# Creating and publishing versions

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
