import { mergeRouters } from "./router.ts";
import { authRouter, pingRouter, userRouter } from "@modules";

export const appRouter = mergeRouters(pingRouter, authRouter, userRouter);
