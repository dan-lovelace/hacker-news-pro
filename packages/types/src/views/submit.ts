import { getNodeHTML, pipe } from "@hnp/core";

import { IParsable } from "..";

export type TSubmit = {
  author: string;
};

export class Submit implements IParsable<TSubmit> {
  parse(document: Document): TSubmit {
    return { author: "Lorem" };
  }
}
