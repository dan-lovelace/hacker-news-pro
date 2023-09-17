# Lists

## Table of contents

### Type Aliases

- [TCommentList](Lists.md#tcommentlist)
- [TJobList](Lists.md#tjoblist)
- [TStoryList](Lists.md#tstorylist)

## Type Aliases

### TCommentList

Ƭ **TCommentList**: `Object`

List page that displays comment items.

**`Remarks`**

Sample page: https://news.ycombinator.com/newcomments

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | [`TCommentListItem`](Shared.md#tcommentlistitem)[] | List of comment items. |
| `links` | `Pick`<[`TLinks`](Shared.md#tlinks), ``"more"``\> | Links to other pages. **`Example`** ```?p=2``` |

#### Defined in

[types/src/content/views/lists/commentList.ts:7](https://github.com/dan-lovelace/hacker-news-pro/blob/7efaa07/packages/types/src/content/views/lists/commentList.ts#L7)

___

### TJobList

Ƭ **TJobList**: `Object`

List page that displays job items.

**`Remarks`**

Sample page: https://news.ycombinator.com/jobs

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | [`TJobListItem`](Shared.md#tjoblistitem)[] | List of job items. |
| `links` | `Pick`<[`TLinks`](Shared.md#tlinks), ``"more"``\> | Links to other pages. **`Example`** ```jobs?next=37196872``` |

#### Defined in

[types/src/content/views/lists/jobList.ts:7](https://github.com/dan-lovelace/hacker-news-pro/blob/7efaa07/packages/types/src/content/views/lists/jobList.ts#L7)

___

### TStoryList

Ƭ **TStoryList**: `Object`

List page that displays story items.

**`Remarks`**

Sample page: https://news.ycombinator.com/newest

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | [`TStoryListItem`](Shared.md#tstorylistitem)[] | List of story items. |
| `links` | `Pick`<[`TLinks`](Shared.md#tlinks), ``"more"``\> | Links to other pages. **`Example`** ```?p=2``` |

#### Defined in

[types/src/content/views/lists/storyList.ts:7](https://github.com/dan-lovelace/hacker-news-pro/blob/7efaa07/packages/types/src/content/views/lists/storyList.ts#L7)
