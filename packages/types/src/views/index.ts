import { pipe } from "@hnp/core";

import { CommentItem } from "./commentItem";
import { CommentList } from "./commentList";
import { JobItem } from "./jobItem";
import { JobList } from "./jobList";
import { PollItem } from "./pollItem";
import { Reply } from "./reply";
import { StoryItem } from "./storyItem";
import { StoryList } from "./storyList";
import { IParsable, Submit, User } from "..";
import { TContentContext, TView } from "../app";

export const voteDirections = ["down", "up", undefined] as const;

export type TComment = {
  data: {
    age: {
      humanized?: string;
      timestamp?: string;
    };
    author: string;
    bodyHTML?: string;
    id: string;
    interactions: {
      next?: string;
      parent?: string;
      prev?: string;
      toggle?: string;
      voteDown?: string;
      voteUp?: string;
    };
    itemUrl: string;
    replyUrl: string;
  };
  depth: number;
  comments: TComment[];
};

export type TForm = {
  action?: string;
  hiddenInputs?: string;
  method?: string;
};

export type TViewRoute = {
  path: string;
  view: TView;
};

export type TVoteDirection = (typeof voteDirections)[number];

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
  "/reply": "reply",
  "/show": "storyList",
  "/shownew": "storyList",
  "/submit": "submit",
  "/user": "user",
};

class PageData<T> implements IParsable<T> {
  constructor(private parser: IParsable<T & TContentContext>) {}

  parse(document: Document): T & TContentContext {
    const loginExists = !!(
      document.querySelector(".pagetop a#me") ||
      document.querySelector(".pagetop a[href^='login']")
    );

    return {
      ...this.parser.parse(document),
      currentUser: {
        isLoggedIn: loginExists
          ? !!document.querySelector(".pagetop a#me")
          : undefined,
        karma: pipe(
          parseInt(
            document.querySelector(".pagetop #karma")?.textContent ?? "",
          ),
          (karmaInt: number) => (isNaN(karmaInt) ? undefined : karmaInt),
        ),
        loginUrl:
          document
            .querySelector(".pagetop a[href^='login']")
            ?.getAttribute("href") ?? undefined,
        logoutUrl:
          document
            .querySelector(".pagetop a[href^='logout']")
            ?.getAttribute("href") ?? undefined,
        name: document.querySelector(".pagetop a#me")?.textContent ?? undefined,
        link:
          document.querySelector(".pagetop a#me")?.getAttribute("href") ??
          undefined,
      },
    };
  }
}

const parsers: Record<TView, IParsable<any>> = {
  commentItem: new CommentItem(),
  commentList: new CommentList(),
  jobItem: new JobItem(),
  jobList: new JobList(),
  pollItem: new PollItem(),
  reply: new Reply(),
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

export * from "./submit";
export * from "./user";
