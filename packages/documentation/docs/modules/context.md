[Home](../README.md) / context

# Module: context

## Table of contents

### Type Aliases

- [TAssets](context.md#tassets)
- [TConfig](context.md#tconfig)
- [TContext](context.md#tcontext)
- [TPageDataExtension](context.md#tpagedataextension)

## Type Aliases

### TAssets

Ƭ **TAssets**: `Object`

Assets available to templates.

**`Example`**

```ts
// in CSS using asset's full URL
{{#with assets.icons}}
  .accordion {
    --bs-accordion-btn-icon: url('{{expandDown}}');
    --bs-accordion-btn-active-icon: url('{{expandDown}}');
  }

  [data-bs-theme=dark] .accordion-button:after {
    --bs-accordion-btn-icon: url('{{expandDown_dark}}');
    --bs-accordion-btn-active-icon: url('{{expandDown_dark}}');
  }
{{/with}}
```

**`Example`**

```ts
// in HTML using baseURL
<img src="{{assets.baseURL}}/images/hn_logo.svg" />
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseURL` | `string` | The assets directory's base URL. **`Example`** ```ts "chrome-extension://ihcblehlmbfeecfaiomaihjkeedjepoc/assets/img/content" ``` **`See`** [packages/content/public/assets/img/content](https://github.com/dan-lovelace/hacker-news-pro/tree/main/packages/content/public/assets/img/content) |
| `icons` | { `chevronDown`: `string` ; `chevronDown_dark`: `string` ; `expandDown`: `string` ; `expandDown_dark`: `string`  } | Icon URLs. **`Remarks`** While Material icons are available in Handlebars templates, sometimes it is necessary to use icons in CSS such as when overriding a Bootstrap component's iconography. We include light and dark versions of icons for this purpose. |
| `icons.chevronDown` | `string` | - |
| `icons.chevronDown_dark` | `string` | - |
| `icons.expandDown` | `string` | - |
| `icons.expandDown_dark` | `string` | - |
| `images` | { `hnLogo`: `string` ; `hnLogo_256`: `string`  } | Image URLs. |
| `images.hnLogo` | `string` | - |
| `images.hnLogo_256` | `string` | - |

#### Defined in

[types/src/content/views/context.ts:27](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/context.ts#L27)

___

### TConfig

Ƭ **TConfig**: `Object`

Context configuration for the current page.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `hostname` | `string` | Current page's hostname. **`Example`** ```ts "news.ycombinator.com" ``` |
| `pathname` | `string` | Current page's pathname. **`Example`** ```ts "/newcomments" ``` |
| `view` | [`TView`](shared.md#tview) | Current page's view. **`Example`** ```ts "storyList" ``` |

#### Defined in

[types/src/content/views/context.ts:62](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/context.ts#L62)

___

### TContext

Ƭ **TContext**<`T`\>: `Object`

The main context object supplied to all views.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The result of parsing the current page. See the [scraper](scraper.md) package's classes for return types. |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `assets` | [`TAssets`](context.md#tassets) | Describes information about any available assets. |
| `config` | [`TConfig`](context.md#tconfig) | Configuration for the current page. |
| `pageData` | `T` & [`TPageDataExtension`](context.md#tpagedataextension) | Data associated with the current page's view. **`Example`** ```ts { * bodyHTML: "<p>Lorem ipsum</p>", * comments: [], * currentUser: { ... }, * id: "37390184" * } ``` |

#### Defined in

[types/src/content/views/context.ts:87](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/context.ts#L87)

___

### TPageDataExtension

Ƭ **TPageDataExtension**: `Object`

Additional properties that are not specific to any one view.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `currentUser` | { `id?`: `string` ; `isLoggedIn?`: `boolean` ; `karma?`: `number` ; `links`: { `login?`: `string` ; `logout?`: `string` ; `profile?`: `string`  }  } | Information about the current user. |
| `currentUser.id?` | `string` | User's identifier. **`Example`** ```ts "pg" ``` |
| `currentUser.isLoggedIn?` | `boolean` | Whether the user is logged in. |
| `currentUser.karma?` | `number` | Karma amount. |
| `currentUser.links` | { `login?`: `string` ; `logout?`: `string` ; `profile?`: `string`  } | Links to other pages. |
| `currentUser.links.login?` | `string` | User's path to login. **`Example`** ```ts "login?auth=abcd1234&goto=news" ``` |
| `currentUser.links.logout?` | `string` | User's path to logout. **`Example`** ```ts "logout?auth=abcd1234&goto=news" ``` |
| `currentUser.links.profile?` | `string` | User's profile. **`Example`** ```ts "user?id=pg" ``` |

#### Defined in

[types/src/content/views/context.ts:112](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/context.ts#L112)
