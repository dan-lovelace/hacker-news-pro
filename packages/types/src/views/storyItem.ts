// Example: https://news.ycombinator.com/item?id=37279109

import { IParsable, TComment, TVoteDirection } from "..";
import {
  SELECTORS,
  getBodyHTML,
  getComments,
  getCommentsCount,
  getScore,
  getVoteInteractions,
} from "../parsing";

export type TStoryItem = {
  bodyHTML: string;
  comments: TComment[];
  commentsCount: number;
  createdAt: string;
  createdHumanized: string;
  forms: {
    comment: {
      inputs: Record<string, string>;
    };
  };
  id: string;
  interactions: {
    hide?: string;
    voteDown?: string;
    voteUp?: string;
  };
  links: {
    favorite?: string;
    flag?: string;
    from?: string;
    past?: string;
  };
  score?: number;
  site?: {
    name: string;
    url: string;
  };
  title: string;
  user: {
    id: string;
    link: string;
  };
  voted: TVoteDirection;
};

export class StoryItem implements IParsable<TStoryItem> {
  parse(document: Document): TStoryItem {
    const detailsElement = document.querySelector(".fatitem");

    if (!detailsElement) throw new Error("Error getting item details");

    // parents
    const metadataElement = detailsElement.querySelector(".subtext .subline");
    const titleElement = detailsElement.querySelector(".athing");

    // children
    const bodyHTML = getBodyHTML(detailsElement.querySelector(".toptext"));
    const comments = getComments(SELECTORS.commentTree(document));
    const commentsCount = getCommentsCount(metadataElement) ?? 0;
    const createdAt =
      metadataElement?.querySelector(".age")?.getAttribute("title") ?? "";
    const createdHumanized =
      metadataElement?.querySelector(".age a")?.textContent ?? "";
    const id = titleElement?.getAttribute("id") ?? "";
    const links = {
      favorite:
        SELECTORS.links.favorite(metadataElement)?.getAttribute("href") ??
        undefined,
      flag:
        SELECTORS.links.flag(metadataElement)?.getAttribute("href") ??
        undefined,
      from:
        SELECTORS.links.from(titleElement)?.getAttribute("href") ?? undefined,
      past:
        SELECTORS.links.past(metadataElement)?.getAttribute("href") ??
        undefined,
    };
    const score = getScore(detailsElement);
    const siteName = titleElement?.querySelector(".titleline .sitebit a")
      ?.textContent;
    const siteUrl = titleElement
      ?.querySelector(".titleline a")
      ?.getAttribute("href");
    const site =
      siteName && siteUrl
        ? {
            name:
              titleElement?.querySelector(".titleline .sitebit a")
                ?.textContent ?? "",
            url:
              titleElement
                ?.querySelector(".titleline a")
                ?.getAttribute("href") ?? "",
          }
        : undefined;
    const title =
      titleElement?.querySelector(".titleline a")?.textContent ?? "";
    const user = {
      id: metadataElement?.querySelector(".hnuser")?.textContent ?? "",
      link:
        metadataElement?.querySelector(".hnuser")?.getAttribute("href") ?? "",
    };

    // forms
    const commentForm = detailsElement.querySelector("form[action='comment']");
    const commentInputs = {
      hmac: commentForm?.querySelector("input[name='hmac']")?.outerHTML ?? "",
      goto: commentForm?.querySelector("input[name='goto']")?.outerHTML ?? "",
      parent:
        commentForm?.querySelector("input[name='parent']")?.outerHTML ?? "",
    };

    // interactions
    const { voted, voteDown, voteUp } = getVoteInteractions(titleElement);

    return {
      bodyHTML,
      comments,
      commentsCount,
      createdAt,
      createdHumanized,
      forms: {
        comment: {
          inputs: commentInputs,
        },
      },
      id,
      interactions: {
        voteDown,
        voteUp,
      },
      links,
      score,
      site,
      title,
      user,
      voted,
    };
  }
}
