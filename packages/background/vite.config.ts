import { join } from "path";

import { defineConfig } from "vite";

const outDir = join(__dirname, "..", "..", "dist");

export default defineConfig(({ mode }) => ({
  build: {
    outDir,
    rollupOptions: {
      input: "src/index.ts",
      output: {
        compact: mode === "production",
        entryFileNames: "background.js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
}));
