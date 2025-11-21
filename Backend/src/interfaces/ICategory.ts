import { Optional } from "sequelize";
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