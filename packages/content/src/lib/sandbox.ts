import { browser, getCurrentTheme, MESSAGE_ACTIONS } from "@hnp/core";
import { TConfig, TSandboxContext } from "@hnp/types";

import { sendSandboxMessage, startListeners } from "./message";

const colorLogo = browser.runtime.getURL("img/reddit_logo_color_128.png");
const whiteLogo = browser.runtime.getURL("img/reddit_logo_white_128.png");

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

export function getTemplateContext<T>(
  data: T,
  config: TConfig,
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
    const { view } = config;

    switch (view) {
      case "item": {
        break;
      }

      case "list": {
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
