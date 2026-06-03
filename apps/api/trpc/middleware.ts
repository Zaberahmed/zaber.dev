import { TRPCError } from "@trpc/server";
import { t } from "./init.ts";
import { ForbiddenErrorMessages, UnauthorizedErrorMessages } from "@constants";

/**
 * Middleware that checks if user is authenticated
 */
const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: UnauthorizedErrorMessages.UNAUTHORIZED_RESOURCE_MESSAGE,
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
      message: ForbiddenErrorMessages.FORBIDDEN_RESOURCE_MESSAGE,
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
