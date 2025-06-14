import { mergeRouters } from "./router.ts";
import { pingRouter } from "../modules/health-check/index.ts";
import { authRouter } from "../modules/auth/index.ts";
import { userRouter } from "../modules/user/index.ts";

export const appRouter = mergeRouters(pingRouter, authRouter, userRouter);
