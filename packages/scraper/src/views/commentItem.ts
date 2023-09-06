import { TCommentItem } from "@hnp/types";

import { IParsable } from "..";
import {
  SELECTORS,
  getCommentListItem,
  getComments,
  getForm,
  getMoreLink,
} from "../lib";

export class CommentItem implements IParsable<TCommentItem> {
  parse(document: Document): TCommentItem {
    const detailsElement = document.querySelector(".athing");
    const commentForm = getForm(SELECTORS.forms.comment(document));
    const commentListItem = getCommentListItem(detailsElement);
    const commentTree = SELECTORS.commentTree(document);
    const comments = getComments(commentTree);
    const links: TCommentItem["links"] = {
      ...commentListItem.links,
      more: getMoreLink(commentTree),
    };

    return {
      ...commentListItem,
      comments,
      forms: {
        comment: commentForm,
      },
      links,
    };
  }
}
