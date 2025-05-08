import { router, publicProcedure, adminProcedure } from "../index.ts";
import { z } from "zod";
import { db } from "../../db/index.ts";
import { users } from "../../db/schema.ts";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

/**
 * User router for user related procedures
 * Includes:
 * - getAll: Get all users (admin only)
 * - getById: Get a user by id
 * - deleteAll: Delete all users (admin only)
 * - deleteById: Delete a user by id (admin only)
 */
export const userRouter = router({
  getAll: adminProcedure.query(async () => {
    try {
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

      return {
        status: "success",
        data: allUsers,
        count: allUsers.length,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to retrieve users: ${errorMessage}`,
        cause: error,
      });
    }
  }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ input }) => {
      try {
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
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `User with ID ${input.id} not found`,
          });
        }

        return {
          status: "success",
          data: user[0],
        };
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error;
        }

        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to retrieve user: ${errorMessage}`,
          cause: error,
        });
      }
    }),

  deleteAll: adminProcedure.mutation(async () => {
    try {
      // First, count how many users will be deleted
      const userCount = await db.select({ count: users.id }).from(users);

      // Then delete all users
      await db.delete(users);

      return {
        status: "success",
        message: `Successfully deleted all users`,
        count: userCount.length > 0 ? userCount.length : 0,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to delete users: ${errorMessage}`,
        cause: error,
      });
    }
  }),

  deleteById: adminProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // First, check if the user exists
        const existingUser = await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.id, input.id))
          .limit(1);

        if (existingUser.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `User with ID ${input.id} not found`,
          });
        }

        // Delete the user
        await db.delete(users).where(eq(users.id, input.id));

        return {
          status: "success",
          message: `Successfully deleted user with ID ${input.id}`,
        };
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error;
        }

        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to delete user: ${errorMessage}`,
          cause: error,
        });
      }
    }),
});
