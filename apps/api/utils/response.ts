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
 * Creates a "not found" TRPC error with consistent structure
 * @param resourceType The type of resource not found (e.g., "user", "profile")
 */
function createNotFoundError(resourceType?: string) {
  const baseMessage = NotFoundErrorMessages.NOT_FOUND_RESOURCE_MESSAGE;

  const message = resourceType
    ? `${
        resourceType.charAt(0).toUpperCase() + resourceType.slice(1)
      } not found.`
    : baseMessage;

  throw new TRPCError({
    code: "NOT_FOUND",
    message,
  });
}

/**
 * Creates an internal server error with consistent structure
 * @param error The original error
 */
function createInternalServerError(error: unknown) {
  const baseMessage = InternalServerErrorMessages.INTERNAL_SERVER_ERROR_MESSAGE;

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
  createNotFoundError,
  createInternalServerError,
};
