import { TJobList, TPageDataExtension, TView } from "@hnp/types";

import { assertUserLoggedIn, scrape } from "../utils";

type PageData = TJobList & TPageDataExtension;

const scrapeArgs: [TView, string] = [
  "jobList",
  "https://news.ycombinator.com/jobs",
];

function assertBase({ items, links }: PageData) {
  expect(items.length).toBe(30);
  expect(links.more).toMatch(/^jobs\?next=\d*/);

  const firstItem = items[0];
  expect(firstItem.age.humanized).not.toBe(undefined);
  expect(firstItem.age.timestamp).not.toBe(undefined);
  expect(firstItem.links.hide).toBe(undefined);
  expect(firstItem.links.from).not.toBe(undefined);
  expect(firstItem.links.item).not.toBe(undefined);
  expect(firstItem.site?.name).not.toBe(undefined);
  expect(firstItem.site?.url).not.toBe(undefined);
  expect(firstItem.title).not.toBe(undefined);
}

test("accurately parses data when logged out", async () => {
  const pageData = await scrape<PageData>(...scrapeArgs);
  const { currentUser } = pageData;

  assertBase(pageData);
  const userExpect: TPageDataExtension["currentUser"] = {
    id: undefined,
    isLoggedIn: false,
    karma: undefined,
    links: {
      login: "login?goto=jobs",
      logout: undefined,
      profile: undefined,
    },
  };
  expect(currentUser).toMatchObject(userExpect);
});

test("accurately parses data when logged in", async () => {
  const pageData = await scrape<PageData>(...scrapeArgs, {
    withCookie: true,
  });
  const { currentUser } = pageData;

  assertBase(pageData);
  assertUserLoggedIn(currentUser);
});
