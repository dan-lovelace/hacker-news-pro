/**
 * Postprocesses output from TypeDoc to prepare it for Docusaurus and tweak
 * things such as the README and markdown page titles.
 */

import fs from "fs";
import { join } from "path";

import lodash from "lodash";

const { camelCase, startCase } = lodash;
const docsPath = "packages/documentation/docs";

/**
 * Modify the README file to play nicely with the Docusaurus build. v2 gets
 * very angry about inline styles so we convert them to JSX format. v3 will
 * give more control over the markdown format so this might be removable at
 * some point.
 */
const readme = fs.readFileSync("README.md", "utf-8");
let readmeMarkdown = "";

// transform inline styles to JSX
const styleRegex = /style="([^"]*)"/g;
readmeMarkdown = readme.replace(styleRegex, (val) => {
  const cssRegex = /([\w-]*)\s*:\s*([^;]*)/g;
  const match = val.match(cssRegex) ?? [];
  const properties: Record<string, string> = {};

  match.forEach((val) => {
    const parts = val.split(":");
    const property = camelCase(parts[0]);
    const value = parts[1].trim();

    properties[property] = value;
  });

  return `style={${JSON.stringify(properties)}}`;
});

// modify asset paths to be relative to docs assets
readmeMarkdown = readmeMarkdown.replace(/\.\/assets/g, "");

// prepend an additional `#` to headings so anchoring works
readmeMarkdown = readmeMarkdown.replace(/#\s/g, (val) => `#${val}`);

// prepend header fields
readmeMarkdown = `---
hide_title: true
---

${readmeMarkdown}`;

fs.writeFileSync(join(docsPath, "README.md"), readmeMarkdown, "utf-8");

/**
 * Transform markdown page titles to exclude their type. Titles like
 * "Module: WebComponents" are changed to just "Web Components."
 */
const typesRegex = /^#\s(Class|Module):\s.*$/gm;
const docsDirectories = fs
  .readdirSync(docsPath, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => join(docsPath, entry.name));

docsDirectories.forEach((directory) => {
  const files = fs.readdirSync(directory).map((file) => join(directory, file));

  files.forEach((file) => {
    const contents = fs.readFileSync(file, "utf-8");
    const newContents = contents.replace(typesRegex, (val) => {
      const parts = val.split(":");
      const title = startCase(parts[1]).trim();

      return `# ${title}`;
    });

    fs.writeFileSync(file, newContents, "utf-8");
  });
});
