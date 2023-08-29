import {
  browser,
  HNP_CONTENT_ELEMENT_ID,
  HNP_HTML_ELEMENT_CLASS_NAME,
  HNP_SANDBOX_ELEMENT_ID,
  HNP_STYLE_ELEMENT_ID,
  MESSAGE_ACTIONS,
  SELECTORS,
  storageGetByKey,
  toggleStylesheet,
} from "@hnp/core";
import {
  TMessageEvent,
  TSandboxMessage,
  TStorageKey,
  TThemeChanged,
} from "@hnp/types";
import { debounce } from "lodash";

import { renderContent } from "./sandbox";

export function handleMessageEvent(event: TMessageEvent<TThemeChanged>) {
  const { action, value } = event;

  switch (action) {
    case MESSAGE_ACTIONS.UPDATE_THEME: {
      const styleEl = document.getElementById(
        HNP_STYLE_ELEMENT_ID,
      ) as HTMLStyleElement;
      const contentEl = document.getElementById(
        HNP_CONTENT_ELEMENT_ID,
      ) as HTMLDivElement;

      if (value === null) {
        styleEl.innerHTML = "";
        contentEl.innerHTML = "";
      } else {
        styleEl.innerHTML = value.style.template;
        contentEl.innerHTML = value.compiled;

        /** @note Do not block here */
        storageGetByKey("NAVIGATION_TYPE").then(async (navigationType) => {
          if (navigationType === "back_forward") {
            const scrollPositions = await storageGetByKey("SCROLL_POSITIONS");
            const scrollPosition = scrollPositions?.[window.location.href];

            if (scrollPosition !== undefined) {
              window.scrollTo(0, scrollPosition);
            }
          }
        });
      }

      const templateExists = !!value?.compiled;
      const { documentElement } = document;
      const hnMain = SELECTORS.HN.main();
      const hnStyleSelector = "link[href^='news.css']";
      const darkModeAttribute = "data-bs-theme";

      if (templateExists) {
        documentElement.classList.add(HNP_HTML_ELEMENT_CLASS_NAME);
        documentElement.setAttribute(
          darkModeAttribute,
          value.style.options.darkMode ? "dark" : "light",
        );
        if (hnMain) hnMain.style.display = "none";
        toggleStylesheet(hnStyleSelector, false);
      } else {
        documentElement.classList.remove(HNP_HTML_ELEMENT_CLASS_NAME);
        documentElement.removeAttribute(darkModeAttribute);
        if (hnMain) hnMain.style.display = "table";
        toggleStylesheet(hnStyleSelector, true);
      }
      break;
    }

    default:
      throw new Error("Unknown message event action");
  }
}

export function sendSandboxMessage<T>(message: TSandboxMessage<T>) {
  const sandbox = document.getElementById(
    HNP_SANDBOX_ELEMENT_ID,
  ) as HTMLIFrameElement;
  const { contentWindow } = sandbox;

  contentWindow?.postMessage(message, "*");
}

export function startContentListeners() {
  browser.storage.onChanged.addListener(async (event) => {
    for (const key of Object.keys(event) as Array<TStorageKey>) {
      switch (key) {
        case "CUSTOM_THEMES":
        case "OPTIONS":
        case "SELECTED_THEME_ID": {
          renderContent();
          break;
        }
      }
    }
  });

  // observe changes to HN content to handle content re-rendering
  const targetNode = SELECTORS.HN.main();
  if (targetNode) {
    const observerConfig: MutationObserverInit = {
      childList: true,
      subtree: true,
    };

    const render = debounce(renderContent, 100);
    const observer = new MutationObserver((mutationList: MutationRecord[]) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          /**
           * Content rendering is throttled because HN lazily loads comments
           * which can trigger thousands of mutations at once that cause the
           * window to get stuck in an infinite loader and crash the page.
           */
          render();
        }
      }
    });

    observer.observe(targetNode, observerConfig);
  }
}
