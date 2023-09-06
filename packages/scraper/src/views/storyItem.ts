import { TStoryItem } from "@hnp/types";

import { IParsable } from "..";
import {
  getBodyHTML,
  getForm,
  getComments,
  getStoryListItem,
  SELECTORS,
  getMoreLink,
} from "../lib";

export class StoryItem implements IParsable<TStoryItem> {
  parse(document: Document): TStoryItem {
    const detailsElement = document.querySelector(".athing");
    const storyListItem = getStoryListItem(detailsElement);

    const bodyHTML = getBodyHTML(
      document.querySelector(".fatitem")?.querySelector(".toptext"),
    );
    const commentForm = getForm(SELECTORS.forms.comment(document));
    const commentTree = SELECTORS.commentTree(document);
    const comments = getComments(commentTree);
    const links: TStoryItem["links"] = {
      ...storyListItem.links,
      more: getMoreLink(commentTree),
    };

    return {
      ...storyListItem,
      bodyHTML,
      comments,
      forms: {
        comment: commentForm,
      },
      links,
    };
  }
}
