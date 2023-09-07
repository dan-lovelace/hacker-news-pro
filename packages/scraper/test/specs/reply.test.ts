import { TPageDataExtension, TReply, TView } from "@hnp/types";

import { scrape } from "../utils";

type PageData = TReply & TPageDataExtension;

const scrapeArgs: [TView, string] = [
  "reply",
  "https://news.ycombinator.com/reply?id=37424016&goto=item%3Fid%3D37420831%2337424016",
];

function assertBase({
  age,
  bodyHTML,
  id,
  interactions,
  forms: { comment: formsComment },
  links,
  story,
  user,
  voted,
}: PageData) {
  expect(age.humanized).not.toBe(undefined);
  expect(age.timestamp).not.toBe(undefined);
  expect(bodyHTML?.length).toBeGreaterThan(0);
  expect(formsComment?.action).toBe("comment");
  expect(formsComment?.hiddenInputsHTML?.length).toBeGreaterThan(0);
  expect(formsComment?.method).toBe("post");
  expect(id).not.toBe(undefined);
  expect(interactions.voteDown).toBe(undefined);
  expect(interactions.voteUp).not.toBe(undefined);
  expect(links.context).not.toBe(undefined);
  expect(links.favorite).toBe(undefined);
  expect(links.next).toBe(undefined);
  expect(links.parent).not.toBe(undefined);
  expect(links.story).not.toBe(undefined);
  expect(links.unflag).toBe(undefined);
  expect(story.title).not.toBe(undefined);
  expect(user?.id).not.toBe(undefined);
  expect(user?.link).not.toBe(undefined);
  expect(voted).toBe(undefined);
}

test("throws an error when logged out", async () => {
  await expect(scrape<PageData>(...scrapeArgs)).rejects.toThrow(
    "Error getting comment list item",
  );
});

test("accurately parses data when logged in", async () => {
  const pageData = await scrape<PageData>(...scrapeArgs, {
    withCookie: true,
  });
  const { currentUser } = pageData;

  assertBase(pageData);
  const userExpect: TPageDataExtension["currentUser"] = {
    id: undefined,
    isLoggedIn: undefined,
    karma: undefined,
    links: {
      login: undefined,
      logout: undefined,
      profile: undefined,
    },
  };
  expect(currentUser).toMatchObject(userExpect);
});
