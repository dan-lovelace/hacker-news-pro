import { pipe } from "@hnp/core";

import { CommentItem } from "./commentItem";
import { StoryItem } from "./storyItem";
import { StoryList } from "./storyList";
import { IParsable, Item, List, Submit, User } from "..";
import { TContentContext, TView } from "../app";

export type TViewRoute = {
  path: string;
  view: TView;
};

export const viewRouteMap: Record<string, TView> = {
  "/": "storyList",
  "/active": "storyList",
  "/ask": "storyList",
  "/asknew": "storyList",
  "/best": "storyList",
  "/bestcomments": "commentList",
  "/front": "storyList",
  "/invited": "storyList",
  "/jobs": "jobList",
  "/launches": "storyList",
  "/newcomments": "commentList",
  "/newest": "storyList",
  "/news": "storyList",
  "/noobcomments": "commentList",
  "/noobstories": "storyList",
  "/past": "storyList",
  "/pool": "storyList",
  "/show": "storyList",
  "/shownew": "storyList",
  "/submit": "submit",
  "/user": "user",
};

class PageData<T> implements IParsable<T> {
  constructor(private parser: IParsable<T & TContentContext>) {}

  parse(document: Document): T & TContentContext {
    return {
      ...this.parser.parse(document),
      currentUser: {
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
        link:
          document.querySelector(".pagetop a#me")?.getAttribute("href") ?? "",
      },
    };
  }
}

const parsers: Record<TView, IParsable<any>> = {
  commentItem: new CommentItem(),
  commentList: new List(),
  jobItem: new Item(),
  jobList: new List(),
  pollItem: new Item(),
  pollOptItem: new Item(),
  storyItem: new StoryItem(),
  storyList: new StoryList(),
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
export * from "./list";
export * from "./submit";
export * from "./user";
