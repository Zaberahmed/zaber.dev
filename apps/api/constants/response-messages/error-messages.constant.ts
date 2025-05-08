const ForbiddenErrorMessages = {
  FORBIDDEN_RESOURCE_MESSAGE:
    "You need admin privileges to access this resource.",
  FORBIDDEN_ACTION_MESSAGE: "You are not allowed to perform this action.",
  FORBIDDEN_USER_ENTRY: "Admin user already exists.",
};

const UnauthorizedErrorMessages = {
  UNAUTHORIZED_RESOURCE_MESSAGE:
    "You must be logged in to access this resource.",
  UNAUTHORIZED_SETUP_KEY_MESSAGE: "Invalid setup key.",
  UNAUTHORIZED_LOGIN: "Invalid credentials.",
};

const InternalServerErrorMessages = {
  INTERNAL_SERVER_ERROR_MESSAGE: "An internal server error occurred.",
  INTERNAL_SERVER_ERROR_USER: "Failed to retrieve user.",
  INTERNAL_SERVER_ERROR_USER_DELETE: "Failed to delete users.",
};

const NotFoundErrorMessages = {
  NOT_FOUND_RESOURCE_MESSAGE: "Resource not found.",
  NOT_FOUND_USER: "User not found.",
};

const UnknownErrorMessages = {
  UNKNOWN_ERROR_MESSAGE: "An unknown error occurred.",
};

export {
  ForbiddenErrorMessages,
  UnauthorizedErrorMessages,
  InternalServerErrorMessages,
  NotFoundErrorMessages,
  UnknownErrorMessages,
};
