import { Optional } from "sequelize";
import { UserRole } from "../enums/EuserRoles";
import { User } from "../models/User";
export interface UserAttributes {
    userid: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "userid" | "createdAt" | "updatedAt"> { }
interface UserResponse {
    userid: number;
    name: string;
    email: string;
    role?: UserRole;
}

export const toUserResponse = (user: User | User[]): UserResponse | UserResponse[] => {
    if (Array.isArray(user)) {
        return user.map(u => ({
            userid: u.userid,
            name: u.name,
            email: u.email,
            role: u.role
        }));
    }

    return {
        userid: user.userid,
        name: user.name,
        email: user.email,
        role: user.role,
    };
};
