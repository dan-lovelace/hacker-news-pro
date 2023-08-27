import { getNodeHTML, pipe } from "@hnp/core";

import { IParsable, List, TListItem } from "..";

export type TComment = {
  data: {
    author: string;
    bodyHTML: string;
    createdHumanized: string;
    id: string;
    interactions: {
      next?: string;
      parent?: string;
      prev?: string;
      toggle?: string;
      voteDown?: string;
      voteUp?: string;
    };
    itemUrl: string;
    replyUrl: string;
  };
  depth: number;
  comments: TComment[];
};

export type TItem = TListItem & {
  bodyHTML?: string;
  comments: TComment[];
  forms: {
    comment: {
      inputs: Record<string, string>;
    };
  };
  type: "comment" | "job" | "poll" | "pollOpt" | "story";
};

export const getRowId = (id: string) =>
  `item_${id.replaceAll(/(#|item_)/g, "")}`;

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

export class Item implements IParsable<TItem> {
  parse(document: Document): TItem {
    // TODO: get type and parse accordingly

    const listItem = new List().parse(document).items[0];

    // build comment tree
    const commentsTable = document.querySelector(".comment-tree");
    const commentRows = commentsTable?.querySelectorAll(".comtr") ?? [];
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
      const bodyHTML = pipe(
        commentEle?.innerHTML,
        (html: string | undefined) => {
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
        },
      );
      const createdHumanized = ageEle?.querySelector("a")?.textContent ?? "";
      const id = pipe(row.getAttribute("id") ?? "", getRowId);
      const itemUrl = ageEle?.querySelector("a")?.getAttribute("href") ?? "";
      const replyUrl =
        commentEle?.querySelector("a[href^='reply']")?.getAttribute("href") ??
        "";

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
    const comments = buildCommentTree(commentsData, 0, 0)[0];

    // forms
    const commentForm = document.querySelector("form[action='comment']");
    const commentParentInput =
      commentForm?.querySelector("input[name='parent']")?.outerHTML ?? "";
    const commentGotoInput =
      commentForm?.querySelector("input[name='goto']")?.outerHTML ?? "";
    const commentHmacInput =
      commentForm?.querySelector("input[name='hmac']")?.outerHTML ?? "";

    // other
    // TODO: get type from content
    const type =
      document.querySelector(".fatitem .titleline") !== null
        ? "story"
        : "comment";
    const bodyHTML = document.querySelector(
      type === "story" ? ".toptext" : ".fatitem .comment",
    )?.innerHTML;

    return {
      ...listItem,
      bodyHTML,
      comments,
      forms: {
        comment: {
          inputs: {
            parent: commentParentInput,
            goto: commentGotoInput,
            hmac: commentHmacInput,
          },
        },
      },
      type,
    };
  }
}
