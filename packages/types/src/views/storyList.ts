import { IParsable, TVoteDirection } from "..";
import { getStoryListItem } from "../parsing";

export type TStoryList = {
  items: TStoryListItem[];
  links: {
    /** Link to the next page */
    more?: string;
  };
};

export type TStoryListItem = {
  commentsCount: number;
  createdAt: string;
  createdHumanized: string;
  id: string;
  interactions: {
    hide?: string;
    voteDown?: string;
    voteUp?: string;
  };
  links: {
    favorite?: string;
    flag?: string;
    from?: string;
    item?: string;
    past?: string;
  };
  score?: number;
  site?: {
    name: string;
    url: string;
  };
  title: string;
  user?: {
    id: string;
    link: string;
  };
  voted: TVoteDirection;
};

export class StoryList implements IParsable<TStoryList> {
  parse(document: Document): TStoryList {
    const items: TStoryListItem[] = [];
    const entries = document.querySelectorAll(".athing");

    entries.forEach((node) => {
      items.push(getStoryListItem(node));
    });

    const links = {
      more:
        document.querySelector(".morelink")?.getAttribute("href") ?? undefined,
    };

    return { items, links };
  }
}
