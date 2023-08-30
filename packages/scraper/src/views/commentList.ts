import { IParsable, TCommentList, TCommentListItem } from "@hnp/types";

import { getCommentListItem } from "../lib";

export class CommentList implements IParsable<TCommentList> {
  parse(document: Document): TCommentList {
    const items: TCommentListItem[] = [];
    const entries = document.querySelectorAll(".athing");

    entries.forEach((node) => {
      items.push(getCommentListItem(node));
    });

    const links = {
      more:
        document.querySelector(".morelink")?.getAttribute("href") ?? undefined,
    };

    return { items, links };
  }
}
