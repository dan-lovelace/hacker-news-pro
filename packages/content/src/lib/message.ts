import {
  browser,
  HNP_CONTENT_ELEMENT_ID,
  HNP_HTML_ELEMENT_CLASS_NAME,
  HNP_SANDBOX_ELEMENT_ID,
  HNP_STYLE_ELEMENT_ID,
  MESSAGE_ACTIONS,
  SELECTORS,
} from "@hnp/core";
import {
  TMessageEvent,
  TSandboxMessage,
  TStorageKey,
  TThemeChanged,
} from "@hnp/types";

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
        styleEl.innerHTML = value.style;
        contentEl.innerHTML = value.compiled;
      }

      const templateExists = !!value?.compiled;
      const { documentElement } = document;
      const hnMain = SELECTORS.HN.main();
      const hnStylesheet = SELECTORS.HN.stylesheet();

      if (templateExists) {
        documentElement.classList.add(HNP_HTML_ELEMENT_CLASS_NAME);
        if (hnMain) hnMain.style.display = "none";
        if (hnStylesheet) hnStylesheet.setAttribute("disabled", "true");
      } else {
        documentElement.classList.remove(HNP_HTML_ELEMENT_CLASS_NAME);
        if (hnMain) hnMain.style.display = "block";
        if (hnStylesheet) hnStylesheet.removeAttribute("disabled");
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

export function startListeners() {
  browser.runtime.onMessage.addListener(
    (event: TMessageEvent<TThemeChanged>) => {
      handleMessageEvent(event);
    },
  );

  browser.storage.onChanged.addListener(async (event) => {
    for (const key of Object.keys(event) as Array<TStorageKey>) {
      switch (key) {
        case "SELECTED_THEME_ID":
        case "CUSTOM_THEMES": {
          renderContent();
          break;
        }
      }
    }
  });

  window.addEventListener(
    "message",
    (event: MessageEvent<TMessageEvent<TThemeChanged>>) => {
      handleMessageEvent(event.data);
    },
  );

  // observe changes to HN content to handle content re-rendering
  const targetNode = SELECTORS.HN.main();
  if (targetNode) {
    const observerConfig: MutationObserverInit = {
      childList: true,
      subtree: true,
    };

    let lastRendered: number = 0;
    const maximumFPS = 120;
    const observer = new MutationObserver((mutationList: MutationRecord[]) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          /**
           * Content rendering is throttled because HN lazily loads comments
           * which can trigger thousands of mutations at once that cause the
           * window to get stuck in an infinite loader and crash the page.
           */
          if (new Date().getTime() - lastRendered > maximumFPS / 1000) {
            renderContent();
            lastRendered = new Date().getTime();
          }
        }
      }
    });

    observer.observe(targetNode, observerConfig);
  }
}
