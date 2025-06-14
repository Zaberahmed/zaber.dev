import { adminProcedure, publicProcedure, router } from "../../trpc/index.ts";
import { createSuccessResponse, handleProcedure } from "../../utils/index.ts";
import { UserSuccessMessages } from "./user.constant.ts";
import { deleteUserByIdSchema, getUserByIdSchema } from "./user.schema.ts";
import { userService } from "./user.service.ts";

/**
 * User router for user related procedures
 * Includes:
 * - getAll: Get all users (admin only)
 * - getById: Get a user by id
 * - create: Create a new user (admin only)
 * - update: Update a user (admin only)
 * - deleteAll: Delete all users (admin only)
 * - deleteById: Delete a user by id (admin only)
 */
export const userRouter = router({
  getAll: adminProcedure.query(() => {
    return handleProcedure(async () => {
      const result = await userService.getAllUsers();

      return createSuccessResponse(
        UserSuccessMessages.USER_ALL_RETRIEVED,
        result.users,
        result.count
      );
    }, "retrieve users");
  }),

  getById: publicProcedure.input(getUserByIdSchema).query(({ input }) => {
    return handleProcedure(async () => {
      const user = await userService.getUserById(input);

      return createSuccessResponse(UserSuccessMessages.USER_RETRIEVED, user);
    }, "retrieve user");
  }),

  deleteAll: adminProcedure.mutation(() => {
    return handleProcedure(async () => {
      const deletedCount = await userService.deleteAllUsers();

      return createSuccessResponse(
        UserSuccessMessages.USER_DELETED_ALL,
        undefined,
        deletedCount
      );
    }, "delete users");
  }),

  deleteById: adminProcedure
    .input(deleteUserByIdSchema)
    .mutation(({ input }) => {
      return handleProcedure(async () => {
        await userService.deleteUserById(input);

        return createSuccessResponse(UserSuccessMessages.USER_DELETED);
      }, "delete user");
    }),
});
