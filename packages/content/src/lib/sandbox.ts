import {
  getAssetURL,
  getCurrentTheme,
  logDebug,
  MESSAGE_ACTIONS,
  storageGetByKey,
} from "@hnp/core";
import { getConfig, getPageData } from "@hnp/scraper";
import { TConfig, TPageDataExtension, TContext } from "@hnp/types";

import { sendSandboxMessage, startContentListeners } from "./message";

const assetsBaseURL = getAssetURL("img/content");
const assets = {
  baseURL: assetsBaseURL,
  icons: {
    chevronDown_dark: `${assetsBaseURL}/icons/chevronDown_dark.svg`,
    chevronDown: `${assetsBaseURL}/icons/chevronDown.svg`,
    expandDown_dark: `${assetsBaseURL}/icons/expandDown_dark.svg`,
    expandDown: `${assetsBaseURL}/icons/expandDown.svg`,
  },
  images: {
    hnLogo_256: `${assetsBaseURL}/images/hnLogo_256.png`,
    hnLogo: `${assetsBaseURL}/images/hnLogo.svg`,
  },
};

export function getTemplateContext<T>(
  config: TConfig,
  pageData: T & TPageDataExtension,
): TContext<T> {
  return {
    assets,
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
  const pageData = getPageData(config.view);
  const context = getTemplateContext(config, pageData);
  const themeToApply = await getCurrentTheme(config);
  const options = await storageGetByKey("OPTIONS");

  if (options?.developerMode) {
    logDebug("context", context);
  }

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
