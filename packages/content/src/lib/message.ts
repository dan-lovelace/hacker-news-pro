import {
  browser,
  HN_STYLESHEET,
  HNP_HTML_ELEMENT_CLASS_NAME,
  HNP_SANDBOX_ELEMENT_ID,
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
  const {
    action,
    value: { compiled, style },
  } = event;

  switch (action) {
    case MESSAGE_ACTIONS.UPDATE_THEME: {
      const bootstrapStylesheet = SELECTORS.HNP.bootstrapStylesheet();
      const hnpContent = SELECTORS.HNP.content();
      const hnpStyle = SELECTORS.HNP.style();

      if (!compiled && !style) {
        hnpStyle.innerHTML = "";
        hnpContent.innerHTML = "";
      } else {
        hnpStyle.innerHTML = style.template;
        hnpContent.innerHTML = compiled;

        // without blocking, restore scroll position if saved
        storageGetByKey("NAVIGATION_TYPE").then(async (navigationType) => {
          if (navigationType === "back_forward") {
            const scrollPositions = await storageGetByKey("SCROLL_POSITIONS");
            const scrollPosition = scrollPositions?.[window.location.href];

            if (scrollPosition !== undefined) {
              window.scrollTo(0, scrollPosition.position);
            }
          }
        });
      }

      const darkModeAttribute = "data-bs-theme";
      const { documentElement } = document;
      const hnMain = SELECTORS.HN.main();
      const templateExists = !!compiled;

      if (templateExists) {
        documentElement.classList.add(HNP_HTML_ELEMENT_CLASS_NAME);
        documentElement.setAttribute(
          darkModeAttribute,
          style.options.darkMode ? "dark" : "light",
        );
        hnMain.style.display = "none";
        toggleStylesheet(HN_STYLESHEET, false);
        bootstrapStylesheet.removeAttribute("disabled");
      } else {
        documentElement.classList.remove(HNP_HTML_ELEMENT_CLASS_NAME);
        documentElement.removeAttribute(darkModeAttribute);
        hnMain.style.display = "table";
        toggleStylesheet(HN_STYLESHEET, true);
        bootstrapStylesheet.setAttribute("disabled", "true");
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
