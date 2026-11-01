import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// Three builds share this config:
//   vite build                 the site (dist/), prerendered afterwards by scripts/prerender.mjs
//   vite build --ssr …         the server renderer used by the prerender script (.cache/ssr)
//   vite build --mode artifact the claude.ai preview: one classic script, relative asset paths, hash routes
export default defineConfig(({ mode, isSsrBuild }) => {
  const artifact = mode === "artifact";
  return {
    base: artifact ? "./" : "/",
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@shared": fileURLToPath(new URL("./shared", import.meta.url)),
        "@content": fileURLToPath(new URL("./content", import.meta.url)),
      },
    },
    define: {
      __ARTIFACT__: JSON.stringify(artifact),
      __PROPOSAL__: JSON.stringify(process.env.VITE_PROPOSAL !== "0"),
    },
    server: { host: "127.0.0.1", port: 5340, proxy: { "/api": "http://127.0.0.1:4340" } },
    preview: { host: "127.0.0.1", port: 4341 },
    build: artifact
      ? {
          outDir: ".cache/artifact-build",
          emptyOutDir: true,
          cssCodeSplit: false,
          assetsInlineLimit: 0,
          rollupOptions: { input: "src/entry-artifact.tsx", output: { format: "iife", inlineDynamicImports: true, entryFileNames: "app.js", assetFileNames: "[name][extname]" } },
        }
      : isSsrBuild
        ? { outDir: ".cache/ssr", emptyOutDir: true, ssr: true, rollupOptions: { input: "src/entry-server.tsx", output: { format: "esm", entryFileNames: "entry-server.mjs" } } }
        : { outDir: "dist", target: "es2022", manifest: true, chunkSizeWarningLimit: 700 },
    ssr: { noExternal: [] },
  };
});
