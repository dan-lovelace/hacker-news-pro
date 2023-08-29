import { TCommentListItem } from "./commentList";
import { IParsable, TForm } from "..";
import { SELECTORS, getCommentListItem, getForm } from "../parsing";

export type TReply = TCommentListItem & {
  forms: {
    comment: TForm;
  };
};

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
