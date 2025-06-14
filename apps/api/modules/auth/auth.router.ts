import { AuthSuccessMessages } from "./auth.constants.ts";
import { adminProcedure, publicProcedure, router } from "../../trpc/index.ts";
import { createSuccessResponse, handleProcedure } from "../../utils/index.ts";
import { createInitialAdminSchema, loginSchema } from "./auth.schema.ts";
import { authService } from "./auth.service.ts";

export const authRouter = router({
  // Login procedure
  login: publicProcedure.input(loginSchema).mutation(({ input }) => {
    return handleProcedure(async () => {
      const result = await authService.login(input);

      return createSuccessResponse(AuthSuccessMessages.LOGIN_SUCCESS, result);
    }, "login");
  }),

  // Get current session
  getSession: adminProcedure.query(({ ctx }) => {
    return handleProcedure(async () => {
      if (!ctx.session) {
        return null;
      }

      const result = await authService.getSession(ctx.session.userId);

      if (!result) {
        return null;
      }

      return createSuccessResponse(AuthSuccessMessages.SESSION_SUCCESS, result);
    }, "get session");
  }),

  // Create initial admin user (for setup purposes)
  createInitialAdmin: publicProcedure
    .input(createInitialAdminSchema)
    .mutation(({ input }) => {
      return handleProcedure(async () => {
        const result = await authService.createInitialAdmin(input);

        return createSuccessResponse(AuthSuccessMessages.ADMIN_USER_CREATED, {
          user: result,
        });
      }, "create admin");
    }),
});
