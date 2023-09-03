// Example: https://news.ycombinator.com/item?id=2921983

import { IParsable, TCommentItem } from "@hnp/types";

import { SELECTORS, getCommentListItem, getComments, getForm } from "../lib";

export class CommentItem implements IParsable<TCommentItem> {
  parse(document: Document): TCommentItem {
    const detailsElement = document.querySelector(".athing");
    const commentForm = getForm(SELECTORS.forms.comment(document));
    const commentListItem = getCommentListItem(detailsElement);
    const comments = getComments(SELECTORS.commentTree(document));

    return {
      ...commentListItem,
      comments,
      forms: {
        comment: commentForm,
      },
    };
  }
}
