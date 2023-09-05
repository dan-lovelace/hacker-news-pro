import { TForms } from "..";

/**
 * Page to submit a new story.
 * @remarks Sample page: https://news.ycombinator.com/submit
 */
export type TSubmit = {
  /** Any associated forms such as the submit form. */
  forms: Pick<TForms, "submit">;
};
