# Handlebars Helpers

Various helper utilities for use in Handlebars templates.

## Table of contents

### Functions

- [add](HandlebarsHelpers.md#add)
- [capitalize](HandlebarsHelpers.md#capitalize)
- [divide](HandlebarsHelpers.md#divide)
- [humanizeUnixTime](HandlebarsHelpers.md#humanizeunixtime)
- [ifeq](HandlebarsHelpers.md#ifeq)
- [ifnoteq](HandlebarsHelpers.md#ifnoteq)
- [mod](HandlebarsHelpers.md#mod)
- [multiply](HandlebarsHelpers.md#multiply)
- [subtract](HandlebarsHelpers.md#subtract)
- [timestampDate](HandlebarsHelpers.md#timestampdate)
- [timestampTime](HandlebarsHelpers.md#timestamptime)

## Functions

### add

▸ **add**(`a`, `b`): `any`

Adds two numbers.

#### Parameters

| Name | Type  |
| :--- | :---- |
| `a`  | `any` |
| `b`  | `any` |

#### Returns

`any`

**`Example`**

```hbs
<span>{{add 6 3}}</span>
```

#### Defined in

[sandbox/src/helpers.ts:21](https://github.com/dan-lovelace/hacker-news-pro/blob/a512a6b/packages/sandbox/src/helpers.ts#L21)

---

### capitalize

▸ **capitalize**(`a`): `string`

Capitalizes the first character of a string.

#### Parameters

| Name | Type  |
| :--- | :---- |
| `a`  | `any` |

#### Returns

`string`

**`Example`**

```hbs
<span>{{capitalize link.title}}</span>
```

#### Defined in

[sandbox/src/helpers.ts:123](https://github.com/dan-lovelace/hacker-news-pro/blob/a512a6b/packages/sandbox/src/helpers.ts#L123)

---

### divide

▸ **divide**(`a`, `b`): `number`

Divides two numbers.

#### Parameters

| Name | Type  |
| :--- | :---- |
| `a`  | `any` |
| `b`  | `any` |

#### Returns

`number`

**`Example`**

```hbs
<span>{{divide 6 3}}</span>
```

#### Defined in

[sandbox/src/helpers.ts:33](https://github.com/dan-lovelace/hacker-news-pro/blob/a512a6b/packages/sandbox/src/helpers.ts#L33)

---

### humanizeUnixTime

▸ **humanizeUnixTime**(`a`): `string` \| `false`

Humanizes a Unix timestamp.

#### Parameters

| Name | Type  |
| :--- | :---- |
| `a`  | `any` |

#### Returns

`string` \| `false`

**`Example`**

```hbs
<span>{{humanizeUnixTime 1693766828}}</span>
```

#### Defined in

[sandbox/src/helpers.ts:135](https://github.com/dan-lovelace/hacker-news-pro/blob/a512a6b/packages/sandbox/src/helpers.ts#L135)

---

### ifeq

▸ **ifeq**(`a`, `b`, `options`): `string`

Performs a strict equality check between two items to conditionally render based
on the result.

#### Parameters

| Name      | Type            |
| :-------- | :-------------- |
| `a`       | `any`           |
| `b`       | `any`           |
| `options` | `HelperOptions` |

#### Returns

`string`

**`Example`**

```hbs
<span>
  {{#ifeq 6 3}}
    Equal
  {{/ifeq}}
</span>
```

**`Example`**

```hbs
<span>
  {{#ifeq 6 3}}
    Equal
  {{else}}
    Not equal
  {{/ifeq}}
</span>
```

#### Defined in

[sandbox/src/helpers.ts:84](https://github.com/dan-lovelace/hacker-news-pro/blob/a512a6b/packages/sandbox/src/helpers.ts#L84)

---

### ifnoteq

▸ **ifnoteq**(`a`, `b`, `options`): `string`

Performs a strict inequality check between two items to conditionally render
based on the result.

#### Parameters

| Name      | Type            |
| :-------- | :-------------- |
| `a`       | `any`           |
| `b`       | `any`           |
| `options` | `HelperOptions` |

#### Returns

`string`

**`Example`**

```hbs
<span>
  {{#ifnoteq 6 3}}
    Not equal
  {{/ifnoteq}}
</span>
```

**`Example`**

```hbs
<span>
  {{#ifnoteq 6 3}}
    Not equal
  {{else}}
    Equal
  {{/ifnoteq}}
</span>
```

#### Defined in

[sandbox/src/helpers.ts:111](https://github.com/dan-lovelace/hacker-news-pro/blob/a512a6b/packages/sandbox/src/helpers.ts#L111)

---

### mod

▸ **mod**(`a`, `b`): `number`

Performs a modulo operation between two numbers.

#### Parameters

| Name | Type  |
| :--- | :---- |
| `a`  | `any` |
| `b`  | `any` |

#### Returns

`number`

**`Example`**

```hbs
<span>{{mod 6 3}}</span>
```

#### Defined in

[sandbox/src/helpers.ts:147](https://github.com/dan-lovelace/hacker-news-pro/blob/a512a6b/packages/sandbox/src/helpers.ts#L147)

---

### multiply

▸ **multiply**(`a`, `b`): `number`

Multiplies two numbers.

#### Parameters

| Name | Type  |
| :--- | :---- |
| `a`  | `any` |
| `b`  | `any` |

#### Returns

`number`

**`Example`**

```hbs
<span>{{multiply 6 3}}</span>
```

#### Defined in

[sandbox/src/helpers.ts:45](https://github.com/dan-lovelace/hacker-news-pro/blob/a512a6b/packages/sandbox/src/helpers.ts#L45)

---

### subtract

▸ **subtract**(`a`, `b`): `number`

Subtracts two numbers.

#### Parameters

| Name | Type  |
| :--- | :---- |
| `a`  | `any` |
| `b`  | `any` |

#### Returns

`number`

**`Example`**

```hbs
<span>{{subtract 6 3}}</span>
```

#### Defined in

[sandbox/src/helpers.ts:57](https://github.com/dan-lovelace/hacker-news-pro/blob/a512a6b/packages/sandbox/src/helpers.ts#L57)

---

### timestampDate

▸ **timestampDate**(`a`): `string`

Returns the date portion of a timestamp.

#### Parameters

| Name | Type  |
| :--- | :---- |
| `a`  | `any` |

#### Returns

`string`

**`Example`**

```hbs
<span>{{timestampDate "2023-09-03T14:53:21Z"}}</span>
```

#### Defined in

[sandbox/src/helpers.ts:159](https://github.com/dan-lovelace/hacker-news-pro/blob/a512a6b/packages/sandbox/src/helpers.ts#L159)

---

### timestampTime

▸ **timestampTime**(`a`): `string`

Returns the time portion of a timestamp.

#### Parameters

| Name | Type  |
| :--- | :---- |
| `a`  | `any` |

#### Returns

`string`

**`Example`**

```hbs
<span>{{timestampTime "2023-09-03T14:53:21Z"}}</span>
```

#### Defined in

[sandbox/src/helpers.ts:171](https://github.com/dan-lovelace/hacker-news-pro/blob/a512a6b/packages/sandbox/src/helpers.ts#L171)
