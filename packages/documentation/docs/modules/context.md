# Module: Context

The context object is the entrypoint for all data available to templates.
The [TContext](Context.md#tcontext) type describes this object and all its properties. See
its `pageData` property for the result of scraping the current page and
`config` for other information such as the page's current
[view](Shared.md#tview). A number of assets are made available through
its `assets` property.

**`Example`**

```hbs
<img src={{assets.images.hnLogo}} />
<div>{{config.view}}</div>
{{#each pageData.items}}
  <div>{{this.title}}</div>
{{/each}}
```

## Table of contents

### Type Aliases

- [TAssets](Context.md#tassets)
- [TConfig](Context.md#tconfig)
- [TContext](Context.md#tcontext)
- [TPageDataExtension](Context.md#tpagedataextension)

## Type Aliases

### TAssets

Ƭ **TAssets**: `Object`

Assets available to templates.

**`Example`**

```hbs
{{! in CSS using asset's full URL }}
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

```hbs
{{! in HTML using baseURL }}
<img src="{{assets.baseURL}}/images/hn_logo.svg" />
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseURL` | `string` | The assets directory's base URL. **`Example`** ``` chrome-extension://ihcblehlmbfeecfaiomaihjkeedjepoc/assets/img/content ``` **`See`** [packages/content/public/assets/img/content](https://github.com/dan-lovelace/hacker-news-pro/tree/main/packages/content/public/assets/img/content) |
| `icons` | { `chevronDown`: `string` ; `chevronDown_dark`: `string` ; `expandDown`: `string` ; `expandDown_dark`: `string`  } | Icon URLs. **`Remarks`** While Material icons are available in Handlebars templates, sometimes it is necessary to use icons in CSS such as when overriding a Bootstrap component's iconography. We include light and dark versions of icons for this purpose. |
| `icons.chevronDown` | `string` | - |
| `icons.chevronDown_dark` | `string` | - |
| `icons.expandDown` | `string` | - |
| `icons.expandDown_dark` | `string` | - |
| `images` | { `hnLogo`: `string` ; `hnLogo_256`: `string`  } | Image URLs. |
| `images.hnLogo` | `string` | - |
| `images.hnLogo_256` | `string` | - |

#### Defined in

[types/src/content/views/context.ts:46](https://github.com/dan-lovelace/hacker-news-pro/blob/91217b3/packages/types/src/content/views/context.ts#L46)

___

### TConfig

Ƭ **TConfig**: `Object`

Context configuration for the current page.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `hostname` | `string` | Current page's hostname. **`Example`** ```news.ycombinator.com``` |
| `pathname` | `string` | Current page's pathname. **`Example`** ```/newcomments``` |
| `view` | [`TView`](Shared.md#tview) | Current page's view. **`Example`** ```storyList``` |

#### Defined in

[types/src/content/views/context.ts:84](https://github.com/dan-lovelace/hacker-news-pro/blob/91217b3/packages/types/src/content/views/context.ts#L84)

___

### TContext

Ƭ **TContext**<`T`\>: `Object`

The main context object supplied to all views.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The result of parsing the current page. See the various views for return types: [Lists](Lists.md), [Items](Items.md) and [Other](Other.md). |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `assets` | [`TAssets`](Context.md#tassets) | Describes information about any available assets. |
| `config` | [`TConfig`](Context.md#tconfig) | Configuration for the current page. |
| `pageData` | `T` & [`TPageDataExtension`](Context.md#tpagedataextension) | Data associated with the current page's view. **`Example`** ``` { bodyHTML: "<p>Lorem ipsum</p>", comments: [], currentUser: { ... }, id: "37390184" } ``` |

#### Defined in

[types/src/content/views/context.ts:109](https://github.com/dan-lovelace/hacker-news-pro/blob/91217b3/packages/types/src/content/views/context.ts#L109)

___

### TPageDataExtension

Ƭ **TPageDataExtension**: `Object`

Additional properties that are not specific to any one view.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `currentUser` | { `id?`: `string` ; `isLoggedIn?`: `boolean` ; `karma?`: `number` ; `links`: { `login?`: `string` ; `logout?`: `string` ; `profile?`: `string`  }  } | Information about the current user. |
| `currentUser.id?` | `string` | User's identifier. **`Example`** ```pg``` |
| `currentUser.isLoggedIn?` | `boolean` | Whether the user is logged in. |
| `currentUser.karma?` | `number` | Karma amount. |
| `currentUser.links` | { `login?`: `string` ; `logout?`: `string` ; `profile?`: `string`  } | Links to other pages. |
| `currentUser.links.login?` | `string` | User's path to login. **`Example`** ```login?auth=abcd1234&goto=news``` |
| `currentUser.links.logout?` | `string` | User's path to logout. **`Example`** ```logout?auth=abcd1234&goto=news``` |
| `currentUser.links.profile?` | `string` | User's profile. **`Example`** ```user?id=pg``` |

#### Defined in

[types/src/content/views/context.ts:136](https://github.com/dan-lovelace/hacker-news-pro/blob/91217b3/packages/types/src/content/views/context.ts#L136)
