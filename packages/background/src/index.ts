import { browser, STORAGE_KEYS } from "@hnp/core";
import { TCurrentTheme } from "@hnp/types";

const { CURRENT_THEME } = STORAGE_KEYS;

function main() {
  const { manifest_version } = browser.runtime.getManifest();

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

    if (process.env.NODE_ENV === "development") {
      browser.runtime.onMessage.addListener((message) => {
        if (message === "reload") {
          browser.tabs.query({ active: true }).then(() => {
            browser.runtime.reload();
            browser.tabs.reload();
          });
        }
      });
    }
  });

  browser.runtime.onMessage.addListener(async (message) => {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    const tabId = tabs[0].id ?? -1;

    browser.tabs.sendMessage(tabId, message);
  });

  if (manifest_version === 2) {
    browser.webRequest.onBeforeRequest.addListener(
      () => ({ cancel: true }),
      {
        // urls must include initiator origin
        urls: ["https://news.ycombinator.com/*"],
        types: ["stylesheet"],
      },
      ["blocking"],
    );
  }
}

main();
