import { browser, STORAGE_KEYS } from "@hnp/core";
import { TCurrentTheme } from "@hnp/types";

const { CURRENT_THEME } = STORAGE_KEYS;

function main() {
  browser.runtime.onInstalled.addListener(async () => {
    // apply default theme if no current theme exists such as in a fresh install
    const storedCurrentTheme = await browser.storage.local.get(CURRENT_THEME);
    const currentTheme = storedCurrentTheme[CURRENT_THEME];

    if (!currentTheme) {
      const defaultTheme: TCurrentTheme = {
        id: "default",
        label: "Default",
        type: "premade",
      };

      await browser.storage.local.set({
        [CURRENT_THEME]: defaultTheme,
      });
    }

    // enable/disable browser action based on selected tab
    browser.action.disable();
    browser.declarativeContent.onPageChanged.removeRules(undefined, () => {
      browser.declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            new browser.declarativeContent.PageStateMatcher({
              pageUrl: { hostSuffix: "news.ycombinator.com" },
            }),
          ],
          actions: [new browser.declarativeContent.ShowAction()],
        },
      ]);
    });
  });

  browser.runtime.onMessage.addListener(async (message) => {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    const tabId = tabs[0].id ?? -1;

    browser.tabs.sendMessage(tabId, message);
  });
}

main();
