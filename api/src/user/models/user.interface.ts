export interface LoginError {
  error: string;
}

export interface LoginSuccess {
  access_token: string;
}

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  PUBLISHER = 'publisher',
  USER = 'user'
}

export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}
