[Home](../README.md) / lists

# Module: lists

## Table of contents

### Type Aliases

- [TCommentList](lists.md#tcommentlist)
- [TJobList](lists.md#tjoblist)
- [TStoryList](lists.md#tstorylist)

## Type Aliases

### TCommentList

Ƭ **TCommentList**: `Object`

List page that displays comment items.

**`Remarks`**

Sample page: https://news.ycombinator.com/newcomments

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | [`TCommentListItem`](shared.md#tcommentlistitem)[] | List of comment items. |
| `links` | `Pick`<[`TLinks`](shared.md#tlinks), ``"more"``\> | Links to other pages. **`Example`** ```ts "?p=2" ``` |

#### Defined in

[types/src/content/views/lists/commentList.ts:7](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/lists/commentList.ts#L7)

___

### TJobList

Ƭ **TJobList**: `Object`

List page that displays job items.

**`Remarks`**

Sample page: https://news.ycombinator.com/jobs

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | [`TJobListItem`](shared.md#tjoblistitem)[] | List of job items. |
| `links` | `Pick`<[`TLinks`](shared.md#tlinks), ``"more"``\> | Links to other pages. **`Example`** ```ts "jobs?next=37196872" ``` |

#### Defined in

[types/src/content/views/lists/jobList.ts:7](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/lists/jobList.ts#L7)

___

### TStoryList

Ƭ **TStoryList**: `Object`

List page that displays story items.

**`Remarks`**

Sample page: https://news.ycombinator.com/newest

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | [`TStoryListItem`](shared.md#tstorylistitem)[] | List of story items. |
| `links` | `Pick`<[`TLinks`](shared.md#tlinks), ``"more"``\> | Links to other pages. **`Example`** ```ts "?p=2" ``` |

#### Defined in

[types/src/content/views/lists/storyList.ts:7](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/lists/storyList.ts#L7)
