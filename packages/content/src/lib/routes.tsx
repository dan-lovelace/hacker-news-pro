import { TViewRoute, viewRouteMap } from "@hnp/types";

export const CONTENT_ROUTES: TViewRoute[] = Object.keys(viewRouteMap).map(
  (key) => ({
    path: key,
    view: viewRouteMap[key],
  }),
);
