import { IParsable, TJobList, TJobListItem } from "@hnp/types";

import { getJobListItem } from "../lib";

export class JobList implements IParsable<TJobList> {
  parse(document: Document): TJobList {
    const items: TJobListItem[] = [];
    const entries = document.querySelectorAll(".athing");

    entries.forEach((node) => {
      items.push(getJobListItem(node));
    });

    const links = {
      more:
        document.querySelector(".morelink")?.getAttribute("href") ?? undefined,
    };

    return { items, links };
  }
}