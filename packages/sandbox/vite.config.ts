import path from "path";

import { defineConfig } from "vite";

const outDir = path.join(__dirname, "..", "..", "dist");

export default defineConfig(({ mode }) => ({
  build: {
    outDir,
    rollupOptions: {
      input: "sandbox.html",
      minify: mode === "production",
    },
  },
}));
