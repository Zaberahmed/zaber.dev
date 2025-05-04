import { initTRPC } from "@trpc/server";
import type { TContext } from "./context.ts";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
export const t = initTRPC.context<TContext>().create();
