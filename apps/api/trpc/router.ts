import { t } from "./init.ts";
import { isAuthenticated, isAdmin } from "./middleware.ts";

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;
export const adminProcedure = t.procedure.use(isAuthenticated).use(isAdmin);
