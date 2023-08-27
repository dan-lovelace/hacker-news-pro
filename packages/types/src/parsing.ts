import { getNodeHTML, pipe } from "@hnp/core";

import { TComment, TVoteDirection, voteDirections } from ".";
import { TStoryListItem } from "./views/storyList";

const getRowId = (id: string) => `item_${id.replaceAll(/(#|item_)/g, "")}`;

const getRowIndent = (row: Element) =>
  pipe(
    parseInt(row.querySelector(".ind")?.getAttribute("indent") ?? ""),
    (indentInt: number) => (isNaN(indentInt) ? 0 : indentInt),
  );

function buildCommentTree(
  input: [TComment["data"], number][],
  currentIndex: number,
  depth: number,
): [TComment[], number] {
  const comments: TComment[] = [];

  while (currentIndex < input.length && input[currentIndex][1] === depth) {
    const [data] = input[currentIndex];
    const comment: TComment = {
      comments: [],
      data,
      depth,
    };
    const [childComments, nextIndex] = buildCommentTree(
      input,
      currentIndex + 1,
      depth + 1,
    );

    comment.comments = childComments;
    comments.push(comment);
    currentIndex = nextIndex;
  }

  return [comments, currentIndex];
}

export const SELECTORS = {
  commentTree: (within: Document | Element | null) =>
    within?.querySelector(".comment-tree"),
  links: {
    context: (within?: Element | null) =>
      within?.querySelector("a[href^='context']"),
    favorite: (within?: Element | null) =>
      within?.querySelector("a[href^='fave']"),
    flag: (within?: Element | null) => within?.querySelector("a[href^='flag']"),
    from: (within?: Element | null) => within?.querySelector(".sitebit a"),
    item: (within?: Element | null) => within?.querySelector("a[href^='item']"),
    parent: (within?: Element | null) =>
      within?.querySelector("a[href^='item']"),
    past: (within?: Element | null) => within?.querySelector(".hnpast"),
    story: (within?: Element | null) =>
      within?.querySelector(".onstory a[href^='item']"),
    vote: (within?: Element | null) => within?.querySelector(".votelinks"),
  },
  score: (within?: Element | null) => within?.querySelector("[id^='score_']"),
};

export function getBodyHTML(parent?: Element | null) {
  if (!parent) return "";

  return pipe(parent?.innerHTML, (html: string | undefined) => {
    if (!html) return "";

    /**
     * The reply link is inconsistently placed in the tree depending on
     * whether the comment has been HTML-formatted. The following may
     * look a bit strange but it seems to cover the different variations.
     */
    const template = document.createElement("template");
    const div = document.createElement("div");

    template.appendChild(div);
    div.innerHTML = html;
    div.querySelector(".reply")?.remove();

    return div.innerHTML;
  });
}

export function getComments(parent?: Element | null) {
  const commentRows = parent?.querySelectorAll(".comtr") ?? [];
  const commentsData: [TComment["data"], number][] = [];

  for (const row of commentRows) {
    const rowIndent = getRowIndent(row);

    // parents
    const ageEle = row.querySelector(".age");
    const commentEle = row.querySelector(".comment");
    const navigationEle = row.querySelector(".navs");
    const votesEle = row.querySelector(".votelinks");

    // children
    const author = row.querySelector(".hnuser")?.textContent ?? "";
    const bodyHTML = getBodyHTML(commentEle);
    const createdHumanized = ageEle?.querySelector("a")?.textContent ?? "";
    const id = pipe(row.getAttribute("id") ?? "", getRowId);
    const itemUrl = ageEle?.querySelector("a")?.getAttribute("href") ?? "";
    const replyUrl =
      commentEle?.querySelector("a[href^='reply']")?.getAttribute("href") ?? "";

    // interactions
    const navigationElements = navigationEle?.querySelectorAll("a");
    const interactions: TComment["data"]["interactions"] = {};
    navigationElements?.forEach((node) => {
      switch (node.textContent) {
        case "next":
        case "parent":
        case "prev": {
          const href = node?.getAttribute("href") ?? "";
          node.setAttribute("href", `#${getRowId(href)}`);
          interactions[node.textContent] = getNodeHTML(node.cloneNode());
          break;
        }
      }

      if (node.classList.contains("togg")) {
        interactions.toggle = getNodeHTML(node.cloneNode());
      }
    });
    const voteDown = pipe(
      votesEle?.querySelector("a[id^='down_']")?.cloneNode(),
      (node?: Node) => getNodeHTML(node),
    );
    const voteUp = pipe(
      votesEle?.querySelector("a[id^='up_']")?.cloneNode(),
      (node?: Node) => getNodeHTML(node),
    );

    const rowData: TComment["data"] = {
      author,
      bodyHTML,
      createdHumanized,
      id,
      interactions: {
        ...interactions,
        voteDown,
        voteUp,
      },
      itemUrl,
      replyUrl,
    };

    commentsData.push([rowData, rowIndent]);
  }

  return buildCommentTree(commentsData, 0, 0)[0];
}

