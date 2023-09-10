[Home](../README.md) / scraper

# Module: scraper

Hacker News Pro page scraper.

## Table of contents

### Classes

- [CommentItem](../classes/scraper.CommentItem.md)
- [CommentList](../classes/scraper.CommentList.md)
- [JobItem](../classes/scraper.JobItem.md)
- [JobList](../classes/scraper.JobList.md)
- [PollItem](../classes/scraper.PollItem.md)
- [Reply](../classes/scraper.Reply.md)
- [StoryItem](../classes/scraper.StoryItem.md)
- [StoryList](../classes/scraper.StoryList.md)
- [Submit](../classes/scraper.Submit.md)
- [Unknown](../classes/scraper.Unknown.md)

### Interfaces

- [IParsable](../interfaces/scraper.IParsable.md)

### Variables

- [SELECTORS](scraper.md#selectors)

### Functions

- [buildCommentTree](scraper.md#buildcommenttree)
- [getAge](scraper.md#getage)
- [getBodyHTML](scraper.md#getbodyhtml)
- [getCommentListItem](scraper.md#getcommentlistitem)
- [getComments](scraper.md#getcomments)
- [getCommentsCount](scraper.md#getcommentscount)
- [getForm](scraper.md#getform)
- [getJobListItem](scraper.md#getjoblistitem)
- [getMoreLink](scraper.md#getmorelink)
- [getNodeHTML](scraper.md#getnodehtml)
- [getPageData](scraper.md#getpagedata)
- [getPollOptionItem](scraper.md#getpolloptionitem)
- [getRowId](scraper.md#getrowid)
- [getRowIndent](scraper.md#getrowindent)
- [getScore](scraper.md#getscore)
- [getStoryListItem](scraper.md#getstorylistitem)
- [getVoteInteractions](scraper.md#getvoteinteractions)
- [pipe](scraper.md#pipe)

## Variables

### SELECTORS

• `Const` **SELECTORS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `commentTree` | (`within`: ``null`` \| `Document` \| `Element`) => `undefined` \| ``null`` \| `Element` |
| `forms` | { `comment`: (`within?`: ``null`` \| `Document` \| `Element`) => `undefined` \| ``null`` \| `Element` ; `submission`: (`within?`: ``null`` \| `Document` \| `Element`) => `undefined` \| ``null`` \| `Element`  } |
| `forms.comment` | (`within?`: ``null`` \| `Document` \| `Element`) => `undefined` \| ``null`` \| `Element` |
| `forms.submission` | (`within?`: ``null`` \| `Document` \| `Element`) => `undefined` \| ``null`` \| `Element` |
| `links` | { `context`: (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` ; `favorite`: (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` ; `flag`: (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `HTMLAnchorElement` ; `from`: (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` ; `hide`: (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` ; `item`: (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` ; `more`: (`within?`: ``null`` \| `Document` \| `Element`) => `undefined` \| ``null`` \| `Element` ; `next`: (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` ; `parent`: (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` ; `past`: (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` ; `story`: (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` ; `unflag`: (`within?`: ``null`` \| `Element`) => `undefined` \| `HTMLAnchorElement` ; `vote`: (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element`  } |
| `links.context` | (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` |
| `links.favorite` | (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` |
| `links.flag` | (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `HTMLAnchorElement` |
| `links.from` | (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` |
| `links.hide` | (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` |
| `links.item` | (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` |
| `links.more` | (`within?`: ``null`` \| `Document` \| `Element`) => `undefined` \| ``null`` \| `Element` |
| `links.next` | (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` |
| `links.parent` | (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` |
| `links.past` | (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` |
| `links.story` | (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` |
| `links.unflag` | (`within?`: ``null`` \| `Element`) => `undefined` \| `HTMLAnchorElement` |
| `links.vote` | (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` |
| `score` | (`within?`: ``null`` \| `Element`) => `undefined` \| ``null`` \| `Element` |

#### Defined in

[scraper/src/lib/selectors.ts:3](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/selectors.ts#L3)

## Functions

### buildCommentTree

▸ **buildCommentTree**(`input`, `currentIndex`, `depth`): [[`TComment`](shared.md#tcomment)[], `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [{ `age`: [`TAge`](shared.md#tage) ; `bodyHTML?`: `string` ; `collapsed`: { `count?`: `number` ; `value`: `boolean`  } ; `id`: `string` ; `interactions`: `Pick`<[`TInteractions`](shared.md#tinteractions), ``"next"`` \| ``"parent"`` \| ``"prev"`` \| ``"toggle"`` \| ``"voteDown"`` \| ``"voteUp"``\> ; `links`: `Pick`<[`TLinks`](shared.md#tlinks), ``"reply"`` \| ``"item"``\> ; `user?`: [`TUser`](shared.md#tuser) ; `voted?`: ``"down"`` \| ``"up"``  }, `number`][] |
| `currentIndex` | `number` |
| `depth` | `number` |

#### Returns

[[`TComment`](shared.md#tcomment)[], `number`]

#### Defined in

[scraper/src/lib/utils.ts:21](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/utils.ts#L21)

___

### getAge

▸ **getAge**(`parent?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | ``null`` \| `Element` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `humanized` | `undefined` \| `string` |
| `timestamp` | `undefined` \| `string` |

#### Defined in

[scraper/src/lib/parsers/views.ts:23](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/parsers/views.ts#L23)

___

### getBodyHTML

▸ **getBodyHTML**(`parent?`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | ``null`` \| `Element` |

#### Returns

`undefined` \| `string`

#### Defined in

[scraper/src/lib/parsers/views.ts:42](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/parsers/views.ts#L42)

___

### getCommentListItem

▸ **getCommentListItem**(`parent?`): [`TCommentListItem`](shared.md#tcommentlistitem)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | ``null`` \| `Element` |

#### Returns

[`TCommentListItem`](shared.md#tcommentlistitem)

#### Defined in

[scraper/src/lib/parsers/views.ts:64](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/parsers/views.ts#L64)

___

### getComments

▸ **getComments**(`parent?`): [`TComment`](shared.md#tcomment)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | ``null`` \| `Element` |

#### Returns

[`TComment`](shared.md#tcomment)[]

#### Defined in

[scraper/src/lib/parsers/views.ts:117](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/parsers/views.ts#L117)

___

### getCommentsCount

▸ **getCommentsCount**(`parent?`): `undefined` \| `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | ``null`` \| `Element` |

#### Returns

`undefined` \| `number`

#### Defined in

[scraper/src/lib/parsers/views.ts:201](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/parsers/views.ts#L201)

___

### getForm

▸ **getForm**(`form?`): [`TForm`](shared.md#tform)

#### Parameters

| Name | Type |
| :------ | :------ |
| `form?` | ``null`` \| `Element` |

#### Returns

[`TForm`](shared.md#tform)

#### Defined in

[scraper/src/lib/parsers/views.ts:224](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/parsers/views.ts#L224)

___

### getJobListItem

▸ **getJobListItem**(`parent?`): [`TJobListItem`](shared.md#tjoblistitem)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | ``null`` \| `Element` |

#### Returns

[`TJobListItem`](shared.md#tjoblistitem)

#### Defined in

[scraper/src/lib/parsers/views.ts:246](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/parsers/views.ts#L246)

___

### getMoreLink

▸ **getMoreLink**(`parent?`): [`TLinks`](shared.md#tlinks)[``"more"``]

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | ``null`` \| `Document` \| `Element` |

#### Returns

[`TLinks`](shared.md#tlinks)[``"more"``]

#### Defined in

[scraper/src/lib/parsers/views.ts:272](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/parsers/views.ts#L272)

___

### getNodeHTML

▸ **getNodeHTML**(`node?`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node?` | `Node` |

#### Returns

`undefined` \| `string`

#### Defined in

[scraper/src/lib/utils.ts:3](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/utils.ts#L3)

___

### getPageData

▸ **getPageData**<`T`\>(`view`): `any`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TView`](shared.md#tview) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `view` | `T` |

#### Returns

`any`

#### Defined in

[scraper/src/lib/parsers/index.ts:72](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/parsers/index.ts#L72)

___

### getPollOptionItem

▸ **getPollOptionItem**(`parent?`): [`TPollOptionItem`](shared.md#tpolloptionitem)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | ``null`` \| `Element` |

#### Returns

[`TPollOptionItem`](shared.md#tpolloptionitem)

#### Defined in

[scraper/src/lib/parsers/views.ts:278](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/parsers/views.ts#L278)

___

### getRowId

▸ **getRowId**(`id`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`string`

#### Defined in

[scraper/src/lib/utils.ts:12](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/utils.ts#L12)

___

### getRowIndent

▸ **getRowIndent**(`row`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `Element` |

#### Returns

`number`

#### Defined in

[scraper/src/lib/utils.ts:15](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/utils.ts#L15)

___

### getScore

▸ **getScore**(`parent?`): `undefined` \| `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | ``null`` \| `Element` |

#### Returns

`undefined` \| `number`

#### Defined in

[scraper/src/lib/parsers/views.ts:302](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/parsers/views.ts#L302)

___

### getStoryListItem

▸ **getStoryListItem**(`parent?`): [`TStoryListItem`](shared.md#tstorylistitem)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | ``null`` \| `Element` |

#### Returns

[`TStoryListItem`](shared.md#tstorylistitem)

#### Defined in

[scraper/src/lib/parsers/views.ts:313](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/parsers/views.ts#L313)

___

### getVoteInteractions

▸ **getVoteInteractions**(`parent?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | ``null`` \| `Element` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `voteDown` | `undefined` \| `string` |
| `voteUp` | `undefined` \| `string` |
| `voted` | `undefined` \| ``"down"`` \| ``"up"`` |

#### Defined in

[scraper/src/lib/parsers/views.ts:406](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/parsers/views.ts#L406)

___

### pipe

▸ **pipe**<`T`, `U`\>(`expression`, `fn`): `ReturnType`<`U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `U` | extends (...`args`: `any`[]) => `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `T` |
| `fn` | `U` |

#### Returns

`ReturnType`<`U`\>

#### Defined in

[scraper/src/lib/utils.ts:49](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/lib/utils.ts#L49)
