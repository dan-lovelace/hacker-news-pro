import { TPageDataExtension, TStoryList, TView } from "@hnp/types";

import { assertUserLoggedIn, scrape } from "../utils";

type PageData = TStoryList & TPageDataExtension;

const scrapeArgs: [TView, string] = [
  "storyList",
  "https://news.ycombinator.com",
];

function assertBase({ items, links }: PageData) {
  const linksExpect: TStoryList["links"] = {
    more: "?p=2",
  };

  expect(items.length).toBe(30);
  expect(links).toMatchObject(linksExpect);

  const firstItem = items[0];
  expect(firstItem.age.humanized).not.toBe(undefined);
  expect(firstItem.age.timestamp).not.toBe(undefined);
  expect(firstItem.commentsCount).not.toBe(undefined);
  expect(firstItem.id).not.toBe(undefined);
  expect(firstItem.interactions.hide).not.toBe(undefined);
  expect(firstItem.interactions.voteDown).toBe(undefined);
  expect(firstItem.interactions.voteUp).not.toBe(undefined);
  expect(firstItem.links.favorite).toBe(undefined);
  expect(firstItem.links.from).not.toBe(undefined);
  expect(firstItem.links.item).not.toBe(undefined);
  expect(firstItem.links.past).toBe(undefined);
  expect(firstItem.links.unflag).toBe(undefined);
  expect(firstItem.score).not.toBe(undefined);
  expect(firstItem.site?.name).not.toBe(undefined);
  expect(firstItem.site?.url).not.toBe(undefined);
  expect(firstItem.title).not.toBe(undefined);
  expect(firstItem.type).not.toBe(undefined);
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
      login: "login?goto=news",
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
