import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./trpc/routers/index.ts";

export const createServer = () => {
  /**
   * Create HTTP server
   * @see https://trpc.io/docs/adapters/standalone
   */
  return createHTTPServer({
    router: appRouter,
    createContext({ req, res }) {
      res.setHeader("Access-Control-Allow-Origin", "*");
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
