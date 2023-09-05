import { TComment, TInteractions, TStoryListItem, TVoteDirection } from "..";

/**
 * Item page that displays a poll.
 * @remarks Sample page: https://news.ycombinator.com/item?id=126809
 */
export type TPollItem = TStoryListItem & {
  /** List of replies. */
  comments: TComment[];

  /** List of poll options. */
  options: TPollOptionItem[];
};

/** Single option in a poll. */
export type TPollOptionItem = {
  /**
   * The Hacker News identifier.
   * @example "126812"
   */
  id: string;

  /** User interactions. */
  interactions: Pick<TInteractions, "voteDown" | "voteUp">;

  /** The poll item's score. */
  score?: number;

  /** Title of the option. */
  title: string;

  /** Whether the current user has voted on the option and how. */
  voted?: TVoteDirection;
};
