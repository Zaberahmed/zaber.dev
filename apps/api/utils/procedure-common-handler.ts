import { TRPCError } from "@trpc/server/unstable-core-do-not-import";
import { UnknownErrorMessages } from "@constants/index.ts";

/**
 * Handles common try-catch pattern for TRPC procedures
 * @param fn The async function to execute with error handling
 * @param errorContext The context for internal server errors (e.g., "user", "auth")
 */
async function handleProcedure<T>(
  fn: () => Promise<T>,
  errorContext: string = "operation"
): Promise<T> {
  try {
    return await fn();
  } catch (error: unknown) {
    // If it's already a TRPC error, just rethrow it
    if (error instanceof TRPCError) {
      throw error;
    }

    // Otherwise, wrap in a proper TRPC error
    const errorMessage =
      error instanceof Error
        ? error.message
        : UnknownErrorMessages.UNKNOWN_ERROR_MESSAGE;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Failed to ${errorContext}: ${errorMessage}`,
      cause: error,
    });
  }
}
export { handleProcedure };
