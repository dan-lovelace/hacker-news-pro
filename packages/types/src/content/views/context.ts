/**
 * The context object is the entrypoint for all data available to your
 * templates. The {@link TContext} type describes this object and all its
 * properties. See its `pageData` property for the result of scraping the
 * current page and `config` for other information such as the page's current
 * {@link Shared.TView | view}. A number of assets are made available through
 * its `assets` property.
 * @example
 * ```hbs
 * <img src="{{assets.images.hnLogo}}" />
 * <div>{{config.view}}</div>
 * {{#each pageData.items}}
 *   <div>{{this.title}}</div>
 * {{/each}}
 * ```
 *
 * @module Context
 */

import { TView } from ".";

/**
 * Assets available to templates.
 * @example
 * ```hbs
 * {{! in CSS using asset's full URL }}
 * {{#with assets.icons}}
 *   .accordion {
 *     --bs-accordion-btn-icon: url('{{expandDown}}');
 *     --bs-accordion-btn-active-icon: url('{{expandDown}}');
 *   }
 *
 *   [data-bs-theme=dark] .accordion-button:after {
 *     --bs-accordion-btn-icon: url('{{expandDown_dark}}');
 *     --bs-accordion-btn-active-icon: url('{{expandDown_dark}}');
 *   }
 * {{/with}}
 * ```
 * @example
 * ```hbs
 * {{! in HTML using baseURL }}
 * <img src="{{assets.baseURL}}/images/hn_logo.svg" />
 * ```
 */
export type TAssets = {
  /**
   * The assets directory's base URL.
   * @example
   * ```
   * chrome-extension://ihcblehlmbfeecfaiomaihjkeedjepoc/assets/img/content
   * ```
   * @see [packages/content/public/assets/img/content](https://github.com/dan-lovelace/hacker-news-pro/tree/main/packages/content/public/assets/img/content)
   */
  baseURL: string;

  /**
   * Icon URLs.
   * @remarks
   * While Material icons are available in Handlebars templates, sometimes it
   * is necessary to use icons in CSS such as when overriding a Bootstrap
   * component's iconography. We include light and dark versions of icons for
   * this purpose.
   */
  icons: {
    chevronDown: string;
    chevronDown_dark: string;
    expandDown: string;
    expandDown_dark: string;
  };

  /**
   * Image URLs.
   */
  images: {
    hnLogo: string;
    hnLogo_256: string;
  };
};

/**
 * Context configuration for the current page.
 */
export type TConfig = {
  /**
   * Current page's hostname.
   * @example ```news.ycombinator.com```
   */
  hostname: string;

  /**
   * Current page's pathname.
   * @example ```/newcomments```
   */
  pathname: string;

  /**
   * Current page's view.
   * @example ```storyList```
   */
  view: TView;
};

/**
 * The main context object supplied to all views.
 * @typeParam T - The result of parsing the current page. See the various views
 * for return types: {@link Lists}, {@link Items} and {@link Other}.
 */
export type TContext<T> = {
  /**
   * Describes information about any available assets.
   */
  assets: TAssets;

  /** Configuration for the current page. */
  config: TConfig;

  /**
   * Data associated with the current page's view.
   * @example
   * ```
   * {
   *   bodyHTML: "<p>Lorem ipsum</p>",
   *   comments: [],
   *   currentUser: { ... },
   *   id: "37390184"
   * }
   * ```
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
       * @example ```login?auth=abcd1234&goto=news```
       */
      login?: string;

      /**
       * User's path to logout.
       * @example ```logout?auth=abcd1234&goto=news```
       */
      logout?: string;

      /**
       * User's profile.
       * @example ```user?id=pg```
       */
      profile?: string;
    };

    /**
     * User's identifier.
     * @example ```pg```
     */
    id?: string;
  };
};
