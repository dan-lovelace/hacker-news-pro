import { IParsable } from "..";
import { getJobListItem } from "../parsing";

export type TJobList = {
  items: TJobListItem[];
  links: {
    /** Link to the next page */
    more?: string;
  };
};

export type TJobListItem = {
  age: {
    humanized?: string;
    timestamp?: string;
  };
  links: {
    hide?: string;
    item?: string;
  };
  title?: string;
};

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
