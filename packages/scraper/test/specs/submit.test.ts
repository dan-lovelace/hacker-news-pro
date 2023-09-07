import { TPageDataExtension, TSubmit, TView } from "@hnp/types";

import { scrape } from "../utils";

type PageData = TSubmit & TPageDataExtension;

const scrapeArgs: [TView, string] = [
  "submit",
  "https://news.ycombinator.com/submit",
];

function assertBase({ currentUser }: PageData) {
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
}

test("accurately parses data when logged out", async () => {
  const pageData = await scrape<PageData>(...scrapeArgs);
  const {
    forms: { submit: formsSubmit },
  } = pageData;

  assertBase(pageData);
  expect(formsSubmit?.action).toBe(undefined);
  expect(formsSubmit?.hiddenInputsHTML?.length).toBeGreaterThan(0);
  expect(formsSubmit?.method).toBe(undefined);
});

test("accurately parses data when logged in", async () => {
  const pageData = await scrape<PageData>(...scrapeArgs, {
    withCookie: true,
  });
  const {
    forms: { submit: formsSubmit },
  } = pageData;

  assertBase(pageData);
  expect(formsSubmit?.action).toBe("/r");
  expect(formsSubmit?.hiddenInputsHTML?.length).toBeGreaterThan(0);
  expect(formsSubmit?.method).toBe("post");
});
