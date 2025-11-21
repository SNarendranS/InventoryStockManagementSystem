import { Optional } from "sequelize";
import { UserRole } from "../enums/EuserRoles";
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