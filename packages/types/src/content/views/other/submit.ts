import { TForms } from "..";

/** Page to submit a new story. */
export type TSubmit = {
  /** Any associated forms such as the submit form. */
  forms: Pick<TForms, "submit">;
};
