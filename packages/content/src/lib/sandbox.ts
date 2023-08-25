import { browser, getCurrentTheme, MESSAGE_ACTIONS } from "@hnp/core";
import { getPageData, TConfig, TSandboxContext } from "@hnp/types";

import { getConfig } from "./config";
import { sendSandboxMessage, startContentListeners } from "./message";

const originalLogoUrl = browser.runtime.getURL("img/hn_logo.svg");

export function getTemplateContext<T>(
  config: TConfig,
  pageData: T,
): TSandboxContext<T> {
  return {
    assets: {
      originalLogoUrl,
    },
    config,
    pageData,
  };
}

export function handleSandboxLoad({ initialize }: { initialize: () => void }) {
  return () => {
    startContentListeners();
    renderContent();
    initialize();
  };
}

export async function renderContent() {
  const config = getConfig();
  const { view } = config;
  const pageData = getPageData(view);
  console.log("pageData", pageData);
  const context = getTemplateContext(config, pageData);
  const themeToApply = await getCurrentTheme(config);

  if (!themeToApply) return;

  sendSandboxMessage({
    context,
    event: {
      action: MESSAGE_ACTIONS.UPDATE_THEME,
      value: themeToApply,
    },
  });
}
