import { TUnknown } from "@hnp/types";

import { IParsable } from "..";

/**
 * View used for routes that do not yet have a parser configured. It is used as
 * the equivalent of a 404 page.
 */
export class Unknown implements IParsable<TUnknown> {
  parse(): TUnknown {
    return undefined;
  }
}
