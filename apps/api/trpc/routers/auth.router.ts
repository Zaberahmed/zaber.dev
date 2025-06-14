import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  ADMIN_SETUP_KEY,
  AuthSuccessMessages,
  ForbiddenErrorMessages,
  UnauthorizedErrorMessages,
  UserSuccessMessages,
} from "../../constants/index.ts";
import { db } from "../../db/init.ts";
import { users } from "../../db/schema.ts";
import {
  createToken,
  hashPassword,
  verifyPassword,
  createSuccessResponse,
  handleProcedure,
} from "../../utils/index.ts";

import { adminProcedure, publicProcedure, router } from "../index.ts";

export const authRouter = router({
  // Login procedure
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      })
    )
    .mutation(({ input }) => {
      return handleProcedure(async () => {
        const { email, password } = input;

        // Find user by email
        const userResults = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);
        const user = userResults[0];

        // If user not found or password doesn't match
        if (!user || !(await verifyPassword(password, user.passwordHash))) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: UnauthorizedErrorMessages.UNAUTHORIZED_LOGIN,
          });
        }

        // Create JWT token
        const token = await createToken({
          userId: user.id,
          isAdmin: user.isAdmin,
        });

        return createSuccessResponse(AuthSuccessMessages.LOGIN_SUCCESS, {
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
          },
        });
      }, "login");
    }),

  // Get current session
  getSession: adminProcedure.query(({ ctx }) => {
    return handleProcedure(async () => {
      if (!ctx.session) {
        return null;
      }

      // Fetch user data based on session
      const userResults = await db
        .select()
        .from(users)
        .where(eq(users.id, ctx.session.userId))
        .limit(1);
      const user = userResults[0];

      if (!user) {
        return null;
      }

      return createSuccessResponse(AuthSuccessMessages.SESSION_SUCCESS, {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        },
      });
    }, "get session");
  }),

  // Create initial admin user (for setup purposes)
  createInitialAdmin: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(4),
        name: z.string().min(1),
        setupKey: z.string(), // A secret key to allow initial setup
      })
    )
    .mutation(({ input }) => {
      return handleProcedure(async () => {
        const { email, password, name, setupKey } = input;

        // Verify setup key from environment variable
        const validSetupKey = ADMIN_SETUP_KEY;

        if (setupKey !== validSetupKey) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: UnauthorizedErrorMessages.UNAUTHORIZED_SETUP_KEY_MESSAGE,
          });
        }

        // Check if any admin user already exists
        const adminCount = await db
          .select({ count: users.id })
          .from(users)
          .where(eq(users.isAdmin, true));

        if (adminCount.length > 0 && adminCount[0].count) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: ForbiddenErrorMessages.FORBIDDEN_USER_ENTRY,
          });
        }

        // Hash the password
        const passwordHash = await hashPassword(password);

        // Create the admin user
        const newUser = await db
          .insert(users)
          .values({
            email,
            passwordHash,
            name,
            isAdmin: true,
          })
          .returning();

        return createSuccessResponse(UserSuccessMessages.ADMIN_USER_CREATED, {
          user: {
            id: newUser[0].id,
            email: newUser[0].email,
            name: newUser[0].name,
            isAdmin: newUser[0].isAdmin,
          },
        });
      }, "create admin");
    }),
});
