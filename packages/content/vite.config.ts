import { join } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const outDir = join(__dirname, "..", "..", "dist");

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    minify: mode === "production",
    outDir,
    rollupOptions: {
      input: "src/main.tsx",
      output: {
        entryFileNames: "content.js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
}));
