import { TComments, TListing } from ".";

export interface IParsable<T, U = unknown> {
  parse(json: any): T | { post: T; comments: U };
}

export type TSubredditData = TListing;
export type TCommentsData = { post: TListing; comments: TComments };

export * from "./app";
export * from "./comments";
export * from "./listing";
