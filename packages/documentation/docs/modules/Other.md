# Other

## Table of contents

### Type Aliases

- [TReply](Other.md#treply)
- [TSubmit](Other.md#tsubmit)
- [TUnknown](Other.md#tunknown)

## Type Aliases

### TReply

Ƭ **TReply**: [`TCommentListItem`](Shared.md#tcommentlistitem) & { `forms`: `Pick`<[`TForms`](Shared.md#tforms), ``"comment"``\>  }

Page to reply to a comment.

**`Remarks`**

Sample page: https://news.ycombinator.com/reply?id=37373376&goto=item%3Fid%3D37371084%2337373376

#### Defined in

[types/src/content/views/other/reply.ts:7](https://github.com/dan-lovelace/hacker-news-pro/blob/078f267/packages/types/src/content/views/other/reply.ts#L7)

___

### TSubmit

Ƭ **TSubmit**: `Object`

Page to submit a new story.

**`Remarks`**

Sample page: https://news.ycombinator.com/submit

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `forms` | `Pick`<[`TForms`](Shared.md#tforms), ``"submit"``\> | Any associated forms such as the submit form. |

#### Defined in

[types/src/content/views/other/submit.ts:7](https://github.com/dan-lovelace/hacker-news-pro/blob/078f267/packages/types/src/content/views/other/submit.ts#L7)

___

### TUnknown

Ƭ **TUnknown**: `unknown`

Any view that is not currently supported.

**`Remarks`**

Sample page: https://news.ycombinator.com/user?id=pg

#### Defined in

[types/src/content/views/other/unknown.ts:5](https://github.com/dan-lovelace/hacker-news-pro/blob/078f267/packages/types/src/content/views/other/unknown.ts#L5)
