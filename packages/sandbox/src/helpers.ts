import Handlebars from "handlebars";
import { capitalize, truncate } from "lodash";

import { humanizeUnixTime, timestampDate, timestampTime } from "./lib/time";

Handlebars.registerHelper("add", (a, b) => {
  return a + b;
});

Handlebars.registerHelper("divide", (a, b) => {
  return Math.round((a / b) * 100) / 100;
});

Handlebars.registerHelper("multiply", (a, b) => {
  return Math.round(a * b * 100) / 100;
});

Handlebars.registerHelper("subtract", (a, b) => {
  return a - b;
});

Handlebars.registerHelper("ifeq", (a, b, options) => {
  return a === b ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("ifnoteq", (a, b, options) => {
  return a !== b ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("ifnotend", (a, b, options) => {
  return a < b - 1 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("capitalize", (a) => {
  return capitalize(a);
});

Handlebars.registerHelper("humanizeUnixTime", (a) => {
  return humanizeUnixTime(a);
});

Handlebars.registerHelper("mod", (a, b) => {
  return a % b;
});

Handlebars.registerHelper("timestampDate", (a) => {
  return timestampDate(a);
});

Handlebars.registerHelper("timestampTime", (a) => {
  return timestampTime(a);
});

Handlebars.registerHelper("truncate", (a) => {
  return truncate(a);
});
