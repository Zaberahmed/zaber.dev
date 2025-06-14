import { mergeRouters } from "./router.ts";
import { pingRouter, authRouter, userRouter } from "@modules/index.ts";

export const appRouter = mergeRouters(pingRouter, authRouter, userRouter);
