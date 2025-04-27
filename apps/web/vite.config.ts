import deno from "@deno/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  // Load environment variables from .env file
  const root = path.resolve(__dirname, "../../");
  const env = loadEnv(mode, root, "");
  console.log("root", root);
  console.log("mode", mode);
  console.log("env", env);

  // Default API URL for production if not provided in env
  const apiUrl =
    env.VITE_API_URL ||
    (mode === "production"
      ? "https://zaber-api.deno.dev"
      : "http://localhost:6200");

  console.log("apiUrl:", apiUrl);

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
      // Explicitly define environment variables for the client
      "import.meta.env.VITE_API_URL": JSON.stringify(apiUrl),
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
