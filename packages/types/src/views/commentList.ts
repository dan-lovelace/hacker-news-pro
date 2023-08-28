import { IParsable, TVoteDirection } from "..";
import { getCommentListItem } from "../parsing";

export type TCommentList = {
  items: TCommentListItem[];
  links: {
    /** Link to the next page */
    more?: string;
  };
};

export type TCommentListItem = {
  age: {
    humanized?: string;
    timestamp?: string;
  };
  bodyHTML?: string;
  id: string;
  interactions: {
    voteDown?: string;
    voteUp?: string;
  };
  links: {
    context?: string;
    favorite?: string;
    flag?: string;
    next?: string;
    parent?: string;
    story?: string;
  };
  story: {
    title: string;
  };
  user: {
    id: string;
    link: string;
  };
  voted?: TVoteDirection;
};

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
