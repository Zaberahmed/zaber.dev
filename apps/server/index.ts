import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter, createContext } from "@scope/api/trpc";
import { assertPoolConnection, pool } from "@scope/api/db";
import { serveDir, serveFile } from "@std/http/file-server";
import { dirname, fromFileUrl, join } from "@std/path";

const __dirname = dirname(fromFileUrl(import.meta.url));
const distDir = join(__dirname, "../web/dist");

await assertPoolConnection(pool);

const trpcHandler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api",
    req,
    router: appRouter,
    createContext,
    onError({ error, path }) {
      console.error(`tRPC error on ${path ?? "<no-path>"}:`, error);
    },
  });

Deno.serve(async (req) => {
  const url = new URL(req.url);

  if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
    return trpcHandler(req);
  }

  try {
    const response = await serveDir(req, {
      fsRoot: distDir,
      urlRoot: "",
      quiet: true,
    });

    const hasFileExtension = /\.[a-zA-Z0-9]+$/.test(url.pathname);

    if (
      response.status === 200 ||
      (hasFileExtension && response.status !== 404)
    ) {
      return response;
    }
    if (hasFileExtension && response.status === 404) return response;
  } catch {
    const hasFileExtension = /\.[a-zA-Z0-9]+$/.test(url.pathname);
    if (hasFileExtension) return new Response("Not Found", { status: 404 });
  }

  return serveFile(req, join(distDir, "index.html"));
});
