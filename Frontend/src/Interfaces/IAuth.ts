export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: { userid: string; email: string; role: string }; // optional
}