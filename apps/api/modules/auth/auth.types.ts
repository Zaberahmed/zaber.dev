export interface UserAuthResponse {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface LoginResponse {
  token: string;
  user: UserAuthResponse;
}

export interface SessionResponse {
  user: UserAuthResponse;
}

export interface Session {
  userId: string;
  isAdmin: boolean;
  expiresAt: number;
}
