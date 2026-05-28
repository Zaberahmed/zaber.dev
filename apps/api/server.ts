import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter, createContext } from "@trpc";
import { assertPoolConnection, pool } from "@db";
import cors from "cors";
import { env } from "@lib";

const allowedOrigins = env.CORS_ALLOWED_ORIGINS.split(",").map((origin) =>
  origin.trim()
);

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
