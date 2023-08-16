/**
 * App configuration
 */
export type TConfig = {
  /**
   * @example news.ycombinator.com
   */
  hostname: string;

  /**
   * @example legacy
   */
  mode: TMode;

  /**
   * @example subreddit
   */
  view: TView;
};

export type TCurrentTheme = {
  id: string;
  label: string;
  type: TThemeType;
};

export type TMessageAction = "update-theme";

export type TMessageEvent<T> = {
  action: TMessageAction;
  value: T;
};

export type TMode = "legacy" | "redesign";

export type TSandboxContext<T> = {
  config: TConfig;
  data: T;
  logo: {
    color: string;
    white: string;
  };
  nextUrl?: string;
  prevUrl?: string;
  subreddits: {
    text: string;
    to: string;
  }[];
};

export type TSandboxMessageEvent = {
  partials: TSandboxPartial[];
  template: TSandboxTemplate;
};

export type TSandboxMessage<T> = {
  context: TSandboxContext<T>;
  event: TMessageEvent<TTheme | null>;
};

export type TSandboxPartial = {
  name: string;
  template: TSandboxTemplate;
};

export type TSandboxTemplate = string;

export type TStorageItem = {
  value: string;
  view: TView;
};

export type TTheme = TCurrentTheme & {
  inputs: {
    comments: TViewInputValue;
    style: string;
    subreddit: TViewInputValue;
  };
  outputs?: {
    comments: TViewInputValue;
    style: string;
    subreddit: TViewInputValue;
  };
};

export type TThemeChanged = {
  style: string;
  compiled: string;
} | null;

export type TThemeType = "custom" | "premade";

export type TView = "comments" | "subreddit";

export type TViewInputValue = {
  template: string;
  partials: {
    label: string;
    name: string;
    template: string;
  }[];
};
