import fs from "fs";

import lodash from "lodash";

const { camelCase } = lodash;
const readme = fs.readFileSync("README.md", "utf-8");
let markdown = "";

// transform inline styles to JSX
const styleRegex = /style="([^"]*)"/g;
markdown = readme.replace(styleRegex, (val) => {
  const regex = /([\w-]*)\s*:\s*([^;]*)/g;
  const match = val.match(regex) ?? [];
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
markdown = markdown.replace(/\.\/assets/g, "");

// prepend an additional `#` to headings so anchoring works
markdown = markdown.replace(/#\s/g, (val) => `#${val}`);

// prepend header fields
markdown = `---
hide_title: true
---

${markdown}` 

fs.writeFileSync("packages/documentation/docs/README.md", markdown, "utf-8");
