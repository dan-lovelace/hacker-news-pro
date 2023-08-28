import { TJobListItem } from "./jobList";
import { IParsable } from "..";
import { getBodyHTML, getJobListItem } from "../parsing";

export type TJobItem = TJobListItem & {
  bodyHTML?: string;
};

export class JobItem implements IParsable<TJobItem> {
  parse(document: Document): TJobItem {
    const detailsElement = document.querySelector(".athing");
    const jobListItem = getJobListItem(detailsElement);

    const bodyHTML = getBodyHTML(document.querySelector(".fatitem .toptext"));

    return { ...jobListItem, bodyHTML };
  }
}
