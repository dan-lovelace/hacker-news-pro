[Home](../README.md) / shared

# Module: shared

Types shared across the various views.

## Table of contents

### Type Aliases

- [TAge](shared.md#tage)
- [TComment](shared.md#tcomment)
- [TCommentListItem](shared.md#tcommentlistitem)
- [TForm](shared.md#tform)
- [TForms](shared.md#tforms)
- [TInteractions](shared.md#tinteractions)
- [TJobListItem](shared.md#tjoblistitem)
- [TLinks](shared.md#tlinks)
- [TPollOptionItem](shared.md#tpolloptionitem)
- [TSite](shared.md#tsite)
- [TStoryListItem](shared.md#tstorylistitem)
- [TStoryType](shared.md#tstorytype)
- [TUser](shared.md#tuser)
- [TView](shared.md#tview)
- [TViewRoute](shared.md#tviewroute)
- [TVoteDirection](shared.md#tvotedirection)

### Variables

- [viewRouteMap](shared.md#viewroutemap)
- [voteDirections](shared.md#votedirections)

## Type Aliases

### TAge

Ƭ **TAge**: `Object`

Age information for a specific item.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `humanized?` | `string` | Human-readable creation time. **`Example`** ```ts "2 hours ago" ``` |
| `timestamp?` | `string` | Timestamp in UTC format. **`Example`** ```ts "2023-09-03T14:53:21Z" ``` **`Remarks`** There are Handlebars helpers to display formatted timestamps: - `timestampDate` - Renders the date portion of the given timestamp - `timestampTime` - Renders the time portion **`Example`** ```ts <span>{{timestampDate age.timestamp}}</span> ``` |

#### Defined in

[types/src/content/views/shared.ts:41](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/shared.ts#L41)

___

### TComment

Ƭ **TComment**: `Object`

User comment and its replies.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `comments` | [`TComment`](shared.md#tcomment)[] | List of replies. |
| `data` | { `age`: [`TAge`](shared.md#tage) ; `bodyHTML?`: `string` ; `collapsed`: { `count?`: `number` ; `value`: `boolean`  } ; `id`: `string` ; `interactions`: `Pick`<[`TInteractions`](shared.md#tinteractions), ``"next"`` \| ``"parent"`` \| ``"prev"`` \| ``"toggle"`` \| ``"voteDown"`` \| ``"voteUp"``\> ; `links`: `Pick`<[`TLinks`](shared.md#tlinks), ``"item"`` \| ``"reply"``\> ; `user?`: [`TUser`](shared.md#tuser) ; `voted?`: [`TVoteDirection`](shared.md#tvotedirection)  } | Comment information. |
| `data.age` | [`TAge`](shared.md#tage) | When the comment was created. |
| `data.bodyHTML?` | `string` | HTML of the body. **`Remarks`** Should be used with Handlebar's triple-brace escape syntax: `{{{bodyHTML}}}`. |
| `data.collapsed` | { `count?`: `number` ; `value`: `boolean`  } | Information about the comment's collapsed status. |
| `data.collapsed.count?` | `number` | Number of collapsed items. **`Remarks`** When a comment is collapsed in Hacker News, the toggle element is replaced to show the number of collapsed children such as `[17 more]`. We capture the number of children as the `count` value only when a comment is collapsed. Its count will be `undefined` when expanded. |
| `data.collapsed.value` | `boolean` | Whether the comment is collapsed. **`Remarks`** A `value` of `true` indicates the comment is collapsed. When a comment is collapsed, access to its voting buttons is lost which must be taken into account when writing comment tree components. |
| `data.id` | `string` | The Hacker News identifier. **`Example`** ```ts "2921983" ``` |
| `data.interactions` | `Pick`<[`TInteractions`](shared.md#tinteractions), ``"next"`` \| ``"parent"`` \| ``"prev"`` \| ``"toggle"`` \| ``"voteDown"`` \| ``"voteUp"``\> | User interactions. |
| `data.links` | `Pick`<[`TLinks`](shared.md#tlinks), ``"item"`` \| ``"reply"``\> | Links to other pages. **`Example`** ```ts "item?id=37369826" ``` |
| `data.user?` | [`TUser`](shared.md#tuser) | User that created the comment. |
| `data.voted?` | [`TVoteDirection`](shared.md#tvotedirection) | Whether the current user has voted on the comment and how. |
| `depth` | `number` | Comment's depth in the tree. |

#### Defined in

[types/src/content/views/shared.ts:62](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/shared.ts#L62)

___

### TCommentListItem

Ƭ **TCommentListItem**: `Object`

Single comment item.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `age` | [`TAge`](shared.md#tage) | When the item was created. |
| `bodyHTML?` | `string` | HTML of the body. **`Remarks`** Should be used with Handlebar's triple-brace escape syntax: `{{{bodyHTML}}}`. |
| `id?` | `string` | The Hacker News identifier. **`Example`** ```ts "2921983" ``` |
| `interactions` | `Pick`<[`TInteractions`](shared.md#tinteractions), ``"voteDown"`` \| ``"voteUp"``\> | User interactions. |
| `links` | `Pick`<[`TLinks`](shared.md#tlinks), ``"context"`` \| ``"favorite"`` \| ``"flag"`` \| ``"next"`` \| ``"parent"`` \| ``"story"`` \| ``"unflag"``\> | Links to other pages. **`Example`** ```ts "item?id=37369826" ``` |
| `story` | { `title`: [`TStoryListItem`](shared.md#tstorylistitem)[``"title"``]  } | The associated story. |
| `story.title` | [`TStoryListItem`](shared.md#tstorylistitem)[``"title"``] | Story's title. |
| `user?` | [`TUser`](shared.md#tuser) | User that created the comment. |
| `voted?` | [`TVoteDirection`](shared.md#tvotedirection) | Whether the current user has voted on the comment and how. |

#### Defined in

[types/src/content/views/shared.ts:131](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/shared.ts#L131)

___

### TForm

Ƭ **TForm**: `Object`

HTML form.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | `string` | The endpoint of the submit action. **`Example`** ```ts "comment" ``` |
| `hiddenInputsHTML?` | `string` | HTML of hidden inputs. **`Remarks`** Should be used with Handlebar's triple-brace escape syntax: `{{{hiddenInputsHTML}}}`. |
| `method?` | `string` | The HTTP method associated with the form. **`Example`** ```ts "post" ``` |

#### Defined in

[types/src/content/views/shared.ts:175](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/shared.ts#L175)

___

### TForms

Ƭ **TForms**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `comment?` | [`TForm`](shared.md#tform) | Comment or reply form. |
| `submit?` | [`TForm`](shared.md#tform) | Submit form on the `/submit` page. |

#### Defined in

[types/src/content/views/shared.ts:197](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/shared.ts#L197)

___

### TInteractions

Ƭ **TInteractions**: `Object`

User actions that may either redirect or perform an inline page update.
These are HTML strings that must be used with a `<hnp-interaction>` web
component.

**`Example`**

```ts
<hnp-interaction from="{{interactions.hide}}">hide</hnp-interaction>
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `hide?` | `string` | Hides the selected item from view. |
| `next?` | `string` | Navigates to the next item. |
| `parent?` | `string` | The item's parent, typically a comment. |
| `prev?` | `string` | Previous instances of the linked item. |
| `toggle?` | `string` | Collapses the item, typically a comment. |
| `voteDown?` | `string` | Downvotes an item. |
| `voteUp?` | `string` | Upvotes an item. |

#### Defined in

[types/src/content/views/shared.ts:212](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/shared.ts#L212)

___

### TJobListItem

Ƭ **TJobListItem**: `Object`

Single job item.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `age` | [`TAge`](shared.md#tage) | When the job was created. |
| `links` | `Pick`<[`TLinks`](shared.md#tlinks), ``"from"`` \| ``"hide"`` \| ``"item"``\> | Links to other pages. **`Example`** ```ts "item?id=37286598" ``` |
| `site?` | [`TSite`](shared.md#tsite) | Information about the linked site. |
| `title?` | `string` | The job's title. |

#### Defined in

[types/src/content/views/shared.ts:236](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/shared.ts#L236)

___

### TLinks

Ƭ **TLinks**: `Object`

Elements that only perform a redirect when clicked.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `string` | Location of comment in a tree. |
| `favorite?` | `string` | Adds the item to the user's list of favorites. |
| `flag?` | `string` | Flags an item. |
| `from?` | `string` | List of items from the same domain. |
| `hide?` | `string` | Removes an item from view. **`Remarks`** While this is named the same as `hide` on `TInteraction`, not all items perform an inline hide and reload the page instead. Such examples may be seen on job item pages: https://news.ycombinator.com/item?id=37320729. |
| `item?` | `string` | Item's pathname. |
| `more?` | `string` | The next page. |
| `next?` | `string` | The next item in a list. |
| `parent?` | `string` | Comment's parent. |
| `past?` | `string` | Item's search results on hn.algolia.com. |
| `reply?` | `string` | Comment's reply page. |
| `story?` | `string` | Comment's story. |
| `unflag?` | `string` | Unflags an item. |

#### Defined in

[types/src/content/views/shared.ts:254](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/shared.ts#L254)

___

### TPollOptionItem

Ƭ **TPollOptionItem**: `Object`

Single option in a poll.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id?` | `string` | The Hacker News identifier. **`Example`** ```ts "126812" ``` |
| `interactions` | `Pick`<[`TInteractions`](shared.md#tinteractions), ``"voteDown"`` \| ``"voteUp"``\> | User interactions. |
| `score?` | `number` | The poll item's score. |
| `title?` | `string` | Title of the option. |
| `voted?` | [`TVoteDirection`](shared.md#tvotedirection) | Whether the current user has voted on the option and how. |

#### Defined in

[types/src/content/views/shared.ts:302](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/shared.ts#L302)

___

### TSite

Ƭ **TSite**: `Object`

Item's linked site or article.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Short version of the linked site. **`Example`** ```ts "nature.com" ``` |
| `url` | `string` | Full URL of the linked article. **`Example`** ```ts "https://www.nature.com/articles/s41612-023-00427-x" ``` |

#### Defined in

[types/src/content/views/shared.ts:323](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/shared.ts#L323)

___

### TStoryListItem

Ƭ **TStoryListItem**: `Object`

Single story item.

**`Remarks`**

Sample page: https://news.ycombinator.com/item?id=37371084

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `age` | [`TAge`](shared.md#tage) | When the story was created. |
| `commentsCount?` | `number` | The number of comments on the story. |
| `id?` | `string` | The Hacker News identifier. **`Example`** ```ts "37371084" ``` |
| `interactions` | `Pick`<[`TInteractions`](shared.md#tinteractions), ``"hide"`` \| ``"voteDown"`` \| ``"voteUp"``\> | User interactions. |
| `links` | `Pick`<[`TLinks`](shared.md#tlinks), ``"favorite"`` \| ``"flag"`` \| ``"from"`` \| ``"item"`` \| ``"past"`` \| ``"unflag"``\> | Links to other pages. **`Example`** ```ts "item?id=37371084" ``` |
| `score?` | `number` | The story item's score. |
| `site?` | [`TSite`](shared.md#tsite) | Information about the linked site. |
| `title?` | `string` | The story's title. |
| `type?` | [`TStoryType`](shared.md#tstorytype) | Type of story. |
| `user?` | [`TUser`](shared.md#tuser) | User that created the story. |
| `voted?` | [`TVoteDirection`](shared.md#tvotedirection) | Whether the current user has voted on the story and how. |

#### Defined in

[types/src/content/views/shared.ts:367](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/shared.ts#L367)

___

### TStoryType

Ƭ **TStoryType**: ``"article"`` \| ``"ask"`` \| ``"internal"`` \| ``"job"`` \| ``"launch"`` \| ``"poll"`` \| ``"show"`` \| ``"tell"``

The inferred story type.

**`Remarks`**

There's no way to tell for sure the type of story but we can try to make an
estimated guess by looking at either its title or surrounding elements.

Descriptions:
- `article` - Links to an article outside of HN
- `ask` - "Ask HN" posts
- `internal` - Links to an internal HN item page that does not fit any other type
- `job` - Job posts
- `launch` - "Launch HN" posts
- `poll` - HN polls
- `show` - "Show HN" posts
- `tell` - "Tell HN" posts

#### Defined in

[types/src/content/views/shared.ts:353](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/shared.ts#L353)

___

### TUser

Ƭ **TUser**: `Object`

User that submitted an item.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id?` | `string` | The user's Hacker News identifier. **`Example`** ```ts "pg" ``` |
| `link?` | `string` | Link to the user's profile page. **`Example`** ```ts "user?id=pg" ``` |

#### Defined in

[types/src/content/views/shared.ts:412](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/shared.ts#L412)

___

### TView

Ƭ **TView**: ``"commentItem"`` \| ``"commentList"`` \| ``"jobItem"`` \| ``"jobList"`` \| ``"pollItem"`` \| ``"reply"`` \| ``"storyItem"`` \| ``"storyList"`` \| ``"submit"`` \| ``"unknown"`` \| ``"user"``

#### Defined in

[types/src/content/views/shared.ts:426](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/shared.ts#L426)

___

### TViewRoute

Ƭ **TViewRoute**: `Object`

Maps a route to a particular view.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The pathname to the given route. **`Example`** ```ts "/news" ``` |
| `view` | [`TView`](shared.md#tview) | The route's associated view. **`Example`** ```ts "storyList" ``` |

#### Defined in

[types/src/content/views/shared.ts:440](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/shared.ts#L440)

___

### TVoteDirection

Ƭ **TVoteDirection**: typeof [`voteDirections`](shared.md#votedirections)[`number`]

How an item may be voted upon.

**`Remarks`**

If `undefined`, the user has not yet voted. If they have, will be either
`up` or `down`.

#### Defined in

[types/src/content/views/shared.ts:460](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/shared.ts#L460)

## Variables

### viewRouteMap

• `Const` **viewRouteMap**: `Record`<`string`, [`TView`](shared.md#tview)\>

Map of routes and their related view.

#### Defined in

[types/src/content/views/shared.ts:10](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/shared.ts#L10)

___

### voteDirections

• `Const` **voteDirections**: readonly [``"down"``, ``"up"``]

How an item may be voted upon.

#### Defined in

[types/src/content/views/shared.ts:38](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/shared.ts#L38)
