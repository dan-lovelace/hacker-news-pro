import { TJobListItem, TLinks } from "..";

/**
 * List page that displays job items.
 * @remarks Sample page: https://news.ycombinator.com/jobs
 */
export type TJobList = {
  /** List of job items. */
  items: TJobListItem[];

  /**
   * Links to other pages.
   * @example "jobs?next=37196872"
   */
  links: Pick<TLinks, "more">;
};
