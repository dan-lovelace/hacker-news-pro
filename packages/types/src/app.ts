import { TContext } from ".";
import { TView } from "./content/views";

export type TComponent = {
  id: string;
  label: string;
  template: string;
};

export type TDebugLabel = "context";

export type TMessageAction = "update-theme";

export type TMessageEvent<T> = {
  action: TMessageAction;
  options?: TOptions;
  value: T;
};

export type TOptions = {
  developerMode: boolean;
  themesEnabled: boolean;
};

export type TSandboxMessageEvent = {
  partials: TSandboxPartial[];
  template: TSandboxTemplate;
};

export type TSandboxMessage<T> = {
  context: TContext<T>;
  event: TMessageEvent<TTheme>;
};

export type TSandboxPartial = {
  name: string;
  template: TSandboxTemplate;
};

export type TSandboxTemplate = string;

export type TSelectedComponentID = TComponent["id"] | null;

/**
 * User theme inputs that are not yet applied. This is what we use to keep
 * track of unsaved changes in the popup window.
 */
export type TSelectedThemeInputs = Partial<TTheme["inputs"]>;

export type TStorage = Partial<{
  [key in TStorageKey]: TStorageKeyMap[key];
}>;

export type TStorageKey = keyof TStorageKeyMap;

export type TStorageKeyMap = {
  /**
   * The user's list of custom themes.
   */
  CUSTOM_THEMES: TTheme[];

  /**
   * Store the type of navigation performed so we can restore the user's scroll
   * position for certain types. The browser's Back and Forward buttons restore
   * position but refreshing does not.
   */
  NAVIGATION_TYPE: NavigationTimingType;

  /**
   * Various options configurable inside the popup window.
   */
  OPTIONS: TOptions;

  /**
   * Keep track of the user's scroll position so we can retain their Y scroll
   * position when navigating backward and forward via the browser's navigation
   * buttons.
   */
  SCROLL_POSITIONS: Record<string, { expires: number; position: number }>;

  /**
   * Store the user's selected component so we can take them back to it when
   * they refocus the Components tab.
   */
  SELECTED_COMPONENT_ID: TSelectedComponentID;

  /**
   * Store the user's selected page so we can take them back to it when they
   * return to the popup window.
   */
  SELECTED_PAGE: string;

  /**
   * Store the user's selected tab so we can take them back to it when they
   * return to the theme editor.
   */
  SELECTED_TAB: number;

  /**
   * Track the selected theme ID separately from its inputs because we listen
   * for storage changes to it so we know when to re-render. We don't want to
   * trigger a re-render when just the inputs change.
   */
  SELECTED_THEME_ID: TTheme["id"];

  /**
   * The selected theme's inputs change when the user modifies a template in
   * the code editor. We track it individually alongside the inputs in the
   * stored `CUSTOM_THEMES` to support unsaved changes. Without this, it would
   * be easy for the user to lose work by navigating away from an input before
   * saving, whether it be inadvertently or intentionally.
   */
  SELECTED_THEME_INPUTS: TSelectedThemeInputs;

  /**
   * Store the user's selected view so we can take them back to it when they
   * refocus the Views tab.
   */
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

export type TViewInputValue = {
  template?: string;
};
