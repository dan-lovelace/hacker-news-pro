import { TCommentList, TPageDataExtension, TView } from "@hnp/types";

import { assertUserLoggedIn, scrape } from "../utils";

type PageData = TCommentList & TPageDataExtension;

const scrapeArgs: [TView, string] = [
  "commentList",
  "https://news.ycombinator.com/newcomments",
];

function assertBase({ items, links }: PageData) {
  expect(items.length).toBe(30);
  expect(links.more).toMatch(/^newcomments\?next=\d*/);

  const firstItem = items[0];
  expect(firstItem.age.humanized).not.toBe(undefined);
  expect(firstItem.age.timestamp).not.toBe(undefined);
  expect(firstItem.bodyHTML).not.toBe(undefined);
  expect(firstItem.id).not.toBe(undefined);
  expect(firstItem.interactions.voteDown).toBe(undefined);
  expect(firstItem.interactions.voteUp).not.toBe(undefined);
  expect(firstItem.links.context).not.toBe(undefined);
  expect(firstItem.links.favorite).toBe(undefined);
  expect(firstItem.links.next).not.toBe(undefined);
  expect(firstItem.links.parent).not.toBe(undefined);
  expect(firstItem.links.story).not.toBe(undefined);
  expect(firstItem.links.unflag).toBe(undefined);
  expect(firstItem.story.title).not.toBe(undefined);
  expect(firstItem.user?.id).not.toBe(undefined);
  expect(firstItem.user?.link).not.toBe(undefined);
  expect(firstItem.voted).toBe(undefined);
}

test("accurately parses data when logged out", async () => {
  const pageData = await scrape<PageData>(...scrapeArgs);
  const { currentUser, items } = pageData;

  assertBase(pageData);
  const userExpect: TPageDataExtension["currentUser"] = {
    id: undefined,
    isLoggedIn: false,
    karma: undefined,
    links: {
      login: "login?goto=newcomments",
      logout: undefined,
      profile: undefined,
    },
  };
  expect(currentUser).toMatchObject(userExpect);
  expect(items[0].links.flag).toBe(undefined);
});

test("accurately parses data when logged in", async () => {
  const pageData = await scrape<PageData>(...scrapeArgs, {
    withCookie: true,
  });
  const { currentUser, items } = pageData;

  assertBase(pageData);
  assertUserLoggedIn(currentUser);
  expect(items[0].links.flag).not.toBe(undefined);
});
