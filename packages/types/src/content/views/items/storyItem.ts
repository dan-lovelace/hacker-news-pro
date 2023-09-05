import { TComment, TForms, TStoryListItem } from "..";

/** Item page that displays a story. */
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
};
