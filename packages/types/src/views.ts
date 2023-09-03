import { TView } from ".";

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

export const voteDirections = ["down", "up"] as const;

/** Item's age */
export type TAge = {
  humanized?: string;
  timestamp?: string;
};

/** User comment and its replies */
export type TComment = {
  data: {
    age: TAge;
    bodyHTML?: string;
    id: string;
    interactions: Pick<
      TInteractions,
      "next" | "parent" | "prev" | "toggle" | "voteDown" | "voteUp"
    >;
    links: Pick<TLinks, "item" | "reply">;
    user?: TUser;
    voted?: TVoteDirection;
  };
  depth: number;
  comments: TComment[];
};

/** Item page that displays a comment */
export type TCommentItem = TCommentListItem & {
  comments: TComment[];
  forms: Pick<TForms, "comment">;
};

/** List page that displays comment items */
export type TCommentList = {
  items: TCommentListItem[];
  links: Pick<TLinks, "more">;
};

/** Single comment item */
export type TCommentListItem = {
  age: TAge;
  bodyHTML?: string;
  id: string;
  interactions: Pick<TInteractions, "voteDown" | "voteUp">;
  links: Pick<
    TLinks,
    "context" | "favorite" | "flag" | "next" | "parent" | "story" | "unflag"
  >;
  story: {
    title: TStoryListItem["title"];
  };
  user?: TUser;
  voted?: TVoteDirection;
};

/** HTML form */
export type TForm = {
  action?: string;
  hiddenInputs?: string;
  method?: string;
};

export type TForms = {
  comment?: TForm;
  submit?: TForm;
};

/** User actions that may either redirect or perform an inline page update */
export type TInteractions = {
  hide?: string;
  next?: string;
  parent?: string;
  prev?: string;
  toggle?: string;
  voteDown?: string;
  voteUp?: string;
};

/** Item page that displays a job */
export type TJobItem = TJobListItem & {
  bodyHTML?: string;
};

/** List page that displays job items */
export type TJobList = {
  items: TJobListItem[];
  links: Pick<TLinks, "more">;
};

/** Single job item */
export type TJobListItem = {
  age: TAge;
  links: Pick<TLinks, "hide" | "from" | "item">;
  site?: TSite;
  title?: string;
};

/** Elements that only perform a redirect when clicked */
export type TLinks = {
  /** Location of comment in a tree */
  context?: string;

  /** Adds the item to the user's list of favorites */
  favorite?: string;

  /** Flags an item */
  flag?: string;

  /** List of items from the same domain */
  from?: string;

  /** Removes an item from view */
  hide?: string;

  /** Item's pathname */
  item?: string;

  /** The next page */
  more?: string;

  /** The next item in a list */
  next?: string;

  /** Comment's parent */
  parent?: string;

  /** Item's search results on hn.algolia.com */
  past?: string;

  /** Comment's reply page */
  reply?: string;

  /** Comment's story */
  story?: string;

  /** Unflags an item */
  unflag?: string;
};

/** Item page that displays a poll */
export type TPollItem = TStoryListItem & {
  comments: TComment[];
  options: TPollOptionItem[];
};

/** Single option in a poll */
export type TPollOptionItem = {
  id: string;
  interactions: Pick<TInteractions, "voteDown" | "voteUp">;
  score?: number;
  title: string;
  voted?: TVoteDirection;
};

/** Page to reply to a comment */
export type TReply = TCommentListItem & {
  forms: Pick<TForms, "comment">;
};

/** Item's linked site or article */
export type TSite = {
  name: string;
  url: string;
};

/** Item page that displays a story */
export type TStoryItem = TStoryListItem & {
  bodyHTML?: string;
  comments: TComment[];
  forms: Pick<TForms, "comment">;
};

/** List page that displays story items */
export type TStoryList = {
  items: TStoryListItem[];
  links: Pick<TLinks, "more">;
};

/** Single story item */
export type TStoryListItem = {
  age: TAge;
  commentsCount: number;
  id: string;
  interactions: Pick<TInteractions, "hide" | "voteDown" | "voteUp">;
  links: Pick<
    TLinks,
    "favorite" | "flag" | "from" | "item" | "past" | "unflag"
  >;
  score?: number;
  site?: TSite;
  title: string;
  user?: TUser;
  voted?: TVoteDirection;
};

/** Page to submit a new story */
export type TSubmit = {
  forms: Pick<TForms, "submit">;
};

/** User that submitted an item */
export type TUser = {
  id: string;
  link: string;
};

/** Currently-unsupported view */
export type TUnknown = unknown;

/** Maps a route to a particular view */
export type TViewRoute = {
  path: string;
  view: TView;
};

/** How an item may be voted upon */
export type TVoteDirection = (typeof voteDirections)[number];
