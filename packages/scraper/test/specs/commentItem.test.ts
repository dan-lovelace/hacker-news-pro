import { TCommentItem, TPageDataExtension, TView } from "@hnp/types";

import { assertUserLoggedIn, scrape } from "../utils";

type PageData = TCommentItem & TPageDataExtension;

const itemId = "37416203";
const scrapeArgs: [TView, string] = [
  "commentItem",
  `https://news.ycombinator.com/item?id=${itemId}`,
];

function assertBase({
  age,
  bodyHTML,
  comments,
  forms: { comment: formsComment },
  id,
  interactions,
  links,
  user,
  voted,
}: PageData) {
  expect(age.humanized).not.toBe(undefined);
  expect(age.timestamp).not.toBe(undefined);
  expect(bodyHTML).not.toBe(undefined);
  expect(comments.length).toBeGreaterThan(0);
  expect(formsComment?.action).toBe("comment");
  expect(formsComment?.hiddenInputsHTML?.length).toBeGreaterThan(0);
  expect(formsComment?.method).toBe("post");
  expect(id).not.toBe(undefined);
  expect(interactions.voteDown).toBe(undefined);
  expect(interactions.voteUp).not.toBe(undefined);
  expect(links.favorite).toMatch(/^fave\?id=\d*&auth=.*/);
  expect(links.more).toBe(undefined);
  expect(links.unflag).toBe(undefined);
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
  expect(pageData.links.flag).toBe(undefined);
});

test("accurately parses data when logged in", async () => {
  const pageData = await scrape<PageData>(...scrapeArgs, {
    withCookie: true,
  });
  const { currentUser } = pageData;

  assertBase(pageData);
  assertUserLoggedIn(currentUser);
  expect(pageData.links.flag).not.toBe(undefined);
});
