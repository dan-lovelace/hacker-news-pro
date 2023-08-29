// Example: https://news.ycombinator.com/item?id=37279109

import { TStoryListItem } from "./storyList";
import { IParsable, TComment, TForm } from "..";
import {
  SELECTORS,
  getBodyHTML,
  getForm,
  getComments,
  getStoryListItem,
} from "../parsing";

export type TStoryItem = TStoryListItem & {
  bodyHTML?: string;
  comments: TComment[];
  forms: {
    comment: TForm;
  };
};

export class StoryItem implements IParsable<TStoryItem> {
  parse(document: Document): TStoryItem {
    const detailsElement = document.querySelector(".athing");
    const storyListItem = getStoryListItem(detailsElement);

    const bodyHTML = getBodyHTML(detailsElement?.querySelector(".toptext"));
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
