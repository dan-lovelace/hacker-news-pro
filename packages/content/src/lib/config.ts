import type { TConfig } from "@hnp/types";
import { matchRoutes } from "react-router-dom";

import { CONTENT_ROUTES } from "./routes";

export function getConfig(): TConfig {
  const {
    location: { hostname },
  } = window;
  const route = matchRoutes(CONTENT_ROUTES, window.location.pathname);

  if (!route) throw new Error("Invalid route provided to getConfig()");

  const view = route[0].route.view;

  return { hostname, view };
}
