import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter, createContext } from "@trpc";
import { assertPoolConnection, pool } from "@db";
import cors from "cors";

const port = Deno.env.get("WEB_LOCAL_PORT") || 5173;
const web_url = Deno.env.get("WEB_URL") || `http://localhost:${port}`;
const allowedOrigins = [web_url, `http://127.0.0.1:${port}`];

const corsOptions = {
  origin: [...allowedOrigins],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export const createServer = async () => {
  await assertPoolConnection(pool);

  return createHTTPServer({
    middleware: cors(corsOptions),
    router: appRouter,
    createContext,
  });
};
