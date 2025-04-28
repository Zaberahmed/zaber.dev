import deno from "@deno/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import "https://deno.land/std@0.220.1/dotenv/load.ts";

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  // Load environment variables from .env file
  const root = path.resolve(__dirname, "../../");
  const env = loadEnv(mode, root, "");

  const apiUrl =
    mode === "production" ? Deno.env.get("VITE_API_URL") : env.VITE_API_URL;

  return defineConfig({
    plugins: [deno(), react()],
    server: {
      proxy: {
        "/api": {
          target: apiUrl,
          changeOrigin: true,
        },
      },
    },
    envDir: root,
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV || mode),
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
};
