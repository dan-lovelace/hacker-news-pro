import {
  DEFAULT_OPTIONS,
  browser,
  fetchThemeData,
  storageSetByKeys,
} from "@hnp/core";
import { DEFAULT_THEME_ID } from "@hnp/core/src/themes/default";
import { TSelectedTheme } from "@hnp/types";

function main() {
  const { action, declarativeContent, runtime } = browser;

  runtime.onInstalled.addListener(async () => {
    // apply default theme if no current theme exists such as in a fresh install
    const { currentTheme } = await fetchThemeData();

    if (!currentTheme) {
      const defaultTheme: TSelectedTheme = DEFAULT_THEME_ID;

      await storageSetByKeys({
        OPTIONS: DEFAULT_OPTIONS,
        SELECTED_THEME_ID: defaultTheme,
      });
    }

    // enable/disable browser action based on selected tab
    action.disable();
    declarativeContent.onPageChanged.removeRules(undefined, () => {
      declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            new declarativeContent.PageStateMatcher({
              pageUrl: { hostSuffix: "news.ycombinator.com" },
            }),
          ],
          actions: [new declarativeContent.ShowAction()],
        },
      ]);
    });
  });
}

main();
