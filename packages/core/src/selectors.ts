export const HN_STYLESHEET = "link[href^='news.css']";
export const HNP_BOOTSTRAP_CSS_ELEMENT_ID = "hnp-bootstrap-css";
export const HNP_BOOTSTRAP_JS_ELEMENT_ID = "hnp-bootstrap-js";
export const HNP_CONTENT_ELEMENT_ID = "hnp-content";
export const HNP_HTML_ELEMENT_CLASS_NAME = "hnp";
export const HNP_ROOT_ELEMENT_ID = "hnp-root";
export const HNP_SANDBOX_ELEMENT_ID = "hnp-sandbox";
export const HNP_STYLE_ELEMENT_ID = "hnp-style";
export const HNP_WEB_COMPONENTS_JS_ELEMENT_ID = "hnp-web-components";

export const SELECTORS = Object.freeze({
  HN: {
    main: () => document.getElementById("hnmain"),
    stylesheet: () => document.head.querySelector(HN_STYLESHEET),
  },
  HNP: {
    bootstrapStylesheet: () =>
      document.getElementById(HNP_BOOTSTRAP_CSS_ELEMENT_ID) as HTMLLinkElement,
    content: () =>
      document.getElementById(HNP_CONTENT_ELEMENT_ID) as HTMLDivElement,
    style: () =>
      document.getElementById(HNP_STYLE_ELEMENT_ID) as HTMLStyleElement,
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
