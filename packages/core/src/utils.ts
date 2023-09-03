import { browser } from "./browser";

const disabledStylesheets: { [key: string]: Element } = {};
const {
  runtime: { getURL },
} = browser;

export function getAssetURL(path?: string) {
  const assetBase = "assets";

  if (!path) return getURL(assetBase);

  return getURL(`${assetBase}/${path}`);
}

export function logDebug(label: string, ...data: any[]) {
  // eslint-disable-next-line no-console
  console.log("%cHNP%c:", "color: #ff6600", "color: unset", label, ...data);
}

export function pipe<T, U extends (...args: any[]) => any>(
  expression: T,
  fn: U,
): ReturnType<U> {
  return fn(expression);
}

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
