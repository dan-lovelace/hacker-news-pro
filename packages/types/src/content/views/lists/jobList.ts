import { TAge, TLinks, TSite } from "..";

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

/** Single job item. */
export type TJobListItem = {
  /** When the job was created. */
  age: TAge;

  /**
   * Links to other pages.
   * @example "item?id=37286598"
   */
  links: Pick<TLinks, "hide" | "from" | "item">;

  /** Information about the linked site. */
  site?: TSite;

  /** The job's title. */
  title?: string;
};
