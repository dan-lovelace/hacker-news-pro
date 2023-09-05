import {
  TAge,
  TInteractions,
  TLinks,
  TStoryListItem,
  TUser,
  TVoteDirection,
} from "..";

/**
 * List page that displays comment items.
 * @remarks Sample page: https://news.ycombinator.com/newcomments
 */
export type TCommentList = {
  /** List of comment items. */
  items: TCommentListItem[];

  /**
   * Links to other pages.
   * @example "?p=2"
   */
  links: Pick<TLinks, "more">;
};

/** Single comment item. */
export type TCommentListItem = {
  /** When the item was created. */
  age: TAge;

  /**
   * HTML of the body.
   * @remarks
   * Should be used with Handlebar's triple-brace escape syntax:
   * `{{{bodyHTML}}}`.
   */
  bodyHTML?: string;

  /**
   * The Hacker News identifier.
   * @example "2921983"
   */
  id: string;

  /** User interactions. */
  interactions: Pick<TInteractions, "voteDown" | "voteUp">;

  /**
   * Links to other pages.
   * @example "item?id=37369826"
   */
  links: Pick<
    TLinks,
    "context" | "favorite" | "flag" | "next" | "parent" | "story" | "unflag"
  >;

  /** The associated story. */
  story: {
    /** Story's title. */
    title: TStoryListItem["title"];
  };

  /** User that created the comment. */
  user?: TUser;

  /** Whether the current user has voted on the comment and how. */
  voted?: TVoteDirection;
};
