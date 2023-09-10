[Home](../README.md) / [scraper](../modules/scraper.md) / IParsable

# Interface: IParsable<T\>

[scraper](../modules/scraper.md).IParsable

## Type parameters

| Name |
| :------ |
| `T` |

## Implemented by

- [`CommentItem`](../classes/scraper.CommentItem.md)
- [`CommentList`](../classes/scraper.CommentList.md)
- [`JobItem`](../classes/scraper.JobItem.md)
- [`JobList`](../classes/scraper.JobList.md)
- [`PollItem`](../classes/scraper.PollItem.md)
- [`Reply`](../classes/scraper.Reply.md)
- [`StoryItem`](../classes/scraper.StoryItem.md)
- [`StoryList`](../classes/scraper.StoryList.md)
- [`Submit`](../classes/scraper.Submit.md)
- [`Unknown`](../classes/scraper.Unknown.md)

## Table of contents

### Methods

- [parse](scraper.IParsable.md#parse)

## Methods

### parse

▸ **parse**(`document`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `Document` |

#### Returns

`T`

#### Defined in

[scraper/src/index.ts:7](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/scraper/src/index.ts#L7)
