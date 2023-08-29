import { IParsable, TForm } from "..";
import { SELECTORS, getForm } from "../parsing";

export type TSubmit = {
  forms: {
    submit: TForm;
  };
};

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
