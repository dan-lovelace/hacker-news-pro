import { getNodeHTML, pipe } from "@hnp/core";
import {
  TComment,
  TCommentListItem,
  TForm,
  TJobListItem,
  TPollOptionItem,
  TStoryListItem,
  TVoteDirection,
  voteDirections,
} from "@hnp/types";

import { SELECTORS, buildCommentTree, getRowId, getRowIndent } from "..";

export function getAge(parent?: Element | null) {
  const ageElement = parent?.querySelector(".age");
  const humanized = ageElement?.textContent ?? undefined;
  const timestamp = ageElement?.getAttribute("title") ?? undefined;

  return { humanized, timestamp };
}

export function getBodyHTML(parent?: Element | null) {
  if (!parent) return undefined;

  return pipe(parent?.innerHTML, (html: string | undefined) => {
    if (!html) return undefined;

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

export function getCommentListItem(parent?: Element | null): TCommentListItem {
  if (!parent) throw new Error("Error getting comment list item");

  // parents
  const commentHeadElement = parent.querySelector(".comhead");
  const linksElement = parent.querySelector(".navs");

  // children
  const age = getAge(commentHeadElement);
  const bodyHTML = getBodyHTML(parent.querySelector(".comment"));
  const id = parent.getAttribute("id") ?? "";
  const links: TCommentListItem["links"] = {
    context:
      SELECTORS.links.context(linksElement)?.getAttribute("href") ?? undefined,
    favorite:
      SELECTORS.links.favorite(linksElement)?.getAttribute("href") ?? undefined,
    flag: SELECTORS.links.flag(linksElement)?.getAttribute("href") ?? undefined,
    next: SELECTORS.links.next(linksElement)?.getAttribute("href") ?? undefined,
    parent:
      SELECTORS.links.parent(linksElement)?.getAttribute("href") ?? undefined,
    story:
      SELECTORS.links.story(linksElement)?.getAttribute("href") ?? undefined,
    unflag:
      SELECTORS.links.unflag(linksElement)?.getAttribute("href") ?? undefined,
  };
  const story = {
    title: linksElement?.querySelector(".onstory a")?.textContent ?? "",
  };
  const user = {
    id: commentHeadElement?.querySelector(".hnuser")?.textContent ?? "",
    link:
      commentHeadElement?.querySelector(".hnuser")?.getAttribute("href") ?? "",
  };

  // interactions
  const { voted, voteDown, voteUp } = getVoteInteractions(parent);

  return {
    age,
    bodyHTML,
    id,
    interactions: {
      voteDown,
      voteUp,
    },
    links,
    story,
    user,
    voted,
  };
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
    const age = getAge(row);
    const author = row.querySelector(".hnuser")?.textContent ?? "";
    const bodyHTML = getBodyHTML(commentEle);
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
      age,
      author,
      bodyHTML,
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

export function getForm(form?: Element | null): TForm {
  const action = form?.getAttribute("action") ?? undefined;
  const hiddenInputs = pipe(
    [
      form?.querySelector("input[name='hmac']")?.outerHTML ?? undefined,
      form?.querySelector("input[name='goto']")?.outerHTML ?? undefined,
      form?.querySelector("input[name='parent']")?.outerHTML ?? undefined,
    ],
    (inputsArray: Array<string | undefined>) =>
      inputsArray.every(Boolean) ? inputsArray.join("\n") : undefined,
  );
  const method = form?.getAttribute("method") ?? undefined;

  return {
    action,
    hiddenInputs,
    method,
  };
}

export function getJobListItem(parent?: Element | null): TJobListItem {
  if (!parent) throw new Error("Error getting job list item");

  const metadataElement = parent.nextElementSibling?.querySelector(".subtext");

  // children
  const age = getAge(metadataElement);
  const links: TJobListItem["links"] = {
    hide:
      SELECTORS.links.hide(metadataElement)?.getAttribute("href") ?? undefined,
    item:
      SELECTORS.links.item(metadataElement)?.getAttribute("href") ?? undefined,
  };
  const title = parent?.querySelector(".titleline a")?.textContent ?? undefined;

  return { age, links, title };
}

export function getPollOptionItem(parent?: Element | null): TPollOptionItem {
  if (!parent) throw new Error("Error getting poll option item");

  const metadataElement = parent.nextElementSibling?.querySelector(".comhead");

  const id = parent.getAttribute("id") ?? "";
  const score = getScore(metadataElement);
  const title = parent.querySelector(".comment")?.textContent ?? "";

  // interactions
  const { voted, voteDown, voteUp } = getVoteInteractions(parent);

  return {
    id,
    interactions: {
      voteDown,
      voteUp,
    },
    score,
    title,
    voted,
  };
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
    unflag:
      SELECTORS.links.unflag(metadataElement)?.getAttribute("href") ??
      undefined,
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
