export interface IParsable<T> {
  parse(document: Document): T;
}

export * from "./app";
export * from "./ListRename";
