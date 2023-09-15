import { TCommentListItem, TLinks } from "..";

/**
 * List page that displays comment items.
 * @remarks Sample page: https://news.ycombinator.com/newcomments
 */
export type TCommentList = {
  /** List of comment items. */
  items: TCommentListItem[];

  /**
   * Links to other pages.
   * @example ```?p=2```
   */
  links: Pick<TLinks, "more">;
};
