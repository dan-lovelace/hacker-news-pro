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
        document.documentElement.classList.remove(HNP_HTML_ELEMENT_CLASS_NAME);
      } else {
        styleEl.innerHTML = value.style;
        contentEl.innerHTML = value.compiled;
        document.documentElement.classList.add(HNP_HTML_ELEMENT_CLASS_NAME);
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
    const observer = new MutationObserver((mutationList: MutationRecord[]) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          renderContent();
        }
      }
    });

    observer.observe(targetNode, observerConfig);
  }
}
