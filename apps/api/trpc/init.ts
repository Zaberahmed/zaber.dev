import { initTRPC } from "@trpc/server";
import type { TContext } from "./context.ts";
import { isAdmin, isAuthenticated } from "./middleware.ts";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
export const t = initTRPC.context<TContext>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;
export const adminProcedure = t.procedure.use(isAuthenticated).use(isAdmin);
