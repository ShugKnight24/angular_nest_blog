export interface LoginError {
  error: string;
}

export interface LoginSuccess {
  access_token: string;
}

export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
}
