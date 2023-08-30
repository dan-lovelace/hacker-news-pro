// Example: https://news.ycombinator.com/item?id=126809

import { IParsable, TPollItem, TPollOptionItem } from "@hnp/types";

import {
  getComments,
  getPollOptionItem,
  getStoryListItem,
  SELECTORS,
} from "../lib";

export class PollItem implements IParsable<TPollItem> {
  parse(document: Document): TPollItem {
    const detailsElement = document.querySelector(".athing");
    const optionsElement = document.querySelector(".fatitem table");
    const storyListItem = getStoryListItem(detailsElement);

    const comments = getComments(SELECTORS.commentTree(document));
    const optionElements = optionsElement?.querySelectorAll(".athing");
    const options: TPollOptionItem[] = [];

    optionElements?.forEach((optionElement) =>
      options.push(getPollOptionItem(optionElement)),
    );

    return {
      ...storyListItem,
      comments,
      options,
    };
  }
}
