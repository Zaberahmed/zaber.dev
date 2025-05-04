import { initTRPC } from "@trpc/server";
import type { Context } from "./context.ts";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create();

export { t };
