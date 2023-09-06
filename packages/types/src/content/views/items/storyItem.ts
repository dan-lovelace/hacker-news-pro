import { TComment, TForms, TLinks, TStoryListItem } from "..";

/**
 * Item page that displays a story.
 * @remarks Sample page: https://news.ycombinator.com/item?id=37392676
 */
export type TStoryItem = TStoryListItem & {
  /**
   * HTML of the body.
   * @remarks
   * Should be used with Handlebar's triple-brace escape syntax:
   * `{{{bodyHTML}}}`.
   */
  bodyHTML?: string;

  /** List of replies. */
  comments: TComment[];

  /** Any associated forms such as the reply form. */
  forms: Pick<TForms, "comment">;

  /**
   * Links to other pages.
   * @example "item?id=37392676&p=2"
   */
  links: Pick<TLinks, "more">;
};
