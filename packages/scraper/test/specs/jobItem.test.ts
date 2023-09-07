import { TJobItem, TPageDataExtension, TView } from "@hnp/types";

import { assertUserLoggedIn, scrape } from "../utils";

type PageData = TJobItem & TPageDataExtension;

const itemId = "37320729";
const scrapeArgs: [TView, string] = [
  "jobItem",
  `https://news.ycombinator.com/item?id=${itemId}`,
];

function assertBase({ age, bodyHTML, links, site }: PageData) {
  expect(age.humanized).not.toBe(undefined);
  expect(age.timestamp).not.toBe(undefined);
  expect(bodyHTML).not.toBe(undefined);
  expect(links.from).toBe(undefined);
  expect(links.hide).not.toBe(undefined);
  expect(links.item).not.toBe(undefined);
  expect(site).toBe(undefined);
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
      login: `login?goto=item%3Fid%3D${itemId}`,
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
