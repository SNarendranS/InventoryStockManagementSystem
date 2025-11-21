import { UserRole } from "../enums/EuserRoles";

export interface RegisterBody {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
}

export interface LoginBody {
    email: string;
    password: string;
}

export interface JWTPayload {
    userid: number;
    email: string;
    role: UserRole;
}