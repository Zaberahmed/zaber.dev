export interface UserResponse {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserListResponse {
  users: UserResponse[];
  count: number;
}
