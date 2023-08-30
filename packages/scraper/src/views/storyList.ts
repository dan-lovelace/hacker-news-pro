import { IParsable, TStoryList, TStoryListItem } from "@hnp/types";

import { getStoryListItem } from "../lib";

export class StoryList implements IParsable<TStoryList> {
  parse(document: Document): TStoryList {
    const items: TStoryListItem[] = [];
    const entries = document.querySelectorAll(".athing");

    entries.forEach((node) => {
      items.push(getStoryListItem(node));
    });

    const links = {
      more:
        document.querySelector(".morelink")?.getAttribute("href") ?? undefined,
    };

    return { items, links };
  }
}
