const disabledStylesheets: { [key: string]: Element } = {};

/**
 * Allows enabling or disabling of stylesheets in an idempotent manner. It is
 * used to prevent reapplication of HN styles when content is lazily loaded.
 * In such cases, simply adding a `disabled` attribute to the stylesheet is not
 * enough.
 * @param selector CSS selector passed into `document.querySelector`
 * @param enabled Toggle value
 */
export function toggleStylesheet(selector: string, enabled: boolean) {
  const element = document.querySelector(selector);

  if (enabled && disabledStylesheets[selector] && !element) {
    document.head.appendChild(disabledStylesheets[selector]);
    delete disabledStylesheets[selector];
  } else if (!enabled && element) {
    disabledStylesheets[selector] = element;
    element.remove();
  }
}

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
