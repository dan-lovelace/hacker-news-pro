import { join } from "path";

import react from "@vitejs/plugin-react";
import staticCopy from "rollup-plugin-copy";
import { defineConfig } from "vite";

const outDir = join(__dirname, "..", "..", "dist");

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    staticCopy({
      targets: [{ src: "public/*", dest: outDir }],
    }),
  ],
  esbuild: {
    drop: mode === "production" ? ["console"] : [],
  },
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
