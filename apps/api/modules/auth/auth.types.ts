export interface UserResponse {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface LoginResponse {
  token: string;
  user: UserResponse;
}

export interface SessionResponse {
  user: UserResponse;
}

export interface Session {
  userId: string;
  isAdmin: boolean;
  expiresAt: number;
}
