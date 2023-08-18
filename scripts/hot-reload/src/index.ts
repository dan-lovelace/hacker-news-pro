/* eslint-disable no-console */

/**
 * Inspired by https://github.com/pacexy/mv3-hot-reload/tree/v0.2.7
 */

import path from "path";

import chokidar from "chokidar";
import { debounce } from "lodash";
import WebSocket from "ws";

/**
 * Debounce time in milliseconds. Be careful adjusting this since too low of a
 * value results in broken websocket connections and/or multiple extension
 * reloads after a single change. It should be set to wait long enough for the
 * Vite build(s) to finish writing all files.
 */
const debounceMs = 1000;

// configuration options
const port = 9012; // port changes should be applied to `packages/content/src/main.tsx` as well
const distDirectory = "dist";
const exclude: string[] = [];
const quiet = process.env.QUIET?.toLowerCase() === "true";
const noWatch = process.env.NO_WATCH?.toLowerCase() === "true";

const directoryPath = path.resolve(__dirname, "../../..", distDirectory);
const excludePaths = exclude.map((file) => path.join(directoryPath, file));

const wss = new WebSocket.Server({ port });

function log(message: string) {
  if (quiet) return;

  console.log(message);
}

wss.on("listening", () => {
  log("Hot reload server is listening...");
});

wss.on("close", () => {
  log("Hot reload server closed");
});

wss.on("connection", (ws) => {
  if (noWatch) return;

  const watcher = chokidar.watch(directoryPath, {
    ignoreInitial: true,
  });

  watcher.on(
    "all",
    debounce((_, path) => {
      if (!excludePaths.includes(path)) {
        if (!quiet) {
          log(`File change detected: ${path}`);
        }

        ws.send("file-change");
      }
    }, debounceMs),
  );

  ws.on("close", () => {
    watcher.close();
  });
});
