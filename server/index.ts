import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { mergeRouters } from "./trpc/index.ts";
import { helloRouter } from "./trpc/routers/index.ts";

const appRouter = mergeRouters(helloRouter);

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);
console.log("Server is running on http://localhost:3000");

// Export type router type signature, NOT the router itself.
export type AppRouter = typeof appRouter;
