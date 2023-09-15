/**
 * Hacker News Pro page scraper.
 * @module Scraper
 */

export interface IParsable<T> {
  parse(document: Document): T;
}

export * from "./lib";
export * from "./views";
