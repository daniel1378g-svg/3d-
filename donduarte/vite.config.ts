import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// `vite build --mode artifact` makes the claude.ai preview: one classic script (app.js) with relative asset
// paths and hash-name routing, since the Artifact viewer serves files next to the page and owns the URL path.
export default defineConfig(({ mode }) => {
  const artifact = mode === "artifact";
  return {
    base: artifact ? "./" : "/",
    plugins: [react(), tailwindcss()],
    resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
    define: { __ARTIFACT__: JSON.stringify(artifact) },
    build: artifact
      ? {
          outDir: ".cache/artifact-build",
          emptyOutDir: true,
          cssCodeSplit: false,
          assetsInlineLimit: 0,
          rollupOptions: { output: { format: "iife", inlineDynamicImports: true, entryFileNames: "app.js", assetFileNames: "[name][extname]" } },
        }
      : { outDir: "dist", target: "es2020" },
  };
});
