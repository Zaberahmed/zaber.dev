import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter, createContext } from "@trpc";
import { assertPoolConnection, pool } from "@db";
import { env } from "@lib";

export const createServer = async () => {
  await assertPoolConnection(pool);

  return Deno.serve(
    env.DEPLOYMENT_MODE === "local" ? { port: Number(env.API_LOCAL_PORT) } : {},
    (req) =>
      fetchRequestHandler({
        endpoint: "/",
        req,
        router: appRouter,
        createContext,
      }),
  );
};
