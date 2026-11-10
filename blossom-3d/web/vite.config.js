import { defineConfig } from 'vite';

// One JS file and one CSS file with fixed names: the Artifact preview inlines the CSS and ships app.js beside the page.
export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    outDir: '../dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
        entryFileNames: 'app.js',
        assetFileNames: (a) => (a.name && a.name.endsWith('.css') ? 'app.css' : 'assets/[name][extname]'),
      },
    },
  },
  server: { host: '127.0.0.1', port: 5173 },
  preview: { host: '127.0.0.1', port: 4173 },
});
