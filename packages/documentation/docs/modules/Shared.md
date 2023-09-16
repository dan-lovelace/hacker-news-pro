# Shared

Types shared across the various [page views](Shared.md#tview).

## Table of contents

### Type Aliases

- [TAge](Shared.md#tage)
- [TComment](Shared.md#tcomment)
- [TCommentListItem](Shared.md#tcommentlistitem)
- [TForm](Shared.md#tform)
- [TForms](Shared.md#tforms)
- [TInteractions](Shared.md#tinteractions)
- [TJobListItem](Shared.md#tjoblistitem)
- [TLinks](Shared.md#tlinks)
- [TPollOptionItem](Shared.md#tpolloptionitem)
- [TSite](Shared.md#tsite)
- [TStoryListItem](Shared.md#tstorylistitem)
- [TStoryType](Shared.md#tstorytype)
- [TUser](Shared.md#tuser)
- [TView](Shared.md#tview)
- [TViewRoute](Shared.md#tviewroute)
- [TVoteDirection](Shared.md#tvotedirection)

### Variables

- [routeViewMap](Shared.md#routeviewmap)
- [voteDirections](Shared.md#votedirections)

## Type Aliases

### TAge

Ƭ **TAge**: `Object`

Age information for a specific item.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `humanized?` | `string` | Human-readable creation time. **`Example`** ```2 hours ago``` |
| `timestamp?` | `string` | Timestamp in UTC format. **`Example`** ```2023-09-03T14:53:21Z``` **`Remarks`** There are Handlebars helpers to display formatted timestamps: `timestampDate` - Renders the date portion of the given timestamp. `timestampTime` - Renders the time portion. **`Example`** ```hbs <span>{{timestampDate age.timestamp}}</span> ``` |

#### Defined in

[types/src/content/views/shared.ts:50](https://github.com/dan-lovelace/hacker-news-pro/blob/bdc735c/packages/types/src/content/views/shared.ts#L50)

___

### TComment

Ƭ **TComment**: `Object`

User comment and its replies.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `comments` | [`TComment`](Shared.md#tcomment)[] | List of replies. |
| `data` | { `age`: [`TAge`](Shared.md#tage) ; `bodyHTML?`: `string` ; `collapsed`: { `count?`: `number` ; `value`: `boolean`  } ; `id`: `string` ; `interactions`: `Pick`<[`TInteractions`](Shared.md#tinteractions), ``"next"`` \| ``"parent"`` \| ``"prev"`` \| ``"root"`` \| ``"toggle"`` \| ``"voteDown"`` \| ``"voteUp"``\> ; `links`: `Pick`<[`TLinks`](Shared.md#tlinks), ``"item"`` \| ``"reply"``\> ; `user?`: [`TUser`](Shared.md#tuser) ; `voted?`: [`TVoteDirection`](Shared.md#tvotedirection)  } | Comment information. |
| `data.age` | [`TAge`](Shared.md#tage) | When the comment was created. |
| `data.bodyHTML?` | `string` | HTML of the body. **`Remarks`** Should be used with Handlebar's triple-brace escape syntax: `{{{bodyHTML}}}`. |
| `data.collapsed` | { `count?`: `number` ; `value`: `boolean`  } | Information about the comment's collapsed status. |
| `data.collapsed.count?` | `number` | Number of collapsed items. **`Remarks`** When a comment is collapsed in Hacker News, the toggle element is replaced to show the number of collapsed children such as `[17 more]`. We capture the number of children as the `count` value only when a comment is collapsed. Its count will be `undefined` when expanded. |
| `data.collapsed.value` | `boolean` | Whether the comment is collapsed. **`Remarks`** A `value` of `true` indicates the comment is collapsed. When a comment is collapsed, access to its voting buttons is lost which must be taken into account when writing comment tree components. |
| `data.id` | `string` | The Hacker News identifier. **`Example`** ```2921983``` |
| `data.interactions` | `Pick`<[`TInteractions`](Shared.md#tinteractions), ``"next"`` \| ``"parent"`` \| ``"prev"`` \| ``"root"`` \| ``"toggle"`` \| ``"voteDown"`` \| ``"voteUp"``\> | User interactions. |
| `data.links` | `Pick`<[`TLinks`](Shared.md#tlinks), ``"item"`` \| ``"reply"``\> | Links to other pages. **`Example`** ```item?id=37369826``` |
| `data.user?` | [`TUser`](Shared.md#tuser) | User that created the comment. |
| `data.voted?` | [`TVoteDirection`](Shared.md#tvotedirection) | Whether the current user has voted on the comment and how. |
| `depth` | `number` | Comment's depth in the tree. |

#### Defined in

[types/src/content/views/shared.ts:73](https://github.com/dan-lovelace/hacker-news-pro/blob/bdc735c/packages/types/src/content/views/shared.ts#L73)

___

### TCommentListItem

Ƭ **TCommentListItem**: `Object`

Single comment item.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `age` | [`TAge`](Shared.md#tage) | When the item was created. |
| `bodyHTML?` | `string` | HTML of the body. **`Remarks`** Should be used with Handlebar's triple-brace escape syntax: `{{{bodyHTML}}}`. |
| `id?` | `string` | The Hacker News identifier. **`Example`** ```2921983``` |
| `interactions` | `Pick`<[`TInteractions`](Shared.md#tinteractions), ``"voteDown"`` \| ``"voteUp"``\> | User interactions. |
| `links` | `Pick`<[`TLinks`](Shared.md#tlinks), ``"context"`` \| ``"favorite"`` \| ``"flag"`` \| ``"next"`` \| ``"parent"`` \| ``"story"`` \| ``"unflag"``\> | Links to other pages. **`Example`** ```item?id=37369826``` |
| `story` | { `title`: [`TStoryListItem`](Shared.md#tstorylistitem)[``"title"``]  } | The associated story. |
| `story.title` | [`TStoryListItem`](Shared.md#tstorylistitem)[``"title"``] | Story's title. |
| `user?` | [`TUser`](Shared.md#tuser) | User that created the comment. |
| `voted?` | [`TVoteDirection`](Shared.md#tvotedirection) | Whether the current user has voted on the comment and how. |

#### Defined in

[types/src/content/views/shared.ts:142](https://github.com/dan-lovelace/hacker-news-pro/blob/bdc735c/packages/types/src/content/views/shared.ts#L142)

___

### TForm

Ƭ **TForm**: `Object`

HTML form.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | `string` | The endpoint of the submit action. **`Example`** ```comment``` |
| `hiddenInputsHTML?` | `string` | HTML of hidden inputs. **`Remarks`** Should be used with Handlebar's triple-brace escape syntax: `{{{hiddenInputsHTML}}}`. |
| `method?` | `string` | The HTTP method associated with the form. **`Example`** ```post``` |

#### Defined in

[types/src/content/views/shared.ts:186](https://github.com/dan-lovelace/hacker-news-pro/blob/bdc735c/packages/types/src/content/views/shared.ts#L186)

___

### TForms

Ƭ **TForms**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `comment?` | [`TForm`](Shared.md#tform) | Comment or reply form. |
| `submit?` | [`TForm`](Shared.md#tform) | Submit form on the `/submit` page. |

#### Defined in

[types/src/content/views/shared.ts:208](https://github.com/dan-lovelace/hacker-news-pro/blob/bdc735c/packages/types/src/content/views/shared.ts#L208)

___

### TInteractions

Ƭ **TInteractions**: `Object`

User actions that may either redirect or perform an inline page update.
These are HTML strings that must be used with a `<hnp-interaction>` web
component.

**`Example`**

```hbs
<hnp-interaction from="{{interactions.hide}}">hide</hnp-interaction>
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `hide?` | `string` | Hides the selected item from view. |
| `next?` | `string` | Navigates to the next item. |
| `parent?` | `string` | The item's parent, typically a comment. |
| `prev?` | `string` | Previous instances of the linked item or the previous comment. |
| `root?` | `string` | The item's root, typically a comment. |
| `toggle?` | `string` | Collapses the item, typically a comment. |
| `voteDown?` | `string` | Downvotes an item. |
| `voteUp?` | `string` | Upvotes an item. |

#### Defined in

[types/src/content/views/shared.ts:225](https://github.com/dan-lovelace/hacker-news-pro/blob/bdc735c/packages/types/src/content/views/shared.ts#L225)

___

### TJobListItem

Ƭ **TJobListItem**: `Object`

Single job item.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `age` | [`TAge`](Shared.md#tage) | When the job was created. |
| `links` | `Pick`<[`TLinks`](Shared.md#tlinks), ``"from"`` \| ``"hide"`` \| ``"item"``\> | Links to other pages. **`Example`** ```item?id=37286598``` |
| `site?` | [`TSite`](Shared.md#tsite) | Information about the linked site. |
| `title?` | `string` | The job's title. |

#### Defined in

[types/src/content/views/shared.ts:252](https://github.com/dan-lovelace/hacker-news-pro/blob/bdc735c/packages/types/src/content/views/shared.ts#L252)

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
| `hide?` | `string` | Removes an item from view. **`Remarks`** While this is named the same as `hide` on `TInteraction`, some items reload the page instead of performing an inline hide. Such examples may be seen on job item pages: https://news.ycombinator.com/item?id=37320729. |
| `item?` | `string` | Item's pathname. |
| `more?` | `string` | The next page. |
| `next?` | `string` | The next item in a list. |
| `parent?` | `string` | Comment's parent. |
| `past?` | `string` | Item's search results on hn.algolia.com. |
| `reply?` | `string` | Comment's reply page. |
| `story?` | `string` | Comment's story. |
| `unflag?` | `string` | Unflags an item. |

#### Defined in

[types/src/content/views/shared.ts:270](https://github.com/dan-lovelace/hacker-news-pro/blob/bdc735c/packages/types/src/content/views/shared.ts#L270)

___

### TPollOptionItem

Ƭ **TPollOptionItem**: `Object`

Single option in a poll.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id?` | `string` | The Hacker News identifier. **`Example`** ```126812``` |
| `interactions` | `Pick`<[`TInteractions`](Shared.md#tinteractions), ``"voteDown"`` \| ``"voteUp"``\> | User interactions. |
| `score?` | `number` | The poll item's score. |
| `title?` | `string` | Title of the option. |
| `voted?` | [`TVoteDirection`](Shared.md#tvotedirection) | Whether the current user has voted on the option and how. |

#### Defined in

[types/src/content/views/shared.ts:318](https://github.com/dan-lovelace/hacker-news-pro/blob/bdc735c/packages/types/src/content/views/shared.ts#L318)

___

### TSite

Ƭ **TSite**: `Object`

Item's linked site or article.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Short version of the linked site. **`Example`** ```nature.com``` |
| `url` | `string` | Full URL of the linked article. **`Example`** ```https://www.nature.com/articles/s41612-023-00427-x``` |

#### Defined in

[types/src/content/views/shared.ts:339](https://github.com/dan-lovelace/hacker-news-pro/blob/bdc735c/packages/types/src/content/views/shared.ts#L339)

___

### TStoryListItem

Ƭ **TStoryListItem**: `Object`

Single story item.

**`Remarks`**

Sample page: https://news.ycombinator.com/item?id=37371084

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `age` | [`TAge`](Shared.md#tage) | When the story was created. |
| `commentsCount?` | `number` | The number of comments on the story. |
| `id?` | `string` | The Hacker News identifier. **`Example`** ```37371084``` |
| `interactions` | `Pick`<[`TInteractions`](Shared.md#tinteractions), ``"hide"`` \| ``"voteDown"`` \| ``"voteUp"``\> | User interactions. |
| `links` | `Pick`<[`TLinks`](Shared.md#tlinks), ``"favorite"`` \| ``"flag"`` \| ``"from"`` \| ``"item"`` \| ``"past"`` \| ``"unflag"``\> | Links to other pages. **`Example`** ```item?id=37371084``` |
| `score?` | `number` | The story item's score. |
| `site?` | [`TSite`](Shared.md#tsite) | Information about the linked site. |
| `title?` | `string` | The story's title. |
| `type?` | [`TStoryType`](Shared.md#tstorytype) | Type of story. |
| `user?` | [`TUser`](Shared.md#tuser) | User that created the story. |
| `voted?` | [`TVoteDirection`](Shared.md#tvotedirection) | Whether the current user has voted on the story and how. |

#### Defined in

[types/src/content/views/shared.ts:383](https://github.com/dan-lovelace/hacker-news-pro/blob/bdc735c/packages/types/src/content/views/shared.ts#L383)

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

[types/src/content/views/shared.ts:369](https://github.com/dan-lovelace/hacker-news-pro/blob/bdc735c/packages/types/src/content/views/shared.ts#L369)

___

### TUser

Ƭ **TUser**: `Object`

User that submitted an item.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id?` | `string` | The user's Hacker News identifier. **`Example`** ```pg``` |
| `link?` | `string` | Link to the user's profile page. **`Example`** ```user?id=pg``` |

#### Defined in

[types/src/content/views/shared.ts:428](https://github.com/dan-lovelace/hacker-news-pro/blob/bdc735c/packages/types/src/content/views/shared.ts#L428)

___

### TView

Ƭ **TView**: ``"commentItem"`` \| ``"commentList"`` \| ``"jobItem"`` \| ``"jobList"`` \| ``"pollItem"`` \| ``"reply"`` \| ``"storyItem"`` \| ``"storyList"`` \| ``"submit"`` \| ``"unknown"`` \| ``"user"``

Page categories. Check out [routeViewMap](Shared.md#routeviewmap) for more information about
how these are determined.

**`Remarks`**

Pages fall into one of three categories in Hacker News Pro: **List**,
**Item** and **Other**. A **List** page shows a list of items such as the
homepage or `/jobs` page. **Item** pages show detailed information about a
particular item such as the comments page for a given submission. Another
example of an item page might be a comment's reply page. You can discern
item pages by their URL; they always begin with `/item` followed by a query
string containing the item's identifier (i.e. `/item?id=123456`). Page types
in the **Other** category describe any page that is not a **List** or
**Item** such as the submission page `/submit`.

If a view resolves to `unknown`, then Hacker News Pro does not currently
support it. An example of an unsupported page would be a user's profile
page: `/user?id=pg`. It is the goal of Hacker News Pro to eventually support
all pages. If you need one supported right away, don't hesitate to let us
know by
[opening a feature request](https://github.com/dan-lovelace/hacker-news-pro/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=).

#### Defined in

[types/src/content/views/shared.ts:463](https://github.com/dan-lovelace/hacker-news-pro/blob/bdc735c/packages/types/src/content/views/shared.ts#L463)

___

### TViewRoute

Ƭ **TViewRoute**: `Object`

Maps a route to a particular view.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The pathname to the given route. **`Example`** ```/news``` |
| `view` | [`TView`](Shared.md#tview) | The route's associated view. **`Example`** ```storyList``` |

#### Defined in

[types/src/content/views/shared.ts:477](https://github.com/dan-lovelace/hacker-news-pro/blob/bdc735c/packages/types/src/content/views/shared.ts#L477)

___

### TVoteDirection

Ƭ **TVoteDirection**: typeof [`voteDirections`](Shared.md#votedirections)[`number`]

How an item may be voted upon.

**`Remarks`**

If `undefined`, the user has not yet voted. If they have, will be either
`up` or `down`.

#### Defined in

[types/src/content/views/shared.ts:497](https://github.com/dan-lovelace/hacker-news-pro/blob/bdc735c/packages/types/src/content/views/shared.ts#L497)

## Variables

### routeViewMap

• `Const` **routeViewMap**: `Record`<`string`, [`TView`](Shared.md#tview)\>

Map of routes and their related view.

**`Remarks`**

Most views can be determined by the page's pathname. For example, we can
easily look at the homepage pathname of `/` and know it is a `storyList`
view and we know `/newcomments` is always of type `commentList`. One
exception are [item](Items.md) types since they all begin with the same
path of `/item`. For those, custom logic is needed that parses the page
scraper result to come to a conclusion. See the
[getView](https://github.com/dan-lovelace/hacker-news-pro/blob/main/packages/scraper/src/lib/parsers/views.ts)
method in the scraper package for how Hacker News Pro does this.

#### Defined in

[types/src/content/views/shared.ts:19](https://github.com/dan-lovelace/hacker-news-pro/blob/bdc735c/packages/types/src/content/views/shared.ts#L19)

___

### voteDirections

• `Const` **voteDirections**: readonly [``"down"``, ``"up"``]

How an item may be voted upon.

#### Defined in

[types/src/content/views/shared.ts:47](https://github.com/dan-lovelace/hacker-news-pro/blob/bdc735c/packages/types/src/content/views/shared.ts#L47)
