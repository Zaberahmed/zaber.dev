import { mergeRouters } from "../index.ts";
import { helloRouter } from "./hello.router.ts";

export const appRouter = mergeRouters(helloRouter);