export function getCommentsCount(parent?: Element | null) {
  if (!parent) return undefined;

  return pipe(
    parent.querySelectorAll("a[href^='item?id=']"),
    (nodes: NodeListOf<Element>) => {
      let found: number = 0;

      nodes.forEach((node) => {
        const { textContent } = node;

        if (/(comments|discuss)/g.test(textContent ?? "")) {
          const count = parseInt(textContent?.replace(/\Wcomments/g, "") ?? "");

          if (!isNaN(count)) found = count;
        }
      });

      return found;
    },
  );
}

export function getScore(parent?: Element | null) {
  return pipe(
    parseInt(
      parent
        ?.querySelector("[id^='score_']")
        ?.textContent?.replace(/\Wpoints?/g, "") ?? "",
    ),
    (scoreInt: number) => (isNaN(scoreInt) ? undefined : scoreInt),
  );
}

export function getStoryListItem(parent?: Element | null): TStoryListItem {
  if (!parent) throw new Error("Error getting story list item");

  const metadataElement = parent.nextElementSibling?.querySelector(".subtext");

  // children
  const commentsCount = getCommentsCount(metadataElement) ?? 0;
  const createdAt =
    metadataElement?.querySelector(".age")?.getAttribute("title") ?? "";
  const createdHumanized =
    metadataElement?.querySelector(".age a")?.textContent ?? "";
  const id = parent?.getAttribute("id") ?? "";
  const links: TStoryListItem["links"] = {
    favorite:
      SELECTORS.links.favorite(metadataElement)?.getAttribute("href") ??
      undefined,
    flag:
      SELECTORS.links.flag(metadataElement)?.getAttribute("href") ?? undefined,
    from: SELECTORS.links.from(parent)?.getAttribute("href") ?? undefined,
    item:
      SELECTORS.links.item(metadataElement)?.getAttribute("href") ?? undefined,
    past:
      SELECTORS.links.past(metadataElement)?.getAttribute("href") ?? undefined,
  };
  const score = getScore(metadataElement);
  const siteName = parent?.querySelector(".titleline .sitebit a")?.textContent;
  const siteUrl = parent?.querySelector(".titleline a")?.getAttribute("href");
  const site =
    siteName && siteUrl
      ? {
          name: siteName,
          url: siteUrl,
        }
      : undefined;
  const title = parent?.querySelector(".titleline a")?.textContent ?? "";
  const userId = metadataElement?.querySelector(".hnuser")?.textContent;
  const userLink = metadataElement
    ?.querySelector(".hnuser")
    ?.getAttribute("href");
  const user =
    userId && userLink
      ? {
          id: userId,
          link: userLink,
        }
      : undefined;

  // interactions
  const hide = pipe(
    metadataElement?.querySelector("a[href^='hide']")?.cloneNode(),
    (node?: Node) => getNodeHTML(node),
  );
  const { voted, voteDown, voteUp } = getVoteInteractions(parent);

  return {
    commentsCount,
    createdAt,
    createdHumanized,
    id,
    interactions: {
      hide,
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

export function getVoteInteractions(parent?: Element | null) {
  if (!parent) return {};

  const voteLinks = SELECTORS.links.vote(parent);

  return {
    voted: pipe(
      parent?.querySelector(".nosee")?.getAttribute("id"),
      (id: string) =>
        pipe(id?.replace(/_\d*/g, ""), (direction: TVoteDirection) =>
          !direction || !voteDirections.includes(direction)
            ? undefined
            : direction,
        ),
    ),
    voteDown: pipe(
      voteLinks?.querySelector("a[id^='down_']")?.cloneNode(),
      (node?: Node) => getNodeHTML(node),
    ),
    voteUp: pipe(
      voteLinks?.querySelector("a[id^='up_']")?.cloneNode(),
      (node?: Node) => getNodeHTML(node),
    ),
  };
}
