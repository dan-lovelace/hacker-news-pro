import { IParsable, TSubmit } from "@hnp/types";

import { getForm, SELECTORS } from "../lib";

export class Submit implements IParsable<TSubmit> {
  parse(document: Document): TSubmit {
    const submitForm = getForm(SELECTORS.forms.submission(document));

    return {
      forms: {
        submit: submitForm,
      },
    };
  }
}
