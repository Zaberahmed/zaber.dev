import { TRPCError } from "@trpc/server";
import {
  InternalServerErrorMessages,
  NotFoundErrorMessages,
  UnknownErrorMessages,
} from "../constants/index.ts";

/**
 * Creates a success response with consistent structure
 * @param message Success message to return
 * @param data Optional data to include in the response
 * @param count Optional count for list responses
 */
function createSuccessResponse<T>(message: string, data?: T, count?: number) {
  const response: {
    isSuccess: true;
    message: string;
    data?: T;
    count?: number;
  } = {
    isSuccess: true,
    message,
  };

  if (data !== undefined) {
    response.data = data;
  }

  if (count !== undefined) {
    response.count = count;
  }

  return response;
}

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

/**
 * Creates a "not found" TRPC error with consistent structure
 * @param resourceType The type of resource not found (e.g., "user", "profile")
 */
function createNotFoundError(resourceType: string = "resource") {
  let message = NotFoundErrorMessages.NOT_FOUND_RESOURCE_MESSAGE;

  // Use specific message if available
  if (resourceType === "user") {
    message = NotFoundErrorMessages.NOT_FOUND_USER;
  }

  throw new TRPCError({
    code: "NOT_FOUND",
    message,
  });
}

/**
 * Creates an internal server error with consistent structure
 * @param errorContext The context for the error (e.g., "retrieving user", "deleting user")
 * @param error The original error
 */
function createInternalServerError(errorContext: string, error: unknown) {
  let baseMessage = InternalServerErrorMessages.INTERNAL_SERVER_ERROR_MESSAGE;

  // Use specific message if available
  if (errorContext === "user") {
    baseMessage = InternalServerErrorMessages.INTERNAL_SERVER_ERROR_USER;
  } else if (errorContext === "user_delete") {
    baseMessage = InternalServerErrorMessages.INTERNAL_SERVER_ERROR_USER_DELETE;
  }

  const errorMessage =
    error instanceof Error
      ? error.message
      : UnknownErrorMessages.UNKNOWN_ERROR_MESSAGE;

  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: `${baseMessage}: ${errorMessage}`,
    cause: error,
  });
}

export {
  createSuccessResponse,
  handleProcedure,
  createNotFoundError,
  createInternalServerError,
};
