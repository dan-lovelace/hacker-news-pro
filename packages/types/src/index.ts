import { pipe } from "@hnp/core";

import { TContentContext, TView } from "./app";
import { Item, Jobs, List, Submit, User } from "./views";

export interface IParsable<T> {
  parse(document: Document): T;
}

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

export * from "./app";
export * from "./views";
