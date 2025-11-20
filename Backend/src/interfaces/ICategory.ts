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

export const toCategoryResponse = (category: Category | Category[]): categoryResponse | categoryResponse[] => {
    if (Array.isArray(category)) {
        return category.map(c => ({
            categoryid: c.categoryid,
            categoryName: c.categoryName,
            categoryDescription: c.categoryDescription
        }));
    }

    return {
        categoryid: category.categoryid,
        categoryName: category.categoryName,
        categoryDescription: category.categoryDescription
    };
};
