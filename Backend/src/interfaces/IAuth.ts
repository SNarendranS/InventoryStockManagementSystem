import { UserRole } from "../enums/EuserRoles";
import { Request } from "express";

export interface AuthRequest<T = any> extends Request<{}, {}, T> {
    user?: {
        userid: number;
        role: UserRole;
    };
}

export interface RegisterBody {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    managerid?:number;
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