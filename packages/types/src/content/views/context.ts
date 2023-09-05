/** @module views/context */

import { TView } from ".";

/**
 * Context configuration for the current page.
 */
export type TConfig = {
  /**
   * Current page's hostname.
   * @example "news.ycombinator.com"
   */
  hostname: string;

  /**
   * Current page's pathname.
   * @example "/newcomments"
   */
  pathname: string;

  /**
   * Current page's view.
   * @example "storyList"
   */
  view: TView;
};

/**
 * The main context object supplied to all views.
 */
export type TContext<T> = {
  /**
   * Describes information about any available assets.
   */
  assets: {
    /**
     * The assets directory's base URL.
     * @example "chrome-extension://ihcblehlmbfeecfaiomaihjkeedjepoc/assets/img/content"
     */
    baseURL: string;
  };

  /** Configuration for the current page. */
  config: TConfig;

  /**
   * Data associated with the current page's view.
   * @example
   * {
   *   bodyHTML: "<p>Lorem ipsum</p>",
   *   comments: [],
   *   currentUser: { ... },
   *   id: "37390184"
   * }
   */
  pageData: T & TPageDataExtension;
};

/**
 * Additional properties that are not specific to any one view.
 */
export type TPageDataExtension = {
  /** Information about the current user. */
  currentUser: {
    /** Whether the user is logged in. */
    isLoggedIn?: boolean;

    /** Karma amount. */
    karma?: number;

    /** Links to other pages. */
    links: {
      /**
       * User's path to login.
       * @example "login?auth=abcd1234&goto=news"
       */
      login?: string;

      /**
       * User's path to logout.
       * @example "logout?auth=abcd1234&goto=news"
       */
      logout?: string;

      /**
       * User's profile.
       * @example "user?id=pg"
       */
      profile?: string;
    };

    /**
     * User's identifier.
     * @example "pg"
     */
    id?: string;
  };
};
