import { browser, storageGetByKey, storageSetByKeys } from "@hnp/core";
import { TCurrentTheme } from "@hnp/types";

function main() {
  const { action, declarativeContent, runtime, tabs, webRequest } = browser;
  const { manifest_version } = runtime.getManifest();

  runtime.onInstalled.addListener(async () => {
    // apply default theme if no current theme exists such as in a fresh install
    const currentTheme = await storageGetByKey("CURRENT_THEME");

    if (!currentTheme) {
      const defaultTheme: TCurrentTheme = {
        id: "default",
        label: "Default",
        type: "premade",
      };

      await storageSetByKeys({ CURRENT_THEME: defaultTheme });
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

    if (process.env.NODE_ENV === "development") {
      runtime.onMessage.addListener((message) => {
        if (message === "reload") {
          tabs.query({ active: true }).then(() => {
            runtime.reload();
            tabs.reload();
          });
        }
      });
    }
  });

  runtime.onMessage.addListener(async (message) => {
    const tabsQuery = await tabs.query({
      active: true,
      currentWindow: true,
    });
    const tabId = tabsQuery[0].id ?? -1;

    tabs.sendMessage(tabId, message);
  });

  if (manifest_version === 2) {
    webRequest.onBeforeRequest.addListener(
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
