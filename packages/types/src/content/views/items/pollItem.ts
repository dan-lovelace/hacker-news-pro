import { TComment, TLinks, TPollOptionItem, TStoryListItem } from "..";

/**
 * Item page that displays a poll.
 * @remarks Sample page: https://news.ycombinator.com/item?id=126809
 */
export type TPollItem = TStoryListItem & {
  /** List of replies. */
  comments: TComment[];

  /**
   * Links to other pages.
   * @example "item?id=37392676&p=2"
   */
  links: Pick<TLinks, "more">;

  /** List of poll options. */
  options: TPollOptionItem[];
};
