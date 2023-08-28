import type { TConfig, TView } from "@hnp/types";
import { matchRoutes } from "react-router-dom";

import { CONTENT_ROUTES } from "./routes";

function getView(): TView {
  if (window.location.pathname === "/item") {
    /**
     * For item routes, we need to parse the document to make a determination
     * of item type.
     */

    /**
     * The number of voting elements is a good indicator when determining poll
     * and job item types.
     */
    const voteElements = document.querySelectorAll(
      ".fatitem .athing > .votelinks",
    );
    if (voteElements.length > 1) {
      return "pollItem";
    } else if (voteElements.length === 0) {
      return "jobItem";
    }

    if (document.querySelector(".fatitem .athing .titleline") !== null) {
      return "storyItem";
    }

    return "commentItem";
  }

  /**
   * Non-item routes are easier to infer type since they're 1:1.
   */
  const route = matchRoutes(CONTENT_ROUTES, window.location.pathname);

  if (!route) throw new Error("Invalid route provided to getConfig()");

  return route[0].route.view;
}

export function getConfig(): TConfig {
  const {
    location: { hostname },
  } = window;
  const view = getView();

  return { hostname, view };
}
