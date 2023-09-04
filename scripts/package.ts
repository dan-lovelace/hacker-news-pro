/* eslint-disable no-console */
import { exec } from "child_process";
import fs from "fs";
import path from "path";

import archiver from "archiver";

const __dirname = process.cwd();
const VERSIONS_DIR = "versions";

function main() {
  const manifestVersion = process.argv[2];

  exec(`yarn build ${manifestVersion}`, (execError, stdout, stderr) => {
    if (execError) {
      console.log(stderr);
      process.exit(1);
    }

    const packageJson = fs.readFileSync("package.json", "utf-8");
    const packageVersion = JSON.parse(packageJson).version;
    const outputFile = path.join(
      __dirname,
      VERSIONS_DIR,
      `${packageVersion}_mv${manifestVersion}.zip`,
    );

    if (fs.existsSync(outputFile)) {
      throw new Error(`Output file already exists: ${outputFile}`);
    }

    if (!fs.existsSync(VERSIONS_DIR)) {
      fs.mkdirSync(VERSIONS_DIR);
    }

    const output = fs.createWriteStream(outputFile);
    const archive = archiver("zip", {
      zlib: {
        level: 9,
      },
    });

    archive.on("error", (archiveError) => {
      throw archiveError;
    });

    archive.pipe(output);
    archive.glob("**/*", {
      cwd: "dist",
      ignore: [".DS_Store"],
    });
    archive.finalize();

    output.on("close", () => {
      console.log(stdout);
    });
  });
}

main();
