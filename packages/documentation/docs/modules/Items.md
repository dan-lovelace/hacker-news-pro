# Items

## Table of contents

### Type Aliases

- [TCommentItem](Items.md#tcommentitem)
- [TJobItem](Items.md#tjobitem)
- [TPollItem](Items.md#tpollitem)
- [TStoryItem](Items.md#tstoryitem)

## Type Aliases

### TCommentItem

Ƭ **TCommentItem**: [`TCommentListItem`](Shared.md#tcommentlistitem) & { `comments`: [`TComment`](Shared.md#tcomment)[] ; `forms`: `Pick`<[`TForms`](Shared.md#tforms), ``"comment"``\> ; `links`: `Pick`<[`TLinks`](Shared.md#tlinks), ``"more"``\>  }

Item page that displays a comment.

**`Remarks`**

Sample page: https://news.ycombinator.com/item?id=2921983

#### Defined in

[types/src/content/views/items/commentItem.ts:7](https://github.com/dan-lovelace/hacker-news-pro/blob/dc12d01/packages/types/src/content/views/items/commentItem.ts#L7)

___

### TJobItem

Ƭ **TJobItem**: [`TJobListItem`](Shared.md#tjoblistitem) & { `bodyHTML?`: `string`  }

Item page that displays a job.

**`Remarks`**

Sample page: https://news.ycombinator.com/item?id=37320729

#### Defined in

[types/src/content/views/items/jobItem.ts:7](https://github.com/dan-lovelace/hacker-news-pro/blob/dc12d01/packages/types/src/content/views/items/jobItem.ts#L7)

___

### TPollItem

Ƭ **TPollItem**: [`TStoryListItem`](Shared.md#tstorylistitem) & { `comments`: [`TComment`](Shared.md#tcomment)[] ; `links`: `Pick`<[`TLinks`](Shared.md#tlinks), ``"more"``\> ; `options`: [`TPollOptionItem`](Shared.md#tpolloptionitem)[]  }

Item page that displays a poll.

**`Remarks`**

Sample page: https://news.ycombinator.com/item?id=126809

#### Defined in

[types/src/content/views/items/pollItem.ts:7](https://github.com/dan-lovelace/hacker-news-pro/blob/dc12d01/packages/types/src/content/views/items/pollItem.ts#L7)

___

### TStoryItem

Ƭ **TStoryItem**: [`TStoryListItem`](Shared.md#tstorylistitem) & { `bodyHTML?`: `string` ; `comments`: [`TComment`](Shared.md#tcomment)[] ; `forms`: `Pick`<[`TForms`](Shared.md#tforms), ``"comment"``\> ; `links`: `Pick`<[`TLinks`](Shared.md#tlinks), ``"more"``\>  }

Item page that displays a story.

**`Remarks`**

Sample page: https://news.ycombinator.com/item?id=37392676

#### Defined in

[types/src/content/views/items/storyItem.ts:7](https://github.com/dan-lovelace/hacker-news-pro/blob/dc12d01/packages/types/src/content/views/items/storyItem.ts#L7)
