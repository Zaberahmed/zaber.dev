import { TRPCError } from "@trpc/server";
import { t } from "./init.ts";

/**
 * Middleware that checks if user is authenticated
 */
const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource.",
    });
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});

/**
 * Middleware that checks if user is an admin
 */
const isAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.isAdmin) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You need admin privileges to access this resource.",
    });
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});

export { isAdmin, isAuthenticated };
