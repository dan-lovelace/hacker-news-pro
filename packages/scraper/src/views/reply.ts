import { IParsable, TReply } from "@hnp/types";

import { getCommentListItem, getForm, SELECTORS } from "../lib";

export class Reply implements IParsable<TReply> {
  parse(document: Document): TReply {
    const detailsElement = document.querySelector(".athing");
    const commentListItem = getCommentListItem(detailsElement);
    const commentForm = getForm(SELECTORS.forms.comment(document));

    return {
      ...commentListItem,
      forms: {
        comment: commentForm,
      },
    };
  }
}
