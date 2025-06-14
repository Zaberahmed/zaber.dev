import { mergeRouters } from "./router.ts";
import { pingRouter } from "../modules/health-check/ping.router.ts";
import { authRouter } from "../modules/auth/index.ts";
import { userRouter } from "../modules/user/user.router.ts";

export const appRouter = mergeRouters(pingRouter, authRouter, userRouter);
