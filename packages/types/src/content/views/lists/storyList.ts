import { TAge, TInteractions, TLinks, TSite, TUser, TVoteDirection } from "..";

/**
 * List page that displays story items.
 * @remarks Sample page: https://news.ycombinator.com/newest
 */
export type TStoryList = {
  /** List of story items. */
  items: TStoryListItem[];

  /**
   * Links to other pages.
   * @example "?p=2"
   */
  links: Pick<TLinks, "more">;
};

/**
 * Single story item.
 * @remarks Sample page: https://news.ycombinator.com/item?id=37371084
 */
export type TStoryListItem = {
  /** When the story was created. */
  age: TAge;

  /** The number of comments on the story. */
  commentsCount: number;

  /**
   * The Hacker News identifier.
   * @example "37371084"
   */
  id: string;

  /** User interactions. */
  interactions: Pick<TInteractions, "hide" | "voteDown" | "voteUp">;

  /**
   * Links to other pages.
   * @example "item?id=37371084"
   */
  links: Pick<
    TLinks,
    "favorite" | "flag" | "from" | "item" | "past" | "unflag"
  >;

  /** The story item's score. */
  score?: number;

  /** Information about the linked site. */
  site?: TSite;

  /** The story's title. */
  title: string;

  /** User that created the story. */
  user?: TUser;

  /** Whether the current user has voted on the story and how. */
  voted?: TVoteDirection;
};
