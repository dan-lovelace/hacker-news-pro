import { pipe } from "@hnp/core";
import { IParsable, TContentContext, TView } from "@hnp/types";

import {
  CommentItem,
  CommentList,
  JobItem,
  JobList,
  PollItem,
  Reply,
  StoryItem,
  StoryList,
  Submit,
  Unknown,
} from "../../views";

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
  unknown: new Unknown(),
  user: new Unknown(),
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

export * from "./views";
