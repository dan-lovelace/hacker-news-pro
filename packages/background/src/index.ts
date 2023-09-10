import {
  DEFAULT_OPTIONS,
  browser,
  fetchThemeData,
  storageSetByKeys,
} from "@hnp/core";
import { DEFAULT_THEME_ID } from "@hnp/core/src/themes/default";

browser.runtime.onInstalled.addListener(async () => {
  // apply default theme if no current theme exists such as in a fresh install
  const { currentTheme } = await fetchThemeData();

  if (!currentTheme) {
    await storageSetByKeys({
      OPTIONS: DEFAULT_OPTIONS,
      SELECTED_THEME_ID: DEFAULT_THEME_ID,
    });
  }
});
