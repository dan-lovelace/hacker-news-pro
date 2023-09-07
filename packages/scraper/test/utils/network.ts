import { TView } from "@hnp/types";
import axios from "axios";
import { JSDOM } from "jsdom";

import { getPageData } from "../..";

type ScrapeOptions = {
  withCookie: boolean;
};

export async function scrape<T>(
  view: TView,
  url: string,
  options: ScrapeOptions = { withCookie: false },
) {
  const { data } = await axios(url, {
    headers: {
      Cookie: options.withCookie ? process.env.COOKIE : undefined,
    },
  });
  const dom = new JSDOM(data);

  global.document = dom.window.document;

  return getPageData(view) as T;
}
