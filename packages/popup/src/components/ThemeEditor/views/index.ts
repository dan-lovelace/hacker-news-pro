import { TView } from "@hnp/types";

export const viewOptions: Array<{
  label: string;
  options: Array<{
    hidden?: boolean;
    label: string;
    routes: string[];
    value: TView;
  }>;
}> = [
  {
    label: "Lists",
    options: [
      {
        label: "Story",
        routes: [],
        value: "storyList",
      },
      {
        label: "Comment",
        routes: [],
        value: "commentList",
      },
      {
        label: "Job",
        routes: [],
        value: "jobList",
      },
    ],
  },
  {
    label: "Items",
    options: [
      {
        label: "Story",
        routes: [],
        value: "storyItem",
      },
      {
        label: "Comment",
        routes: [],
        value: "commentItem",
      },
      {
        label: "Job",
        routes: [],
        value: "jobItem",
      },
      {
        label: "Poll",
        routes: [],
        value: "pollItem",
      },
    ],
  },
  {
    label: "Other",
    options: [
      {
        label: "Reply",
        routes: [],
        value: "reply",
      },
      {
        label: "Submit",
        routes: [],
        value: "submit",
      },
      {
        hidden: true,
        label: "User",
        routes: [],
        value: "user",
      },
    ],
  },
];

export { default as ViewsInput } from "./ViewsInput";
export { default as ViewItem } from "./ViewItem";
