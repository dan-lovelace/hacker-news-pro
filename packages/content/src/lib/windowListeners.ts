import { storageGetByKey, storageSetByKeys } from "@hnp/core";
import { TMessageEvent, TThemeChanged } from "@hnp/types";

import { handleMessageEvent } from "./message";

async function messageListener(
  event: MessageEvent<TMessageEvent<TThemeChanged>>,
) {
  handleMessageEvent(event.data);
}

async function pageShowListener() {
  const { type } = performance.getEntriesByType(
    "navigation",
  )?.[0] as PerformanceNavigationTiming;

  if (!type) return;

  const {
    location: { href },
  } = window;
  const scrollPositions = await storageGetByKey("SCROLL_POSITIONS");

  if (!scrollPositions || !scrollPositions[href]) return;

  switch (type) {
    case "reload":
      delete scrollPositions[href];
      storageSetByKeys({
        SCROLL_POSITIONS: scrollPositions,
      });
      break;
  }

  storageSetByKeys({
    NAVIGATION_TYPE: type,
  });
}

async function scrollListener() {
  const scrollPositions = await storageGetByKey("SCROLL_POSITIONS");
  const expireAfterMinutes = 15;
  const newEntry = {
    [window.location.href]: {
      expires: new Date().getTime() + expireAfterMinutes * 60 * 1000,
      position: window.scrollY,
    },
  };

  storageSetByKeys({
    SCROLL_POSITIONS: {
      ...scrollPositions,
      ...newEntry,
    },
  });
}

window.addEventListener("message", messageListener);
window.addEventListener("pageshow", pageShowListener);
window.addEventListener("scroll", scrollListener);
