import { Optional } from "sequelize";
import { Category } from "../models/Category";

export interface CategoryAttributes {
    categoryid: number;
    categoryName: string;
    categoryDescription?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CategoryCreationAttributes extends Optional<CategoryAttributes, "categoryid" | "categoryDescription" | "createdAt" | "updatedAt"> { }

export interface categoryBody {
    categoryName: string;
    categoryDescription?: string;
}

interface categoryResponse {
    categoryid: number;
    categoryName: string;
    categoryDescription?: string
}

export const categoryTemplate:(keyof categoryResponse)[]=
[
    "categoryid","categoryName","categoryDescription"
]