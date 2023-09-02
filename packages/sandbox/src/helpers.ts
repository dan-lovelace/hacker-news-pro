import Handlebars from "handlebars";
import { capitalize, truncate } from "lodash";

import { prettyDate } from "./lib/time";

Handlebars.registerHelper("add", (a, b) => {
  return a + b;
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

Handlebars.registerHelper("mod", (a, b) => {
  return a % b;
});

Handlebars.registerHelper("prettyDate", (a) => {
  return prettyDate(a);
});

Handlebars.registerHelper("times", (a, b) => {
  return a * b;
});

Handlebars.registerHelper("truncate", (a) => {
  return truncate(a);
});
