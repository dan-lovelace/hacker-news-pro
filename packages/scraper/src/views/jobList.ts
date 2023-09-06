import { TJobList, TJobListItem } from "@hnp/types";

import { IParsable } from "..";
import { getJobListItem, getMoreLink } from "../lib";

export class JobList implements IParsable<TJobList> {
  parse(document: Document): TJobList {
    const items: TJobListItem[] = [];
    const entries = document.querySelectorAll(".athing");

    entries.forEach((node) => {
      items.push(getJobListItem(node));
    });

    const links: TJobList["links"] = {
      more: getMoreLink(document),
    };

    return { items, links };
  }
}
