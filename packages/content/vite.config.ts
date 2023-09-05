import { basename, dirname, join } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const outDir = join(__dirname, "..", "..", "dist");

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    minify: mode === "production",
    outDir,
    rollupOptions: {
      input: ["src/main.tsx", "src/web-components/index.ts"],
      output: {
        entryFileNames: (chunkInfo) => {
          switch (chunkInfo.name) {
            case "main":
              /**
               * Use the packge name for `main.tsx`.
               */
              return "content.js";
            default:
              /**
               * Use the input's parent directory name for everything else and
               * put it into the `assets/js` directory so we don't need to
               * maintain the manifest's `web_accessible_resources`.
               */
              return join(
                "assets",
                "js",
                `${basename(
                  dirname(chunkInfo.facadeModuleId ?? "content-chunk"),
                )}.js`,
              );
          }
        },
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
}));
