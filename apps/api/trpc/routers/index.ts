import { mergeRouters } from "../index.ts";
import { pingRouter } from "./ping.router.ts";
import { authRouter } from "./auth.router.ts";
import { userRouter } from "./user.router.ts";

export const appRouter = mergeRouters(pingRouter, authRouter, userRouter);

export type AppRouter = typeof appRouter;
