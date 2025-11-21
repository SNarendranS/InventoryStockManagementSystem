import { Optional } from "sequelize";
import { UserRole } from "../enums/EuserRoles";
export interface UserAttributes {
    userid: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    managerid: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes,
    "userid" | "role" | "managerid" | "createdAt" | "updatedAt"> { }