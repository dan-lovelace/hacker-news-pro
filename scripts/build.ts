/* eslint-disable no-console */

/*
  This script takes a given manifest version (2 or 3) and generates a
  supported `manifest.json` file. Output is placed in the `dist` directory.

  # USAGE

  ```sh
  ts-node build.ts [2 | 3]
  ```

  # WHY

  Chrome currently supports v3 manifest while other browsers do not. We need a
  way to package all supported versions to use when publishing the extension to
  the various extension stores.
*/

import { exec } from "child_process";
import fs from "fs";
import path from "path";

const __dirname = process.cwd();
const MANIFEST_VERSIONS = [2, 3];

function main() {
  const manifestVersion = process.argv[2];

  if (!manifestVersion) {
    console.error("Missing manifest version");
    console.info(`Usage: node build.cjs [${MANIFEST_VERSIONS.join(" | ")}]`);
    process.exit(1);
  }

  if (!MANIFEST_VERSIONS.includes(parseInt(manifestVersion))) {
    console.error("Invalid manifest version");
    console.info(`Must be one of: ${MANIFEST_VERSIONS.join(", ")}`);
    process.exit(1);
  }

  const manifestJson = fs.readFileSync(
    path.join(__dirname, "assets", `manifest-v${manifestVersion}.json`),
    "utf-8",
  );

  const packageJson = fs.readFileSync(
    path.join(__dirname, "package.json"),
    "utf-8",
  );

  const packageVersion = JSON.parse(packageJson).version;
  const buildManifestJson = JSON.parse(manifestJson);

  buildManifestJson.version = packageVersion;
  delete buildManifestJson.$schema;

  exec("lerna run build", (error, stdout) => {
    if (error) {
      console.error(`exec error: ${error}`);
      process.exit(1);
    }

    fs.writeFileSync(
      path.join(__dirname, "dist", "manifest.json"),
      JSON.stringify(buildManifestJson, undefined, 2),
      "utf-8",
    );

    console.log(stdout);
  });
}

main();
