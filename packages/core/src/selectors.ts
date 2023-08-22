export const HNP_CONTENT_ELEMENT_ID = "hnp-content";
export const HNP_HTML_ELEMENT_CLASS_NAME = "hnp";
export const HNP_ROOT_ELEMENT_ID = "hnp-root";
export const HNP_SANDBOX_ELEMENT_ID = "hnp-sandbox";
export const HNP_STYLE_ELEMENT_ID = "hnp-style";

export const SELECTORS = Object.freeze({
  HN: {
    main: () => document.getElementById("hnmain"),
    stylesheet: () => document.head.querySelector("link[href^='news.css']"),
  },
});

export function waitForElement(selector: string) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}
