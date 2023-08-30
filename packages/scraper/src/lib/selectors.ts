export const SELECTORS = {
  commentTree: (within: Document | Element | null) =>
    within?.querySelector(".comment-tree"),
  forms: {
    comment: (within?: Document | Element | null) =>
      within?.querySelector("form[action='comment']"),
    submission: (within?: Document | Element | null) =>
      within?.querySelector("form[action='/r']"),
  },
  links: {
    context: (within?: Element | null) =>
      within?.querySelector("a[href^='context']"),
    favorite: (within?: Element | null) =>
      within?.querySelector("a[href^='fave']"),
    flag: (within?: Element | null) => within?.querySelector("a[href^='flag']"),
    from: (within?: Element | null) => within?.querySelector(".sitebit a"),
    hide: (within?: Element | null) => within?.querySelector("a[href^='hide']"),
    item: (within?: Element | null) => within?.querySelector("a[href^='item']"),
    next: (within?: Element | null) =>
      within?.querySelector("a[href*='?next=']"),
    parent: (within?: Element | null) =>
      within?.querySelector("a[href^='item']"),
    past: (within?: Element | null) => within?.querySelector(".hnpast"),
    story: (within?: Element | null) =>
      within?.querySelector(".onstory a[href^='item']"),
    vote: (within?: Element | null) => within?.querySelector(".votelinks"),
  },
  score: (within?: Element | null) => within?.querySelector("[id^='score_']"),
};
