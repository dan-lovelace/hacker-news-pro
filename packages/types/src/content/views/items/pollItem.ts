import { TComment, TPollOptionItem, TStoryListItem } from "..";

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
