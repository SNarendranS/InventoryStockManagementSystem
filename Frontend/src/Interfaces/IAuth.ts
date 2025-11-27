export interface LoginRequest {
    email: string;
    password: string;
}
export interface TokenUser {
  userid: number;
  email: string;
  role: string;
}


export interface LoginResponse {
    token: string;
    user: TokenUser
}