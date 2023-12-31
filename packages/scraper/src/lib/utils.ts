import { TComment } from "@hnp/types";

export function getNodeHTML(node?: Node) {
  if (!node) return undefined;

  const ghost = document.createElement("div");
  ghost.appendChild(node);

  return ghost.innerHTML.trim();
}

export const getRowId = (id: string) =>
  `item_${id.replaceAll(/(#|item_)/g, "")}`;

export const getRowIndent = (row: Element) =>
  pipe(
    parseInt(row.querySelector(".ind")?.getAttribute("indent") ?? ""),
    (indentInt: number) => (isNaN(indentInt) ? 0 : indentInt),
  );

export function buildCommentTree(
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

export function pipe<T, U extends (...args: any[]) => any>(
  expression: T,
  fn: U,
): ReturnType<U> {
  return fn(expression);
}
