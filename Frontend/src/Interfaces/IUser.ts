export interface User {
  userid: string;
  email: string;
  role: string;
}

export interface UserTokenState {
  token: string | null;
  user: User | null;
}