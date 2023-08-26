import { pipe } from "@hnp/core";

import { IParsable, Item, Jobs, List, Submit, User } from "..";
import { TContentContext, TView } from "../app";

export type TViewRoute = {
  path: string;
  view: TView;
};

export const viewRouteMap: Record<string, TView> = {
  "/": "list",
  "/ask": "list",
  "/item": "item",
  "/front": "list",
  "/jobs": "jobs",
  "/newcomments": "list",
  "/newest": "list",
  "/news": "list",
  "/show": "list",
  "/submit": "submit",
  "/user": "user",
};

class PageData<T> implements IParsable<T> {
  constructor(private parser: IParsable<T & TContentContext>) {}

  parse(document: Document): T & TContentContext {
    return {
      ...this.parser.parse(document),
      user: {
        isLoggedIn: !!document.querySelector(".pagetop a#me"),
        karma: pipe(
          document.querySelector(".pagetop #karma")?.textContent,
          (text) => parseInt(text),
        ),
        loginUrl:
          document
            .querySelector(".pagetop a[href^='login']")
            ?.getAttribute("href") ?? "",
        logoutUrl:
          document
            .querySelector(".pagetop a[href^='logout']")
            ?.getAttribute("href") ?? "",
        name: document.querySelector(".pagetop a#me")?.textContent ?? "",
        userUrl:
          document.querySelector(".pagetop a#me")?.getAttribute("href") ?? "",
      },
    };
  }
}

const parsers: Record<TView, IParsable<any>> = {
  item: new Item(),
  jobs: new Jobs(),
  list: new List(),
  submit: new Submit(),
  user: new User(),
};

function createPageData<T extends TView>(
  view: T,
): PageData<ReturnType<IParsable<any>["parse"]>> {
  const parser = parsers[view];

  if (!parser) {
    throw new Error(`Unsupported view: ${view}`);
  }

  return new PageData(parser);
}

export function getPageData<T extends TView>(view: T) {
  const pageDataInstance = createPageData(view);
  return pageDataInstance.parse(document);
}

export * from "./item";
export * from "./jobs";
export * from "./list";
export * from "./submit";
export * from "./user";
