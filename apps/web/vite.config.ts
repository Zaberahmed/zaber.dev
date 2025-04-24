import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [deno(), react()],
  server: {
    proxy: {
      "/api": {
        target: "https://zaber-api.deno.dev",
        changeOrigin: true,
      },
    },
  },
  build: {
    // Generate static assets in the dist folder
    outDir: "dist",
    // Clean the output directory before building
    emptyOutDir: true,
    // Optimize asset size
    minify: true,
  },
});
