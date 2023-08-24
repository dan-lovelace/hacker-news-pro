import { getNodeHTML, pipe } from "@hnp/core";

import { IParsable } from "..";

export type TUser = {
  author: string;
};

export class User implements IParsable<TUser> {
  parse(document: Document): TUser {
    return { author: "Lorem" };
  }
}
