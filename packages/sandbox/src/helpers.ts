/**
 * Various helper utilities for use in Handlebars templates.
 * @module handlebars-helpers
 */
import Handlebars, { HelperOptions } from "handlebars";
import { capitalize as _capitalize } from "lodash";

import {
  getHumanizeUnixTime,
  getTimestampDate,
  getTimestampTime,
} from "./lib/time";

/**
 * Adds two numbers.
 * @example
 * <span>{{add 6 3}}</span>
 */
export const add = (a: any, b: any) => {
  return a + b;
};
Handlebars.registerHelper("add", add);

/**
 * Divides two numbers.
 * @example
 * <span>{{divide 6 3}}</span>
 */
export const divide = (a: any, b: any) => {
  return Math.round((a / b) * 100) / 100;
};
Handlebars.registerHelper("divide", divide);

/**
 * Multiplies two numbers.
 * @example
 * <span>{{multiply 6 3}}</span>
 */
export const multiply = (a: any, b: any) => {
  return Math.round(a * b * 100) / 100;
};
Handlebars.registerHelper("multiply", multiply);

/**
 * Subtracts two numbers.
 * @example
 * <span>{{subtract 6 3}}</span>
 */
export const subtract = (a: any, b: any) => {
  return a - b;
};
Handlebars.registerHelper("subtract", subtract);

/**
 * Performs a strict equality check between two items to conditionally render
 * based on the result.
 * @example
 * <span>
 *   {{#ifeq 6 3}}
 *     Equal
 *   {{/ifeq}}
 * </span>
 * @example
 * <span>
 *   {{#ifeq 6 3}}
 *     Equal
 *   {{else}}
 *     Not equal
 *   {{/ifeq}}
 * </span>
 */
export const ifeq = (a: any, b: any, options: HelperOptions) => {
  return a === b ? options.fn(this) : options.inverse(this);
};
Handlebars.registerHelper("ifeq", ifeq);

/**
 * Performs a strict inequality check between two items to conditionally render
 * based on the result.
 * @example
 * <span>
 *   {{#ifnoteq 6 3}}
 *     Not equal
 *   {{/ifnoteq}}
 * </span>
 * @example
 * <span>
 *   {{#ifnoteq 6 3}}
 *     Not equal
 *   {{else}}
 *     Equal
 *   {{/ifnoteq}}
 * </span>
 */
export const ifnoteq = (a: any, b: any, options: HelperOptions) => {
  return a !== b ? options.fn(this) : options.inverse(this);
};
Handlebars.registerHelper("ifnoteq", ifnoteq);

/**
 * Capitalizes the first character of a string.
 * @example
 * <span>{{capitalize link.title}}</span>
 */
export const capitalize = (a: any) => {
  return _capitalize(a);
};
Handlebars.registerHelper("capitalize", capitalize);

/**
 * Humanizes a Unix timestamp.
 * @example
 * <span>{{humanizeUnixTime 1693766828}}</span>
 */
export const humanizeUnixTime = (a: any) => {
  return getHumanizeUnixTime(a);
};
Handlebars.registerHelper("humanizeUnixTime", getHumanizeUnixTime);

/**
 * Performs a modulo operation between two numbers.
 * @example
 * <span>{{mod 6 3}}</span>
 */
export const mod = (a: any, b: any) => {
  return a % b;
};
Handlebars.registerHelper("mod", mod);

/**
 * Returns the date portion of a timestamp.
 * @example
 * <span>{{timestampDate "2023-09-03T14:53:21Z"}}</span>
 */
export const timestampDate = (a: any) => {
  return getTimestampDate(a);
};
Handlebars.registerHelper("timestampDate", timestampDate);

/**
 * Returns the time portion of a timestamp.
 * @example
 * <span>{{timestampTime "2023-09-03T14:53:21Z"}}</span>
 */
export const timestampTime = (a: any) => {
  return getTimestampTime(a);
};
Handlebars.registerHelper("timestampTime", getTimestampTime);
