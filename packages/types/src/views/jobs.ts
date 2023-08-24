import { getNodeHTML, pipe } from "@hnp/core";

import { IParsable } from "..";

export type TJobs = {
  author: string;
};

export class Jobs implements IParsable<TJobs> {
  parse(document: Document): TJobs {
    return { author: "Lorem" };
  }
}
