import { TViewRoute, viewRouteMap } from "@hnp/types";
import { RouteObject } from "react-router-dom";

type Route = RouteObject & TViewRoute;

export const CONTENT_ROUTES: Route[] = Object.keys(viewRouteMap).map((key) => ({
  path: key,
  element: false,
  view: viewRouteMap[key],
}));
