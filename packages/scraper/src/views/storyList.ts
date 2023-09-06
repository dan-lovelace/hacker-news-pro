import { TStoryList, TStoryListItem } from "@hnp/types";

import { IParsable } from "..";
import { getMoreLink, getStoryListItem } from "../lib";

export class StoryList implements IParsable<TStoryList> {
  parse(document: Document): TStoryList {
    const items: TStoryListItem[] = [];
    const entries = document.querySelectorAll(".athing");

    entries.forEach((node) => {
      items.push(getStoryListItem(node));
    });

    const links: TStoryList["links"] = {
      more: getMoreLink(document),
    };

    return { items, links };
  }
}
