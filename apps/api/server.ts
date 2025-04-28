import "https://deno.land/std@0.220.1/dotenv/load.ts";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./trpc/routers/index.ts";

export const createServer = () => {
  /**
   * Create HTTP server
   * @see https://trpc.io/docs/adapters/standalone
   */
  const port = Deno.env.get("WEB_LOCAL_PORT") || 5173;
  const web_url = Deno.env.get("WEB_URL");
  const allowedOrigin = web_url || `http://127.0.0.1:${port}`;

  return createHTTPServer({
    router: appRouter,
    createContext({ req, res }) {
      res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
      res.setHeader("Access-Control-Request-Method", "*");
      res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
      res.setHeader("Access-Control-Allow-Headers", "*");

      if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return {};
      }

      return {};
    },
  });
};
