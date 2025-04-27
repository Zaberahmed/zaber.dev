import { defineConfig, loadEnv } from "vite";
import process from "node:process";
import deno from "@deno/vite-plugin";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default () => {
  // Load environment variables from .env file
  process.env = {
    ...process.env,
    ...loadEnv("", process.cwd() + "../../", "VITE_"),
  };
  console.log("VITE_API_URL", process.env.VITE_API_URL);
  return defineConfig({
    plugins: [deno(), react()],
    server: {
      proxy: {
        "/api": {
          target: Deno.env.get("VITE_API_URL") || "http://localhost:6200",
          changeOrigin: true,
        },
      },
    },
    envDir: "../../",

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
