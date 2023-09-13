import { TView } from "@hnp/types";

export const viewOptions: Array<{
  label: string;
  options: Array<{
    hidden?: boolean;
    label: string;
    value: TView;
  }>;
}> = [
  {
    label: "Lists",
    options: [
      {
        label: "Story",
        value: "storyList",
      },
      {
        label: "Comment",
        value: "commentList",
      },
      {
        label: "Job",
        value: "jobList",
      },
    ],
  },
  {
    label: "Items",
    options: [
      {
        label: "Story",
        value: "storyItem",
      },
      {
        label: "Comment",
        value: "commentItem",
      },
      {
        label: "Job",
        value: "jobItem",
      },
      {
        label: "Poll",
        value: "pollItem",
      },
    ],
  },
  {
    label: "Other",
    options: [
      {
        label: "Reply",
        value: "reply",
      },
      {
        label: "Submit",
        value: "submit",
      },
      {
        hidden: true,
        label: "User",
        value: "user",
      },
    ],
  },
];

export { default as ViewsInput } from "./ViewsInput";
export { default as ViewItem } from "./ViewItem";
