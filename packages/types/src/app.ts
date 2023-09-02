export type TComponent = {
  id: string;
  label: string;
  template: string;
};

export type TConfig = {
  hostname: string;
  pathname: string;
  view: TView;
};

export type TContentContext = {
  currentUser: {
    isLoggedIn?: boolean;
    karma?: number;
    loginUrl?: string;
    logoutUrl?: string;
    name?: string;
    link?: string;
  };
};

export type TMessageAction = "update-theme";

export type TMessageEvent<T> = {
  action: TMessageAction;
  options?: TPopupOptions;
  value: T;
};

export type TPopupOptions = {
  themesEnabled: boolean;
};

export type TSandboxContext<T> = {
  assets: {
    baseUrl: string;
    originalLogoUrl: string;
  };
  config: TConfig;
  pageData: T;
};

export type TSandboxMessageEvent = {
  partials: TSandboxPartial[];
  template: TSandboxTemplate;
};

export type TSandboxMessage<T> = {
  context: TSandboxContext<T>;
  event: TMessageEvent<TTheme>;
};

export type TSandboxPartial = {
  name: string;
  template: TSandboxTemplate;
};

export type TSandboxTemplate = string;

export type TSelectedComponent = TComponent["id"] | null;

export type TSelectedTheme = TTheme["id"] | null;

export type TStorage = Partial<{
  [key in TStorageKey]: TStorageKeyMap[key];
}>;

export type TStorageKey = keyof TStorageKeyMap;

export type TStorageKeyMap = {
  CURRENT_PAGE: string;
  CUSTOM_THEMES: TTheme[];
  NAVIGATION_TYPE: NavigationTimingType;
  OPTIONS: TPopupOptions;
  SCROLL_POSITIONS: Record<string, number>;
  SELECTED_COMPONENT_ID: TSelectedComponent;
  SELECTED_TAB: number;
  SELECTED_THEME_ID: TSelectedTheme;
  SELECTED_VIEW: TView;
};

export type TStyle = {
  options: {
    darkMode: boolean;
  };
  template: string;
};

export type TTheme = {
  id: string;
  inputs: TThemeViewInputs;
  label: string;
  options: TThemeOptions;
  type: TThemeType;
  version: "1.0.0";
};

export type TThemeChanged = {
  style: TStyle;
  compiled: string;
};

export type TThemeOptions = {
  disableHNStyle: boolean;
};

export type TThemeType = "custom" | "premade";

export type TThemeViewInputs = {
  components: TComponent[];
  style: TStyle;
  views: Partial<Record<TView, TViewInputValue>>;
};

export type TView =
  | "commentItem"
  | "commentList"
  | "jobItem"
  | "jobList"
  | "pollItem"
  | "reply"
  | "storyItem"
  | "storyList"
  | "submit"
  | "unknown"
  | "user";

export type TViewInputValue = {
  template?: string;
};
