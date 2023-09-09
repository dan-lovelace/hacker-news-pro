import { TPageDataExtension, TStoryItem, TView } from "@hnp/types";

import { assertUserLoggedIn, scrape } from "../utils";

type PageData = TStoryItem & TPageDataExtension;

const itemId = "37408196";
const scrapeArgs: [TView, string] = [
  "storyItem",
  `https://news.ycombinator.com/item?id=${itemId}`,
];

function assertBase({
  age,
  bodyHTML,
  comments,
  commentsCount,
  forms: { comment: formsComment },
  id,
  interactions,
  links,
  score,
  site,
  title,
  type,
  user,
  voted,
}: PageData) {
  expect(age.humanized).not.toBe(undefined);
  expect(age.timestamp).not.toBe(undefined);
  expect(bodyHTML).toBe(undefined);
  expect(comments.length).toBeGreaterThan(0);
  expect(comments[0].data.collapsed.count).toBe(undefined);
  expect(comments[0].data.collapsed.value).not.toBe(undefined);
  expect(commentsCount).not.toBe(undefined);
  expect(formsComment?.action).toBe("comment");
  expect(formsComment?.hiddenInputsHTML?.length).toBeGreaterThan(0);
  expect(formsComment?.method).toBe("post");
  expect(id).not.toBe(undefined);
  expect(interactions.hide).not.toBe(undefined);
  expect(interactions.voteDown).toBe(undefined);
  expect(interactions.voteUp).not.toBe(undefined);
  expect(links.favorite).toMatch(/^fave\?id=\d*&auth=.*/);
  expect(links.from).toBe("from?site=ft.com");
  expect(links.item).not.toBe(undefined);
  expect(links.more).toBe(`item?id=${itemId}&p=2`);
  expect(links.past).not.toBe(undefined);
  expect(links.unflag).toBe(undefined);
  expect(score).not.toBe(undefined);
  expect(site?.name).not.toBe(undefined);
  expect(site?.url).not.toBe(undefined);
  expect(title).not.toBe(undefined);
  expect(type).not.toBe(undefined);
  expect(user?.id).not.toBe(undefined);
  expect(user?.link).not.toBe(undefined);
  expect(voted).toBe(undefined);

  /**
   * Flag assertion could be made better by using a test user that has flagging
   * capabilities. We would then make this conditional so it is NOT undefined
   * when logged in.
   */
  expect(links.flag).toBe(undefined);
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
