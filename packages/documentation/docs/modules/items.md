[Home](../README.md) / items

# Module: items

## Table of contents

### Type Aliases

- [TCommentItem](items.md#tcommentitem)
- [TJobItem](items.md#tjobitem)
- [TPollItem](items.md#tpollitem)
- [TStoryItem](items.md#tstoryitem)

## Type Aliases

### TCommentItem

Ƭ **TCommentItem**: [`TCommentListItem`](shared.md#tcommentlistitem) & { `comments`: [`TComment`](shared.md#tcomment)[] ; `forms`: `Pick`<[`TForms`](shared.md#tforms), ``"comment"``\> ; `links`: `Pick`<[`TLinks`](shared.md#tlinks), ``"more"``\>  }

Item page that displays a comment.

**`Remarks`**

Sample page: https://news.ycombinator.com/item?id=2921983

#### Defined in

[types/src/content/views/items/commentItem.ts:7](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/items/commentItem.ts#L7)

___

### TJobItem

Ƭ **TJobItem**: [`TJobListItem`](shared.md#tjoblistitem) & { `bodyHTML?`: `string`  }

Item page that displays a job.

**`Remarks`**

Sample page: https://news.ycombinator.com/item?id=37320729

#### Defined in

[types/src/content/views/items/jobItem.ts:7](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/items/jobItem.ts#L7)

___

### TPollItem

Ƭ **TPollItem**: [`TStoryListItem`](shared.md#tstorylistitem) & { `comments`: [`TComment`](shared.md#tcomment)[] ; `links`: `Pick`<[`TLinks`](shared.md#tlinks), ``"more"``\> ; `options`: [`TPollOptionItem`](shared.md#tpolloptionitem)[]  }

Item page that displays a poll.

**`Remarks`**

Sample page: https://news.ycombinator.com/item?id=126809

#### Defined in

[types/src/content/views/items/pollItem.ts:7](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/items/pollItem.ts#L7)

___

### TStoryItem

Ƭ **TStoryItem**: [`TStoryListItem`](shared.md#tstorylistitem) & { `bodyHTML?`: `string` ; `comments`: [`TComment`](shared.md#tcomment)[] ; `forms`: `Pick`<[`TForms`](shared.md#tforms), ``"comment"``\> ; `links`: `Pick`<[`TLinks`](shared.md#tlinks), ``"more"``\>  }

Item page that displays a story.

**`Remarks`**

Sample page: https://news.ycombinator.com/item?id=37392676

#### Defined in

[types/src/content/views/items/storyItem.ts:7](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/types/src/content/views/items/storyItem.ts#L7)
