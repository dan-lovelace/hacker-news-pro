import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const outDir = path.join(__dirname, "..", "..", "dist");

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    minify: mode === "production",
    outDir,
    rollupOptions: {
      input: "popup.html",
    },
  },
}));
