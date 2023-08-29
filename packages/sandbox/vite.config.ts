import path from "path";

import { defineConfig } from "vite";

const outDir = path.join(__dirname, "..", "..", "dist");

export default defineConfig(({ mode }) => ({
  build: {
    minify: mode === "production",
    outDir,
    rollupOptions: {
      input: "sandbox.html",
    },
  },
}));
