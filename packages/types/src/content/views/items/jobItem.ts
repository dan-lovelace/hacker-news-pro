import { TJobListItem } from "..";

/**
 * Item page that displays a job.
 * @remarks Sample page: https://news.ycombinator.com/item?id=37320729
 */
export type TJobItem = TJobListItem & {
  /**
   * HTML of the body.
   * @remarks
   * Should be used with Handlebar's triple-brace escape syntax:
   * `{{{bodyHTML}}}`.
   */
  bodyHTML?: string;
};
