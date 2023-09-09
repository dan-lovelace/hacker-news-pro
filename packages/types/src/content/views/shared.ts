/**
 * Types shared across the various views.
 * @group Template
 * @module shared
 */

/**
 * Map of routes and their related view.
 */
export const viewRouteMap: Record<string, TView> = {
  "/": "storyList",
  "/active": "storyList",
  "/ask": "storyList",
  "/asknew": "storyList",
  "/best": "storyList",
  "/bestcomments": "commentList",
  "/front": "storyList",
  "/invited": "storyList",
  "/jobs": "jobList",
  "/launches": "storyList",
  "/newcomments": "commentList",
  "/newest": "storyList",
  "/news": "storyList",
  "/noobcomments": "commentList",
  "/noobstories": "storyList",
  "/past": "storyList",
  "/pool": "storyList",
  "/reply": "reply",
  "/show": "storyList",
  "/shownew": "storyList",
  "/submit": "submit",
  "/user": "user",
};

/**
 * How an item may be voted upon.
 */
export const voteDirections = ["down", "up"] as const;

/** Age information for a specific item. */
export type TAge = {
  /**
   * Human-readable creation time.
   * @example "2 hours ago"
   */
  humanized?: string;

  /**
   * Timestamp in UTC format.
   * @example "2023-09-03T14:53:21Z"
   * @remarks
   * There are Handlebars helpers to display formatted timestamps:
   * - `timestampDate` - Renders the date portion of the given timestamp
   * - `timestampTime` - Renders the time portion
   * @example
   * <span>{{timestampDate age.timestamp}}</span>
   */
  timestamp?: string;
};

/** User comment and its replies. */
export type TComment = {
  /** List of replies. */
  comments: TComment[];

  /** Comment information. */
  data: {
    /** When the comment was created. */
    age: TAge;

    /**
     * HTML of the body.
     * @remarks
     * Should be used with Handlebar's triple-brace escape syntax:
     * `{{{bodyHTML}}}`.
     */
    bodyHTML?: string;

    /** Information about the comment's collapsed status. */
    collapsed: {
      /**
       * Number of collapsed items.
       * @remarks
       * When a comment is collapsed in Hacker News, the toggle element is
       * replaced to show the number of collapsed children such as `[17 more]`.
       * We capture the number of children as the `count` value only when a
       * comment is collapsed. Its count will be `undefined` when expanded.
       */
      count?: number;

      /**
       * Whether the comment is collapsed.
       * @remarks
       * A `value` of `true` indicates the comment is collapsed. When a comment
       * is collapsed, access to its voting buttons is lost which must be taken
       * into account when writing comment tree components.
       */
      value: boolean;
    };

    /**
     * The Hacker News identifier.
     * @example "2921983"
     */
    id: string;

    /** User interactions. */
    interactions: Pick<
      TInteractions,
      "next" | "parent" | "prev" | "toggle" | "voteDown" | "voteUp"
    >;

    /**
     * Links to other pages.
     * @example "item?id=37369826"
     */
    links: Pick<TLinks, "item" | "reply">;

    /** User that created the comment. */
    user?: TUser;

    /** Whether the current user has voted on the comment and how. */
    voted?: TVoteDirection;
  };

  /** Comment's depth in the tree. */
  depth: number;
};

/** Single comment item. */
export type TCommentListItem = {
  /** When the item was created. */
  age: TAge;

  /**
   * HTML of the body.
   * @remarks
   * Should be used with Handlebar's triple-brace escape syntax:
   * `{{{bodyHTML}}}`.
   */
  bodyHTML?: string;

  /**
   * The Hacker News identifier.
   * @example "2921983"
   */
  id?: string;

  /** User interactions. */
  interactions: Pick<TInteractions, "voteDown" | "voteUp">;

  /**
   * Links to other pages.
   * @example "item?id=37369826"
   */
  links: Pick<
    TLinks,
    "context" | "favorite" | "flag" | "next" | "parent" | "story" | "unflag"
  >;

  /** The associated story. */
  story: {
    /** Story's title. */
    title: TStoryListItem["title"];
  };

  /** User that created the comment. */
  user?: TUser;

  /** Whether the current user has voted on the comment and how. */
  voted?: TVoteDirection;
};

/** HTML form. */
export type TForm = {
  /**
   * The endpoint of the submit action.
   * @example "comment"
   */
  action?: string;

  /**
   * HTML of hidden inputs.
   * @remarks
   * Should be used with Handlebar's triple-brace escape syntax:
   * `{{{hiddenInputsHTML}}}`.
   */
  hiddenInputsHTML?: string;

  /**
   * The HTTP method associated with the form.
   * @example "post"
   */
  method?: string;
};

export type TForms = {
  /** Comment or reply form. */
  comment?: TForm;

  /** Submit form on the `/submit` page. */
  submit?: TForm;
};

/**
 * User actions that may either redirect or perform an inline page update.
 * These are HTML strings that must be used with a `<hnp-interaction>` web
 * component.
 * @example
 * <hnp-interaction from="{{interactions.hide}}">hide</hnp-interaction>
 */
