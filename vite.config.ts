import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
const base = process.env.BASE_URL || '/Code-Color/'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: base,
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  optimizeDeps: {
    exclude: ["web-tree-sitter"],
  },
  assetsInclude: ["**/*.wasm", "**/*.html"],
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
    fs: {
      // Allow serving files from one level up to the project root
      allow: [".."],
    },
  },
  resolve: {
    alias: {
      fs: "browserify-fs",
    },
  },
});
