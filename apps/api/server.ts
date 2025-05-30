import "https://deno.land/std@0.220.1/dotenv/load.ts";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./trpc/routers/index.ts";
import { createContext } from "./trpc/context.ts";
import cors from "cors";
// import { checkDatabaseConnection } from "./db/index.ts";

const port = Deno.env.get("WEB_LOCAL_PORT") || 5173;
const web_url = Deno.env.get("WEB_URL");
const allowedOrigin = web_url || `http://127.0.0.1:${port}`;

const corsOptions = {
  origin: allowedOrigin,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export const createServer = () => {
  /**
   * Create HTTP server
   * @see https://trpc.io/docs/adapters/standalone
   */
  // await checkDatabaseConnection();

  return createHTTPServer({
    middleware: cors(corsOptions),
    router: appRouter,
    createContext,
  });
};
