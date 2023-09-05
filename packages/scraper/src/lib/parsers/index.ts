import { TPageDataExtension, TView } from "@hnp/types";

import { pipe } from "..";
import { IParsable } from "../..";
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
  constructor(private parser: IParsable<T & TPageDataExtension>) {}

  parse(document: Document): T & TPageDataExtension {
    const loginExists = !!(
      document.querySelector(".pagetop a#me") ||
      document.querySelector(".pagetop a[href^='login']")
    );
    const links: TPageDataExtension["currentUser"]["links"] = {
      login:
        document
          .querySelector(".pagetop a[href^='login']")
          ?.getAttribute("href") ?? undefined,
      logout:
        document
          .querySelector(".pagetop a[href^='logout']")
          ?.getAttribute("href") ?? undefined,
      profile:
        document.querySelector(".pagetop a#me")?.getAttribute("href") ??
        undefined,
    };
    const currentUser: TPageDataExtension["currentUser"] = {
      isLoggedIn: loginExists
        ? !!document.querySelector(".pagetop a#me")
        : undefined,
      karma: pipe(
        parseInt(document.querySelector(".pagetop #karma")?.textContent ?? ""),
        (karmaInt: number) => (isNaN(karmaInt) ? undefined : karmaInt),
      ),
      links,
      id: document.querySelector(".pagetop a#me")?.textContent ?? undefined,
    };

    return {
      ...this.parser.parse(document),
      currentUser,
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
