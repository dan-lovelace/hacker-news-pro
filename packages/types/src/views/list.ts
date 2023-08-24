import { SELECTORS, getNodeHTML, pipe } from "@hnp/core";

import { IParsable } from "..";

const voteDirections = ["down", "up", undefined] as const;

export type TList = {
  items: TListItem[];

  /** URL to the next page */
  moreUrl?: string;
};

export type TListItem = {
  /** User that created the item */
  author?: string;

  /** URL of the author's profile page */
  authorUrl?: string;

  /** Number of comments */
  commentsCount: number;

  /** When the item was created
   * @todo The UTC dates returned by HN do not align with their humanized
   * counterparts. It will show "2 hours ago" for things that have dates
   * several days old. We could calculate an estimated time by parsing the
   * humanized time and subtracting it from the current time. Leaving this as a
   * nice-to-have for now.
   */
  createdAt?: string;

  /**
   * When the item was created in humanized format
   * @example 2 hours ago
   */
  createdHumanized: string;

  /** URL to add the item to favorites */
  favoriteUrl?: string;

  /** URL of flag requests */
  flagUrl?: string;

  /** URL of the "from" page that lists previous items from the same domain */
  fromUrl: string;

  /**
   * Interactions contain clickable elements that perform inline DOM changes
   * without page reload or navigation. The contained elements are clones from
   * the original HN document.
   * @example upvote, hide
   */
  interactions: {
    hide?: string;
    voteDown?: string;
    voteUp?: string;
  };

  /** Whether the item is sponsored */
  isSponsored: boolean;

  /** URL of the item, typically comments */
  itemUrl?: string;

  /**
   * URL to the HN search service
   * @example `https://hn.algolia.com/?query=Sound%20Map%20of%20Amsterdam&type=story&dateRange=all&sort=byDate&storyText=false&prefix&page=0`
   */
  pastUrl?: string;

  /** Item's position in the list */
  position?: number;

  /** Items score based on number of votes */
  score?: number;

  /**
   * Short version of the linked domain
   * @example `forbes.com/sites/johnwerner`
   */
  siteName: string;

  /** URL to the item */
  siteUrl: string;

  /** Item title */
  title: string;

  /** Current user's voted status */
  voted: TVoteDirection;
};

export type TVoteDirection = (typeof voteDirections)[number];

export class List implements IParsable<TList> {
  parse(document: Document): TList {
    const items: TListItem[] = [];
    const entries = document.querySelectorAll(".athing");

    entries.forEach((node) => {
      // parents
      const metadataEle = node.nextElementSibling?.querySelector(".subtext");
      const commentsEle = pipe(
        metadataEle?.querySelectorAll("a[href^='item?id=']"),
        (nodes?: NodeListOf<Element>) => nodes?.[nodes.length - 1],
      );
      const titleEle = node.querySelector(".titleline a");
      const votesEle = node.querySelector(".votelinks");

      // children
      const author =
        metadataEle?.querySelector(".hnuser")?.textContent ?? undefined;
      const authorUrl =
        metadataEle?.querySelector(".hnuser")?.getAttribute("href") ??
        undefined;
      const commentsCount = pipe(
        commentsEle?.textContent?.replace(/\Wcomments/g, ""),
        (commentsString: string) =>
          pipe(parseInt(commentsString), (parseRes: number) =>
            isNaN(parseRes) ? 0 : parseRes,
          ),
      );
      const createdHumanized =
        metadataEle?.querySelector(".age a")?.textContent ?? "";
      const favoriteUrl =
        metadataEle?.querySelector("a[href^='fave']")?.getAttribute("href") ??
        undefined;
      const flagUrl =
        metadataEle?.querySelector("a[href^='flag']")?.getAttribute("href") ??
        undefined;
      const fromUrl =
        node.querySelector(".sitebit a")?.getAttribute("href") ?? "";
      const itemUrl = commentsEle?.getAttribute("href") ?? undefined;
      const pastUrl =
        metadataEle?.querySelector(".hnpast")?.getAttribute("href") ??
        undefined;
      // const position = parseInt(node.querySelector(".rank")?.textContent ?? "");
      const position = pipe(
        parseInt(node.querySelector(".rank")?.textContent ?? ""),
        (parseRes) => (isNaN(parseRes) ? undefined : parseRes),
      );
      const score = pipe(
        metadataEle
          ?.querySelector("[id^='score_']")
          ?.textContent?.replace(/\Wpoints?/g, ""),
        parseInt,
      );
      const siteUrl = titleEle?.getAttribute("href") ?? "";
      const siteName = node.querySelector(".sitestr")?.textContent ?? "";
      const title = titleEle?.textContent ?? "";
      const voted = pipe(
        votesEle?.querySelector(".nosee")?.getAttribute("id"),
        (id: string) =>
          pipe(id?.replace(/_\d*/g, ""), (direction: TVoteDirection) =>
            !direction || !voteDirections.includes(direction)
              ? undefined
              : direction,
          ),
      );

      // interactions
      const hide = pipe(
        metadataEle?.querySelector("a[href^='hide']")?.cloneNode(),
        (node?: Node) => getNodeHTML(node),
      );
      const voteDown = pipe(
        votesEle?.querySelector("a[id^='down_']")?.cloneNode(),
        (node?: Node) => getNodeHTML(node),
      );
      const voteUp = pipe(
        votesEle?.querySelector("a[id^='up_']")?.cloneNode(),
        (node?: Node) => getNodeHTML(node),
      );

      items.push({
        author,
        authorUrl,
        commentsCount,
        createdHumanized,
        favoriteUrl,
        flagUrl,
        fromUrl,
        interactions: {
          hide,
          voteDown,
          voteUp,
        },
        isSponsored: !author,
        itemUrl,
        pastUrl,
        position,
        score,
        siteName,
        siteUrl,
        title,
        voted,
      });
    });

    const moreUrl =
      SELECTORS.HN.main()?.querySelector(".morelink")?.getAttribute("href") ??
      undefined;

    return { items, moreUrl };
  }
}
