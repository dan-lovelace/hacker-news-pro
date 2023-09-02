import {
  getAssetURL,
  getCurrentTheme,
  MESSAGE_ACTIONS,
  storageGetByKey,
} from "@hnp/core";
import { getPageData } from "@hnp/scraper";
import { TConfig, TSandboxContext } from "@hnp/types";

import { getConfig } from "./config";
import { sendSandboxMessage, startContentListeners } from "./message";

export function getTemplateContext<T>(
  config: TConfig,
  pageData: T,
): TSandboxContext<T> {
  return {
    assets: {
      baseURL: getAssetURL("img/content"),
    },
    config,
    pageData,
  };
}

export function handleSandboxLoad() {
  startContentListeners();
  renderContent();
}

export async function renderContent() {
  const config = getConfig();
  const { view } = config;
  const pageData = getPageData(view);
  const context = getTemplateContext(config, pageData);
  console.log("context", context);
  const themeToApply = await getCurrentTheme(config);
  const options = await storageGetByKey("OPTIONS");

  if (!themeToApply) return;

  sendSandboxMessage({
    context,
    event: {
      action: MESSAGE_ACTIONS.UPDATE_THEME,
      options,
      value: themeToApply,
    },
  });
}
