import { TComment, TCommentListItem, TForms } from "..";

/**
 * Item page that displays a comment.
 * @remarks Sample page: https://news.ycombinator.com/item?id=2921983
 */
export type TCommentItem = TCommentListItem & {
  /** List of replies. */
  comments: TComment[];

  /** Any associated forms such as the reply form. */
  forms: Pick<TForms, "comment">;
};
