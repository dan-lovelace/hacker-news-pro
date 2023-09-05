import { TCommentListItem, TForms } from "..";

/**
 * Page to reply to a comment.
 * @remarks Sample page: https://news.ycombinator.com/reply?id=37373376&goto=item%3Fid%3D37371084%2337373376
 */
export type TReply = TCommentListItem & {
  /** Any associated forms such as the reply form. */
  forms: Pick<TForms, "comment">;
};
