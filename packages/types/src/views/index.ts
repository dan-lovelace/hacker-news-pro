import { TView } from "../app";

export type TViewRoute = {
  path: string;
  view: TView;
};

export const viewRouteMap: Record<string, TView> = {
  "/": "list",
  "/ask": "list",
  "/item": "item",
  "/front": "list",
  "/jobs": "jobs",
  "/newcomments": "list",
  "/newest": "list",
  "/news": "list",
  "/show": "list",
  "/submit": "submit",
  "/user": "user",
};

export * from "./item";
export * from "./jobs";
export * from "./list";
export * from "./submit";
export * from "./user";
