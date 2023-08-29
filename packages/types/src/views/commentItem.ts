// Example: https://news.ycombinator.com/item?id=2921983

import { TCommentListItem } from "./commentList";
import { IParsable, TComment } from "..";
import { SELECTORS, getCommentListItem, getComments } from "../parsing";

export type TCommentItem = TCommentListItem & {
  comments: TComment[];
};

export class CommentItem implements IParsable<TCommentItem> {
  parse(document: Document): TCommentItem {
    const detailsElement = document.querySelector(".athing");
    const commentListItem = getCommentListItem(detailsElement);
    const comments = getComments(SELECTORS.commentTree(document));

    return {
      ...commentListItem,
      comments,
    };
  }
}
