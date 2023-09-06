import { TPollItem, TPollOptionItem } from "@hnp/types";

import { IParsable } from "..";
import {
  getComments,
  getMoreLink,
  getPollOptionItem,
  getStoryListItem,
  SELECTORS,
} from "../lib";

export class PollItem implements IParsable<TPollItem> {
  parse(document: Document): TPollItem {
    const detailsElement = document.querySelector(".athing");
    const optionsElement = document.querySelector(".fatitem table");
    const storyListItem = getStoryListItem(detailsElement);

    const commentTree = SELECTORS.commentTree(document);
    const comments = getComments(commentTree);
    const links: TPollItem["links"] = {
      ...storyListItem.links,
      more: getMoreLink(commentTree),
    };
    const optionElements = optionsElement?.querySelectorAll(".athing");
    const options: TPollOptionItem[] = [];

    optionElements?.forEach((optionElement) =>
      options.push(getPollOptionItem(optionElement)),
    );

    return {
      ...storyListItem,
      comments,
      links,
      options,
    };
  }
}
