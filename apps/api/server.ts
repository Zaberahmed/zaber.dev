import cors from "cors";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "@trpc/index.ts";
import { createContext } from "@trpc/context.ts";
import { checkDatabaseConnection, pool } from "@db/index.ts";

const port = Deno.env.get("WEB_LOCAL_PORT") || 5173;
const web_url = Deno.env.get("WEB_URL");
const allowedOrigin = web_url || `http://127.0.0.1:${port}`;

const corsOptions = {
  origin: allowedOrigin,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export const createServer = async () => {
  await checkDatabaseConnection(pool);

  return createHTTPServer({
    middleware: cors(corsOptions),
    router: appRouter,
    createContext,
  });
};
