export function getNodeHTML(node?: Node) {
  if (!node) return undefined;

  const ghost = document.createElement("div");
  ghost.appendChild(node);

  return ghost.innerHTML.trim();
}

export function pipe<T, U extends (...args: any[]) => any>(
  expression: T,
  fn: U,
): ReturnType<U> {
  return fn(expression);
}
