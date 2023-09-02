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

export const voteDirections = ["down", "up", undefined] as const;

export type TAge = {
  humanized?: string;
  timestamp?: string;
};

export type TComment = {
  data: {
    age: TAge;
    bodyHTML?: string;
    id: string;
    interactions: {
      next?: string;
      parent?: string;
      prev?: string;
      toggle?: string;
      voteDown?: string;
      voteUp?: string;
    };
    itemUrl: string;
    replyUrl: string;
    user?: TUser;
    voted: TVoteDirection;
  };
  depth: number;
  comments: TComment[];
};

export type TCommentItem = TCommentListItem & {
  comments: TComment[];
};

export type TCommentList = {
  items: TCommentListItem[];
  links: {
    /** Link to the next page */
    more?: string;
  };
};

export type TCommentListItem = {
  age: TAge;
  bodyHTML?: string;
  id: string;
  interactions: TInteractions;
  links: {
    context?: string;
    favorite?: string;
    flag?: string;
    next?: string;
    parent?: string;
    story?: string;
    unflag?: string;
  };
  story: {
    title: string;
  };
  user?: TUser;
  voted?: TVoteDirection;
};

export type TForm = {
  action?: string;
  hiddenInputs?: string;
  method?: string;
};

export type TInteractions = {
  voteDown?: string;
  voteUp?: string;
};

export type TJobItem = TJobListItem & {
  bodyHTML?: string;
};

export type TJobList = {
  items: TJobListItem[];
  links: {
    /** Link to the next page */
    more?: string;
  };
};

export type TJobListItem = {
  age: TAge;
  links: {
    hide?: string;
    from?: string;
    item?: string;
  };
  site?: {
    name: string;
    url: string;
  };
  title?: string;
};

export type TPollItem = TStoryListItem & {
  comments: TComment[];
  options: TPollOptionItem[];
};

export type TPollOptionItem = {
  id: string;
  interactions: TInteractions;
  score?: number;
  title: string;
  voted: TVoteDirection;
};

export type TReply = TCommentListItem & {
  forms: {
    comment: TForm;
  };
};

export type TStoryItem = TStoryListItem & {
  bodyHTML?: string;
  comments: TComment[];
  forms: {
    comment: TForm;
  };
};

export type TStoryList = {
  items: TStoryListItem[];
  links: {
    /** Link to the next page */
    more?: string;
  };
};

export type TStoryListItem = {
  age: TAge;
  commentsCount: number;
  id: string;
  interactions: {
    hide?: string;
    voteDown?: string;
    voteUp?: string;
  };
  links: {
    favorite?: string;
    flag?: string;
    from?: string;
    item?: string;
    past?: string;
    unflag?: string;
  };
  score?: number;
  site?: {
    name: string;
    url: string;
  };
  title: string;
  user?: TUser;
  voted: TVoteDirection;
};

export type TSubmit = {
  forms: {
    submit: TForm;
  };
};

export type TUser = {
  id: string;
  link: string;
};

export type TUnknown = unknown;

export type TViewRoute = {
  path: string;
  view: TView;
};

export type TVoteDirection = (typeof voteDirections)[number];
