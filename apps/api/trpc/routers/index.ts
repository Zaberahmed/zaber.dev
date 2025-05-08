import { mergeRouters } from "../index.ts";
import { helloRouter } from "./hello.router.ts";
import { authRouter } from "./auth.router.ts";
import { userRouter } from "./user.router.ts";

export const appRouter = mergeRouters(helloRouter, authRouter, userRouter);

export type AppRouter = typeof appRouter;
