export type TConfig = {
  hostname: string;

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
  event: TMessageEvent<TTheme | undefined>;
};

export type TSandboxPartial = {
  name: string;
  template: TSandboxTemplate;
};

export type TSandboxTemplate = string;

export type TStorage = Partial<{
  [key in TStorageKey]: TStorageKeyMap[key];
}>;

export type TStorageKey = keyof TStorageKeyMap;

export type TStorageKeyMap = {
  CURRENT_THEME: TCurrentTheme;
  CUSTOM_THEMES: TTheme[];
  SELECTED_TAB: number;
  SELECTED_VIEW: TView;
};

export type TTheme = TCurrentTheme & {
  inputs: TThemeViewInputs;
  outputs?: TThemeViewInputs;
};

export type TThemeChanged = {
  style: string;
  compiled: string;
} | null;

export type TThemeType = "custom" | "premade";

export type TThemeViewInputs = Record<TView, TViewInputValue> & {
  style: string;
};

export type TView = "item" | "jobs" | "list" | "other" | "submit" | "user";

export type TViewInputValue = {
  template: string;
  partials: {
    label: string;
    name: string;
    template: string;
  }[];
};
