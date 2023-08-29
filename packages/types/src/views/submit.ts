import { IParsable } from "..";

export type TSubmit = {
  forms: {
    submit: {
      action: string;
      hiddenInputs: string;
      method: string;
    };
  };
};

export class Submit implements IParsable<TSubmit> {
  parse(document: Document): TSubmit {
    const submitForm = document.querySelector("form[action='/r']");
    const action = submitForm?.getAttribute("action") ?? "";
    const hiddenInputs = [
      submitForm?.querySelector("input[name='fnid']")?.outerHTML ?? "",
      submitForm?.querySelector("input[name='fnop']")?.outerHTML ?? "",
    ].join("\n");
    const method = submitForm?.getAttribute("method") ?? "";

    return {
      forms: {
        submit: {
          action,
          hiddenInputs,
          method,
        },
      },
    };
  }
}
