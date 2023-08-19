import { TComments, TListing } from ".";

export interface IParsable<T> {
  parse(document: Document): T;
}

export type TSubredditData = TListing;
export type TCommentsData = { post: TListing; comments: TComments };

export * from "./app";
export * from "./comments";
export * from "./list";
export * from "./listing";
