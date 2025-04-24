import { mergeRouters } from "../index.ts";
import { helloRouter } from "./hello.router.ts";

export const appRouter = mergeRouters(helloRouter);

// Export type router type signature, NOT the router itself.
export type AppRouter = typeof appRouter;
