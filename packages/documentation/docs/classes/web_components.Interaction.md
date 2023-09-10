[Home](../README.md) / [web-components](../modules/web_components.md) / Interaction

# Class: Interaction

[web-components](../modules/web_components.md).Interaction

Some actions taken by users on Hacker News perform an inline document update
without refreshing the page. When upvoting a comment, for example, the
display of the vote button immediately changes to reflect the user's action.
This works in the default Hacker News pages through use of Javascript that
gets executed whenever a document click event occurs. Their JS looks for
elements with the `clicky` class to know when to do an inline update.

The `Interaction` component leverages the default JS by creating a new
element from an HTML string that retains its attributes, including the
`clicky` class. Children are stripped away so users may supply their own.

**`Example`**

```ts
<hnp-interaction from="{{interactions.voteUp}}">
  <i class="material-icons">arrow_up</i>
</hnp-interaction>
```

## Hierarchy

- `HTMLElement`

  ↳ **`Interaction`**

## Table of contents

### Constructors

- [constructor](web_components.Interaction.md#constructor)

### Accessors

- [className](web_components.Interaction.md#classname)
- [from](web_components.Interaction.md#from)

## Constructors

### constructor

• **new Interaction**()

#### Overrides

HTMLElement.constructor

#### Defined in

[content/src/web-components/Interaction.ts:18](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/content/src/web-components/Interaction.ts#L18)

## Accessors

### className

• `get` **className**(): `string`

Class name to append to the original element's class list.

#### Returns

`string`

**`Remarks`**

Sample usage:
```
<hnp-interaction className="fw-bold" from="{{interactions.hide}}">
  Hide
</hnp-interaction>
```

#### Overrides

HTMLElement.className

#### Defined in

[content/src/web-components/Interaction.ts:65](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/content/src/web-components/Interaction.ts#L65)

___

### from

• `get` **from**(): `string`

HTML string to generate the interaction.

#### Returns

`string`

**`Example`**

```ts
`<a href="hide?id=37190743&amp;auth=abcd1234&amp;goto=news" class="clicky hider"></a>`
```

#### Defined in

[content/src/web-components/Interaction.ts:73](https://github.com/dan-lovelace/hacker-news-pro/blob/442f6cf/packages/content/src/web-components/Interaction.ts#L73)
