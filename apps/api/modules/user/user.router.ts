import { eq } from "drizzle-orm";
import { z } from "zod";
import { UserSuccessMessages } from "./user.constant.ts";
import { db } from "../../db/init.ts";
import { users } from "../../db/schema.ts";
import {
  createNotFoundError,
  createSuccessResponse,
  handleProcedure,
} from "../../utils/index.ts";
import { adminProcedure, publicProcedure, router } from "../../trpc/index.ts";

/**
 * User router for user related procedures
 * Includes:
 * - getAll: Get all users (admin only)
 * - getById: Get a user by id
 * - deleteAll: Delete all users (admin only)
 * - deleteById: Delete a user by id (admin only)
 */
export const userRouter = router({
  getAll: adminProcedure.query(() => {
    return handleProcedure(async () => {
      // Only return non-sensitive user data
      const allUsers = await db
        .select({
          id: users.id,
          email: users.email,
          name: users.name,
          isAdmin: users.isAdmin,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        })
        .from(users);

      return createSuccessResponse(
        UserSuccessMessages.USER_ALL_RETRIEVED,
        allUsers,
        allUsers.length
      );
    }, "retrieve users");
  }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(({ input }) => {
      return handleProcedure(async () => {
        const user = await db
          .select({
            id: users.id,
            email: users.email,
            name: users.name,
            isAdmin: users.isAdmin,
            createdAt: users.createdAt,
            updatedAt: users.updatedAt,
          })
          .from(users)
          .where(eq(users.id, input.id))
          .limit(1);

        if (user.length === 0) {
          createNotFoundError("user");
        }

        return createSuccessResponse(
          UserSuccessMessages.USER_RETRIEVED,
          user[0],
          user.length
        );
      }, "retrieve user");
    }),

  deleteAll: adminProcedure.mutation(() => {
    return handleProcedure(async () => {
      // First, count how many users will be deleted
      const userCount = await db.select({ count: users.id }).from(users);

      // Then delete all users
      await db.delete(users);

      return createSuccessResponse(
        UserSuccessMessages.USER_DELETED_ALL,
        undefined,
        userCount.length > 0 ? userCount.length : 0
      );
    }, "delete users");
  }),

  deleteById: adminProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(({ input }) => {
      return handleProcedure(async () => {
        // First, check if the user exists
        const existingUser = await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.id, input.id))
          .limit(1);

        if (existingUser.length === 0) {
          createNotFoundError("user");
        }

        // Delete the user
        await db.delete(users).where(eq(users.id, input.id));

        return createSuccessResponse(UserSuccessMessages.USER_DELETED);
      }, "delete user");
    }),
});
