// Example: https://news.ycombinator.com/item?id=2921983

import { IParsable, TComment } from "..";
import {
  SELECTORS,
  getBodyHTML,
  getComments,
  getVoteInteractions,
} from "../parsing";

export type TCommentItem = {
  bodyHTML: string;
  comments: TComment[];
  createdAt: string;
  id: string;
  interactions: {
    voteDown?: string;
    voteUp?: string;
  };
  links: {
    context?: string;
    favorite?: string;
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
};

export class CommentItem implements IParsable<TCommentItem> {
  parse(document: Document): TCommentItem {
    const detailsElement = document.querySelector(".fatitem .athing");

    if (!detailsElement) throw new Error("Error getting item details");

    // parents
    const commentHeadElement = detailsElement.querySelector(".comhead");
    const linksElement = detailsElement.querySelector(".navs");

    // children
    const bodyHTML = getBodyHTML(detailsElement.querySelector(".comment"));
    const comments = getComments(SELECTORS.commentTree(document));
    const createdAt =
      commentHeadElement?.querySelector(".age")?.getAttribute("title") ?? "";
    const id = detailsElement.getAttribute("id") ?? "";
    const links = {
      context:
        SELECTORS.links.context(linksElement)?.getAttribute("href") ??
        undefined,
      favorite:
        SELECTORS.links.favorite(linksElement)?.getAttribute("href") ??
        undefined,
      parent:
        SELECTORS.links.parent(linksElement)?.getAttribute("href") ?? undefined,
      story:
        SELECTORS.links.story(linksElement)?.getAttribute("href") ?? undefined,
    };
    const story = {
      title: linksElement?.querySelector(".onstory a")?.textContent ?? "",
    };
    const user = {
      id: commentHeadElement?.querySelector(".hnuser")?.textContent ?? "",
      link:
        commentHeadElement?.querySelector(".hnuser")?.getAttribute("href") ??
        "",
    };

    // interactions
    const { voteDown, voteUp } = getVoteInteractions(
      SELECTORS.links.vote(detailsElement),
    );

    return {
      bodyHTML,
      comments,
      createdAt,
      id,
      interactions: {
        voteDown,
        voteUp,
      },
      links,
      story,
      user,
    };
  }
}
