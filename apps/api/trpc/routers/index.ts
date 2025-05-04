import { mergeRouters } from "../index.ts";
import { helloRouter } from "./hello.router.ts";
import { authRouter } from "./auth.router.ts";

export const appRouter = mergeRouters(helloRouter, authRouter);

export type AppRouter = typeof appRouter;
