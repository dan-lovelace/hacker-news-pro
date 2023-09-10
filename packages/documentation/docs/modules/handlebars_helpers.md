[Home](../README.md) / handlebars-helpers

# Module: handlebars-helpers

Various helper utilities for use in Handlebars templates.

## Table of contents

### Functions

- [add](handlebars_helpers.md#add)
- [capitalize](handlebars_helpers.md#capitalize)
- [divide](handlebars_helpers.md#divide)
- [humanizeUnixTime](handlebars_helpers.md#humanizeunixtime)
- [ifeq](handlebars_helpers.md#ifeq)
- [ifnoteq](handlebars_helpers.md#ifnoteq)
- [mod](handlebars_helpers.md#mod)
- [multiply](handlebars_helpers.md#multiply)
- [subtract](handlebars_helpers.md#subtract)
- [timestampDate](handlebars_helpers.md#timestampdate)
- [timestampTime](handlebars_helpers.md#timestamptime)

## Functions

### add

▸ **add**(`a`, `b`): `any`

Adds two numbers.

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |
| `b` | `any` |

#### Returns

`any`

**`Example`**

```ts
<span>{{add 6 3}}</span>
```

#### Defined in

[sandbox/src/helpers.ts:19](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/sandbox/src/helpers.ts#L19)

___

### capitalize

▸ **capitalize**(`a`): `string`

Capitalizes the first character of a string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |

#### Returns

`string`

**`Example`**

```ts
<span>{{capitalize link.title}}</span>
```

#### Defined in

[sandbox/src/helpers.ts:105](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/sandbox/src/helpers.ts#L105)

___

### divide

▸ **divide**(`a`, `b`): `number`

Divides two numbers.

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |
| `b` | `any` |

#### Returns

`number`

**`Example`**

```ts
<span>{{divide 6 3}}</span>
```

#### Defined in

[sandbox/src/helpers.ts:29](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/sandbox/src/helpers.ts#L29)

___

### humanizeUnixTime

▸ **humanizeUnixTime**(`a`): `string` \| ``false``

Humanizes a Unix timestamp.

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |

#### Returns

`string` \| ``false``

**`Example`**

```ts
<span>{{humanizeUnixTime 1693766828}}</span>
```

#### Defined in

[sandbox/src/helpers.ts:115](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/sandbox/src/helpers.ts#L115)

___

### ifeq

▸ **ifeq**(`a`, `b`, `options`): `string`

Performs a strict equality check between two items to conditionally render
based on the result.

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |
| `b` | `any` |
| `options` | `HelperOptions` |

#### Returns

`string`

**`Example`**

```ts
<span>
  {{#ifeq 6 3}}
    Equal
  {{/ifeq}}
</span>
```

**`Example`**

```ts
<span>
  {{#ifeq 6 3}}
    Equal
  {{else}}
    Not equal
  {{/ifeq}}
</span>
```

#### Defined in

[sandbox/src/helpers.ts:72](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/sandbox/src/helpers.ts#L72)

___

### ifnoteq

▸ **ifnoteq**(`a`, `b`, `options`): `string`

Performs a strict inequality check between two items to conditionally render
based on the result.

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |
| `b` | `any` |
| `options` | `HelperOptions` |

#### Returns

`string`

**`Example`**

```ts
<span>
  {{#ifnoteq 6 3}}
    Not equal
  {{/ifnoteq}}
</span>
```

**`Example`**

```ts
<span>
  {{#ifnoteq 6 3}}
    Not equal
  {{else}}
    Equal
  {{/ifnoteq}}
</span>
```

#### Defined in

[sandbox/src/helpers.ts:95](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/sandbox/src/helpers.ts#L95)

___

### mod

▸ **mod**(`a`, `b`): `number`

Performs a modulo operation between two numbers.

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |
| `b` | `any` |

#### Returns

`number`

**`Example`**

```ts
<span>{{mod 6 3}}</span>
```

#### Defined in

[sandbox/src/helpers.ts:125](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/sandbox/src/helpers.ts#L125)

___

### multiply

▸ **multiply**(`a`, `b`): `number`

Multiplies two numbers.

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |
| `b` | `any` |

#### Returns

`number`

**`Example`**

```ts
<span>{{multiply 6 3}}</span>
```

#### Defined in

[sandbox/src/helpers.ts:39](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/sandbox/src/helpers.ts#L39)

___

### subtract

▸ **subtract**(`a`, `b`): `number`

Subtracts two numbers.

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |
| `b` | `any` |

#### Returns

`number`

**`Example`**

```ts
<span>{{subtract 6 3}}</span>
```

#### Defined in

[sandbox/src/helpers.ts:49](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/sandbox/src/helpers.ts#L49)

___

### timestampDate

▸ **timestampDate**(`a`): `string`

Returns the date portion of a timestamp.

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |

#### Returns

`string`

**`Example`**

```ts
<span>{{timestampDate "2023-09-03T14:53:21Z"}}</span>
```

#### Defined in

[sandbox/src/helpers.ts:135](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/sandbox/src/helpers.ts#L135)

___

### timestampTime

▸ **timestampTime**(`a`): `string`

Returns the time portion of a timestamp.

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |

#### Returns

`string`

**`Example`**

```ts
<span>{{timestampTime "2023-09-03T14:53:21Z"}}</span>
```

#### Defined in

[sandbox/src/helpers.ts:145](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/sandbox/src/helpers.ts#L145)
