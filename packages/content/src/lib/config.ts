import { getView } from "@hnp/scraper";
import type { TConfig } from "@hnp/types";

export function getConfig(): TConfig {
  const {
    location: { hostname, pathname },
  } = window;
  const view = getView();

  return { hostname, pathname, view };
}
