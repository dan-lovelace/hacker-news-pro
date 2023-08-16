import { browser, getCurrentTheme, MESSAGE_ACTIONS } from "@hnp/core";
import {
  Comments,
  Listing,
  TConfig,
  thumbnailTypes,
  TListingThumbnail,
  TSandboxContext,
} from "@hnp/types";

import { sendSandboxMessage, startListeners } from "./message";
import { DEFAULT_PAGE_LIMIT, getJson } from "./routes";

const colorLogo = browser.runtime.getURL("img/reddit_logo_color_128.png");
const whiteLogo = browser.runtime.getURL("img/reddit_logo_white_128.png");
const thumbnails = thumbnailTypes.reduce(
  (acc, val) => ({
    ...acc,
    [val]: browser.runtime.getURL(`img/thumb_${val}.png`),
  }),
  {} as Record<TListingThumbnail, string>
);

const SUBREDDITS = [
  {
    text: "Popular",
    to: "r/popular",
  },
  {
    text: "All",
    to: "r/all",
  },
  {
    text: "Random",
    to: "r/random",
  },
  {
    text: "Users",
    to: "users",
  },
  {
    text: "AskReddit",
    to: "r/askreddit",
  },
  {
    text: "WorldNews",
    to: "r/worldnews",
  },
  {
    text: "Pics",
    to: "r/pics",
  },
  {
    text: "Funny",
    to: "r/funny",
  },
  {
    text: "Movies",
    to: "r/movies",
  },
  {
    text: "Gaming",
    to: "r/gaming",
  },
  {
    text: "News",
    to: "r/news",
  },
  {
    text: "MildlyInteresting",
    to: "r/mildlyinteresting",
  },
  {
    text: "TodayILearned",
    to: "r/todayilearned",
  },
  {
    text: "NotTheOnion",
    to: "r/nottheonion",
  },
  {
    text: "Videos",
    to: "r/videos",
  },
  {
    text: "ExplainLikeImFive",
    to: "r/explainlikeimfive",
  },
  {
    text: "Aww",
    to: "r/aww",
  },
  {
    text: "Jokes",
    to: "r/jokes",
  },
  {
    text: "TIFU",
    to: "r/tifu",
  },
  {
    text: "Music",
    to: "r/music",
  },
  {
    text: "OldSchoolCool",
    to: "r/oldschoolcool",
  },
  {
    text: "IAMA",
    to: "r/iama",
  },
  {
    text: "TwoXChromosomes",
    to: "r/twoxchromosomes",
  },
  {
    text: "LifeProTips",
    to: "r/lifeprotips",
  },
  {
    text: "DataIsBeatiful",
    to: "r/dataisbeautiful",
  },
  {
    text: "ShowerThoughts",
    to: "r/showerthoughts",
  },
  {
    text: "AskScience",
    to: "r/askscience",
  },
  {
    text: "Books",
    to: "r/books",
  },
  {
    text: "Gifs",
    to: "r/gifs",
  },
];

function getThumbnailSrc(thumbnail: TListingThumbnail | string) {
  switch (thumbnail) {
    case "default":
    case "image":
    case "nsfw":
    case "self":
    case "spoiler":
      return thumbnails[thumbnail];
    default:
      return thumbnail;
  }
}

export function getTemplateContext<T>(
  data: T,
  config: TConfig
): TSandboxContext<T> {
  return {
    data,
    logo: {
      color: colorLogo,
      white: whiteLogo,
    },
    subreddits: SUBREDDITS,
    config,
  };
}

export function handleSandboxLoad({
  config,
  initialize,
}: {
  config: TConfig;
  initialize: () => void;
}) {
  return async () => {
    const count = parseInt(
      new URLSearchParams(window.location.search).get("count") ?? "0"
    );
    const { view } = config;

    switch (view) {
      case "comments": {
        const json = await getJson(config);
        const commentsData = new Comments().parse(json);
        console.log("commentsData", commentsData);

        // configure post thumbnail
        const postThumbnail = commentsData.post.data.children[0].data.thumbnail;
        commentsData.post.data.children[0].data.thumbnail =
          getThumbnailSrc(postThumbnail);

        initSandbox(config, commentsData);
        break;
      }

      case "subreddit": {
        const limit = DEFAULT_PAGE_LIMIT.toString();
        const json = await getJson(config, {
          count: count.toString(),
          limit,
        });
        const subredditData = new Listing().parse(json);
        console.log("subredditData", subredditData);

        // calculate pagination
        // NOTE: this only works so long as the user is on a page number that
        // is less than the page limit. consider optimizing by tracking page
        // number separately such as in the query string.
        const pageNumber =
          count % DEFAULT_PAGE_LIMIT === 0
            ? count / DEFAULT_PAGE_LIMIT
            : Math.floor(count / DEFAULT_PAGE_LIMIT) - 1;
        subredditData.data.limit = DEFAULT_PAGE_LIMIT;
        subredditData.data.page = pageNumber;

        // configure next and prev urls
        const nextUrlParams = {
          after: subredditData.data.after ?? "",
          count: ((pageNumber + 1) * DEFAULT_PAGE_LIMIT).toString(),
          limit,
        };
        const prevUrlParams = {
          before: subredditData.data.before ?? "",
          count: (pageNumber * DEFAULT_PAGE_LIMIT + 1).toString(),
          limit,
        };
        subredditData.data.nextUrl =
          "?" + new URLSearchParams(nextUrlParams).toString();
        subredditData.data.prevUrl =
          "?" + new URLSearchParams(prevUrlParams).toString();

        // configure thumbnails
        subredditData.data.children.forEach(({ data: { thumbnail } }, idx) => {
          subredditData.data.children[idx].data.thumbnail =
            getThumbnailSrc(thumbnail);
        });

        initSandbox(config, subredditData);
        break;
      }
    }

    initialize();
  };
}

export async function initSandbox<T>(config: TConfig, data: T) {
  startListeners(data, config);

  const context = getTemplateContext(data, config);
  const themeToApply = await getCurrentTheme(config);

  sendSandboxMessage({
    context,
    event: {
      action: MESSAGE_ACTIONS.UPDATE_THEME,
      value: themeToApply,
    },
  });
}
