import { TStoryItem } from "@hnp/types";

import { IParsable } from "..";
import {
  getBodyHTML,
  getForm,
  getComments,
  getStoryListItem,
  SELECTORS,
} from "../lib";

export class StoryItem implements IParsable<TStoryItem> {
  parse(document: Document): TStoryItem {
    const detailsElement = document.querySelector(".athing");
    const storyListItem = getStoryListItem(detailsElement);

    const bodyHTML = getBodyHTML(
      document.querySelector(".fatitem")?.querySelector(".toptext"),
    );
    const comments = getComments(SELECTORS.commentTree(document));
    const commentForm = getForm(SELECTORS.forms.comment(document));

    return {
      ...storyListItem,
      bodyHTML,
      comments,
      forms: {
        comment: commentForm,
      },
    };
  }
}
