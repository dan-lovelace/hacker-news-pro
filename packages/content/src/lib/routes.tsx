import { TView } from "@hnp/types";
import { RouteObject } from "react-router-dom";

type Route = RouteObject & {
  path: string;
  view: TView;
};

export const ROUTES: Route[] = [
  {
    path: "/",
    element: false,
    view: "list",
  },
  {
    path: "/ask",
    element: false,
    view: "list",
  },
  {
    path: "/item",
    element: false,
    view: "item",
  },
  {
    path: "/front",
    element: false,
    view: "list",
  },
  {
    path: "/jobs",
    element: false,
    view: "jobs",
  },
  {
    path: "/newcomments",
    element: false,
    view: "list",
  },
  {
    path: "/newest",
    element: false,
    view: "list",
  },
  {
    path: "/news",
    element: false,
    view: "list",
  },
  {
    path: "/show",
    element: false,
    view: "list",
  },
  {
    path: "/submit",
    element: false,
    view: "submit",
  },
  {
    path: "/user",
    element: false,
    view: "user",
  },
];
