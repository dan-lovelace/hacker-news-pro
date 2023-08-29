// Example: https://news.ycombinator.com/item?id=126809

import { TStoryListItem } from "./storyList";
import { IParsable, TComment, TVoteDirection } from "..";
import {
  SELECTORS,
  getComments,
  getPollOptionItem,
  getStoryListItem,
} from "../parsing";

export type TPollOptionItem = {
  id: string;
  interactions: {
    voteDown?: string;
    voteUp?: string;
  };
  score?: number;
  title: string;
  voted: TVoteDirection;
};

export type TPollItem = TStoryListItem & {
  comments: TComment[];
  options: TPollOptionItem[];
};

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
