// Example: https://news.ycombinator.com/item?id=37279109

import { TStoryListItem } from "./storyList";
import { IParsable, TComment } from "..";
import {
  SELECTORS,
  getBodyHTML,
  getComments,
  getStoryListItem,
} from "../parsing";

export type TStoryItem = TStoryListItem & {
  bodyHTML?: string;
  comments: TComment[];
  forms: {
    comment: {
      action: string;
      hiddenInputs: string;
      method: string;
    };
  };
};

export class StoryItem implements IParsable<TStoryItem> {
  parse(document: Document): TStoryItem {
    const detailsElement = document.querySelector(".athing");
    const storyListItem = getStoryListItem(detailsElement);

    const bodyHTML = getBodyHTML(detailsElement?.querySelector(".toptext"));
    const comments = getComments(SELECTORS.commentTree(document));

    const commentForm = document?.querySelector("form[action='comment']");
    const action = commentForm?.getAttribute("action") ?? "";
    const hiddenInputs = [
      commentForm?.querySelector("input[name='hmac']")?.outerHTML ?? "",
      commentForm?.querySelector("input[name='goto']")?.outerHTML ?? "",
      commentForm?.querySelector("input[name='parent']")?.outerHTML ?? "",
    ].join("\n");
    const method = commentForm?.getAttribute("method") ?? "";

    return {
      ...storyListItem,
      bodyHTML,
      comments,
      forms: {
        comment: {
          action,
          hiddenInputs,
          method,
        },
      },
    };
  }
}
