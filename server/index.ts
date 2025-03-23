import { publicProcedure, router } from "./trpc/index.ts";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const appRouter = router({
  hello: publicProcedure.query(() => {
    return {
      greeting: "Hello World!",
    };
  }),
});

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
