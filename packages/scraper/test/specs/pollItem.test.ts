import { TPageDataExtension, TPollItem, TView } from "@hnp/types";

import { assertUserLoggedIn, scrape } from "../utils";

type PageData = TPollItem & TPageDataExtension;

const itemId = "126809";
const scrapeArgs: [TView, string] = [
  "pollItem",
  `https://news.ycombinator.com/item?id=${itemId}`,
];

function assertBase({
  age,
  comments,
  commentsCount,
  id,
  interactions,
  links,
  options,
  score,
  site,
  title,
  type,
  user,
  voted,
}: PageData) {
  expect(age.humanized).not.toBe(undefined);
  expect(age.timestamp).not.toBe(undefined);
  expect(comments.length).toBeGreaterThan(0);
  expect(commentsCount).not.toBe(undefined);
  expect(id).not.toBe(undefined);
  expect(interactions.hide).not.toBe(undefined);
  expect(interactions.voteDown).toBe(undefined);
  expect(interactions.voteUp).not.toBe(undefined);
  expect(links.favorite).toMatch(/^fave\?id=\d*&auth=.*/);
  expect(links.flag).toBe(undefined);
  expect(links.from).toBe(undefined);
  expect(links.item).not.toBe(undefined);
  expect(links.more).toBe(undefined);
  expect(links.past).not.toBe(undefined);
  expect(links.unflag).toBe(undefined);
  expect(options.length).toBe(3);
  expect(score).not.toBe(undefined);
  expect(site).toBe(undefined);
  expect(title).not.toBe(undefined);
  expect(type).toBe("poll");
  expect(user?.id).not.toBe(undefined);
  expect(user?.link).not.toBe(undefined);
  expect(voted).toBe(undefined);
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
