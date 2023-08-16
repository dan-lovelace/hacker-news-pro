import {
  browser,
  getCurrentTheme,
  MESSAGE_ACTIONS,
  STORAGE_KEYS,
} from "@hnp/core";
import {
  TConfig,
  TMessageEvent,
  TSandboxMessage,
  TThemeChanged,
} from "@hnp/types";

import { getConfig } from "./config";
import { getTemplateContext } from "./sandbox";

export function handleMessageEvent(event: TMessageEvent<TThemeChanged>) {
  const { action, value } = event;

  switch (action) {
    case MESSAGE_ACTIONS.UPDATE_THEME: {
      const config = getConfig();

      const styleEl = document.getElementById("rts-style") as HTMLStyleElement;
      const contentEl = document.getElementById(
        "rts-content"
      ) as HTMLDivElement;

      if (value === null) {
        styleEl.innerHTML = "";
        contentEl.innerHTML = "";
        document.documentElement.classList.remove(config.mode);
      } else {
        styleEl.innerHTML = value.style;
        contentEl.innerHTML = value.compiled;
        document.documentElement.classList.add(config.mode);
      }
      break;
    }

    default:
      throw new Error("Unknown message event action");
  }
}

export function sendSandboxMessage<T>(message: TSandboxMessage<T>) {
  const sandbox = document.getElementById("rts-sandbox") as HTMLIFrameElement;
  const { contentWindow } = sandbox;

  contentWindow?.postMessage(message, "*");
}

export function startListeners<T>(data: T, config: TConfig) {
  browser.runtime.onMessage.addListener(
    (event: TMessageEvent<TThemeChanged>) => {
      handleMessageEvent(event);
    }
  );

  browser.storage.onChanged.addListener(async (event) => {
    for (const key of Object.keys(event)) {
      switch (key) {
        case STORAGE_KEYS.CURRENT_THEME: {
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

        case STORAGE_KEYS.CUSTOM_THEMES: {
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
    }
  );
}
