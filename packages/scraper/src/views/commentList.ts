import { TCommentList, TCommentListItem } from "@hnp/types";

import { IParsable } from "..";
import { getCommentListItem, getMoreLink } from "../lib";

export class CommentList implements IParsable<TCommentList> {
  parse(document: Document): TCommentList {
    const items: TCommentListItem[] = [];
    const entries = document.querySelectorAll(".athing");

    entries.forEach((node) => {
      items.push(getCommentListItem(node));
    });

    const links: TCommentList["links"] = {
      more: getMoreLink(document),
    };

    return { items, links };
  }
}
