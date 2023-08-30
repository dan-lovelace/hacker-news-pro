import { IParsable, TJobItem } from "@hnp/types";

import { getBodyHTML, getJobListItem } from "../lib";

export class JobItem implements IParsable<TJobItem> {
  parse(document: Document): TJobItem {
    const detailsElement = document.querySelector(".athing");
    const jobListItem = getJobListItem(detailsElement);

    const bodyHTML = getBodyHTML(document.querySelector(".fatitem .toptext"));

    return { ...jobListItem, bodyHTML };
  }
}
