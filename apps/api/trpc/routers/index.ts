import { mergeRouters } from "../index.ts";
import { pingRouter } from "./ping.router.ts";
import { authRouter } from "../../modules/auth/index.ts";
import { userRouter } from "../../modules/user/user.router.ts";

export const appRouter = mergeRouters(pingRouter, authRouter, userRouter);

export type AppRouter = typeof appRouter;
