export type TComponent = {
  id: string;
  label: string;
  template: string;
};

export type TConfig = {
  hostname: string;
  view: TView;
};

export type TContentContext = {
  user: {
    isLoggedIn: boolean;
    karma: number;
    loginUrl: string;
    logoutUrl: string;
    name: string;
    userUrl: string;
  };
};

export type TMessageAction = "update-theme";

export type TMessageEvent<T> = {
  action: TMessageAction;
  value: T;
};

export type TSandboxContext<T> = {
  assets: {
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
  SELECTED_COMPONENT_ID: TSelectedComponent;
  SELECTED_TAB: number;
  SELECTED_THEME_ID: TSelectedTheme;
  SELECTED_VIEW: TView;
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
  style: string;
  compiled: string;
} | null;

export type TThemeOptions = {
  disableHNStyle: boolean;
};

export type TThemeType = "custom" | "premade";

export type TThemeViewInputs = Record<TView, TViewInputValue> & {
  components: TComponent[];
  style: string;
};

export type TView = "item" | "jobs" | "list" | "submit" | "user";

export type TViewInputValue = {
  template: string;
};
