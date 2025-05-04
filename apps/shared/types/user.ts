interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UserProfile {
  imageUrl: string;
}

export type { User, UserProfile };