export type TInteractions = {
  /** Hides the selected item from view. */
  hide?: string;

  /** Navigates to the next item. */
  next?: string;

  /** The item's parent, typically a comment. */
  parent?: string;

  /** Previous instances of the linked item. */
  prev?: string;

  /** Collapses the item, typically a comment. */
  toggle?: string;

  /** Downvotes an item. */
  voteDown?: string;

  /** Upvotes an item. */
  voteUp?: string;
};

/** Single job item. */
export type TJobListItem = {
  /** When the job was created. */
  age: TAge;

  /**
   * Links to other pages.
   * @example "item?id=37286598"
   */
  links: Pick<TLinks, "from" | "hide" | "item">;

  /** Information about the linked site. */
  site?: TSite;

  /** The job's title. */
  title?: string;
};

/** Elements that only perform a redirect when clicked. */
export type TLinks = {
  /** Location of comment in a tree. */
  context?: string;

  /** Adds the item to the user's list of favorites. */
  favorite?: string;

  /** Flags an item. */
  flag?: string;

  /** List of items from the same domain. */
  from?: string;

  /**
   * Removes an item from view.
   * @remarks
   * While this is named the same as `hide` on `TInteraction`, not all items
   * perform an inline hide and reload the page instead. Such examples may be
   * seen on job item pages: https://news.ycombinator.com/item?id=37320729.
   */
  hide?: string;

  /** Item's pathname. */
  item?: string;

  /** The next page. */
  more?: string;

  /** The next item in a list. */
  next?: string;

  /** Comment's parent. */
  parent?: string;

  /** Item's search results on hn.algolia.com. */
  past?: string;

  /** Comment's reply page. */
  reply?: string;

  /** Comment's story. */
  story?: string;

  /** Unflags an item. */
  unflag?: string;
};

/** Single option in a poll. */
export type TPollOptionItem = {
  /**
   * The Hacker News identifier.
   * @example "126812"
   */
  id?: string;

  /** User interactions. */
  interactions: Pick<TInteractions, "voteDown" | "voteUp">;

  /** The poll item's score. */
  score?: number;

  /** Title of the option. */
  title?: string;

  /** Whether the current user has voted on the option and how. */
  voted?: TVoteDirection;
};

/** Item's linked site or article. */
export type TSite = {
  /**
   * Short version of the linked site.
   * @example "nature.com"
   */
  name: string;

  /**
   * Full URL of the linked article.
   * @example "https://www.nature.com/articles/s41612-023-00427-x"
   */
  url: string;
};

/**
 * The inferred story type.
 * @remarks
 * There's no way to tell for sure the type of story but we can try to make an
 * estimated guess by looking at either its title or surrounding elements.
 *
 * Descriptions:
 * - `article` - Links to an article outside of HN
 * - `ask` - "Ask HN" posts
 * - `internal` - Links to an internal HN item page that does not fit any other type
 * - `job` - Job posts
 * - `launch` - "Launch HN" posts
 * - `poll` - HN polls
 * - `show` - "Show HN" posts
 * - `tell` - "Tell HN" posts
 */
export type TStoryType =
  | "article"
  | "ask"
  | "internal"
  | "job"
  | "launch"
  | "poll"
  | "show"
  | "tell";

/**
 * Single story item.
 * @remarks Sample page: https://news.ycombinator.com/item?id=37371084
 */
export type TStoryListItem = {
  /** When the story was created. */
  age: TAge;

  /** The number of comments on the story. */
  commentsCount?: number;

  /**
   * The Hacker News identifier.
   * @example "37371084"
   */
  id?: string;

  /** User interactions. */
  interactions: Pick<TInteractions, "hide" | "voteDown" | "voteUp">;

  /**
   * Links to other pages.
   * @example "item?id=37371084"
   */
  links: Pick<
    TLinks,
    "favorite" | "flag" | "from" | "item" | "past" | "unflag"
  >;

  /** The story item's score. */
  score?: number;

  /** Information about the linked site. */
  site?: TSite;

  /** The story's title. */
  title?: string;

  /** Type of story. */
  type?: TStoryType;

  /** User that created the story. */
  user?: TUser;

  /** Whether the current user has voted on the story and how. */
  voted?: TVoteDirection;
};

/** User that submitted an item. */
export type TUser = {
  /**
   * The user's Hacker News identifier.
   * @example "pg"
   */
  id?: string;

  /**
   * Link to the user's profile page.
   * @example "user?id=pg"
   */
  link?: string;
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

/** Maps a route to a particular view. */
export type TViewRoute = {
  /**
   * The pathname to the given route.
   * @example "/news"
   */
  path: string;

  /**
   * The route's associated view.
   * @example "storyList"
   */
  view: TView;
};

/**
 * How an item may be voted upon.
 * @remarks
 * If `undefined`, the user has not yet voted. If they have, will be either
 * `up` or `down`.
 */
export type TVoteDirection = (typeof voteDirections)[number];
