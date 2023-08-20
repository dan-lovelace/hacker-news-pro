import { TConfig, TView } from "@hnp/types";
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
    path: "/jobs",
    element: false,
    view: "jobs",
  },
  {
    path: "/newcomments",
    element: false,
    view: "item",
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
];

export const getJson: (
  config: TConfig,
  params?: Record<string, string>,
) => any = async (config, params) => {
  const {
    location: { pathname, search },
  } = window;
  const searchEntries = new URLSearchParams(search);
  const searchObj = Object.fromEntries(searchEntries);
  const url = `https://${config.hostname}${pathname}.json${
    params
      ? `?${new URLSearchParams({ ...searchObj, ...params }).toString()}`
      : ""
  }`;
  const result = await fetch(url, {
    headers: {
      "Cache-Control": "max-age=300",
    },
  });
  const json = await result.json();
  console.log("raw json", json);

  return json;
};
