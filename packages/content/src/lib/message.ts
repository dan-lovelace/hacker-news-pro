import {
  browser,
  getCurrentTheme,
  HNP_CONTENT_ELEMENT_ID,
  HNP_HTML_ELEMENT_CLASS_NAME,
  HNP_SANDBOX_ELEMENT_ID,
  HNP_STYLE_ELEMENT_ID,
  MESSAGE_ACTIONS,
} from "@hnp/core";
import {
  TConfig,
  TMessageEvent,
  TSandboxMessage,
  TStorageKey,
  TThemeChanged,
} from "@hnp/types";

import { getTemplateContext } from "./sandbox";

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

export function startListeners<T>(data: T, config: TConfig) {
  browser.runtime.onMessage.addListener(
    (event: TMessageEvent<TThemeChanged>) => {
      handleMessageEvent(event);
    },
  );

  browser.storage.onChanged.addListener(async (event) => {
    for (const key of Object.keys(event) as Array<TStorageKey>) {
      switch (key) {
        case "CURRENT_THEME": {
          // current theme changed or was removed
          const themeToApply = await getCurrentTheme(config);

          sendSandboxMessage({
            context: getTemplateContext(data, config),
            event: {
              action: MESSAGE_ACTIONS.UPDATE_THEME,
              value: themeToApply,
            },
          });
          break;
        }

        case "CUSTOM_THEMES": {
          // custom theme changed
          const themeToApply = await getCurrentTheme(config);

          if (!themeToApply) return;

          sendSandboxMessage({
            context: getTemplateContext(data, config),
            event: {
              action: MESSAGE_ACTIONS.UPDATE_THEME,
              value: themeToApply,
            },
          });
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
}
