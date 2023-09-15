import { TLinks, TStoryListItem } from "..";

/**
 * List page that displays story items.
 * @remarks Sample page: https://news.ycombinator.com/newest
 */
export type TStoryList = {
  /** List of story items. */
  items: TStoryListItem[];

  /**
   * Links to other pages.
   * @example ```?p=2```
   */
  links: Pick<TLinks, "more">;
};
