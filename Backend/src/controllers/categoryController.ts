import { NextFunction, Request, Response } from "express";
import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { CategoryCreationAttributes } from "../interfaces/ICategory";
import { sequelize } from "../config/database";
import { count } from "console";


export const getAllCategory = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.findAll({
            attributes: [
                "categoryid",
                "categoryName",
                "categoryDescription",
                "categoryPrefix",
                "createdAt",
                [sequelize.fn("COUNT", sequelize.col("products.productid")), "productCount"]
            ],
            include: [
                {
                    model: Product,
                    attributes: [],
                    as:"products",
                    required: false
                }
            ],
            group: ["Category.categoryid"],
            order: [["categoryid", "ASC"]]
        });

        return res.status(200).json({ count:categories.length, categories });

    } catch (error: unknown) {
        next(error as Error);
    }
};


export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryid } = req.params;

 const category = await Category.findOne({
            attributes: [
                "categoryid",
                "categoryName",
                "categoryDescription",
                "categoryPrefix",
                "createdAt",
                [sequelize.fn("COUNT", sequelize.col("products.productid")), "productCount"]
            ],
            include: [
                {
                    model: Product,
                    attributes: [],
                    as:"products",
                    required: false
                }
            ],
            group: ["Category.categoryid"],
            order: [["categoryid", "ASC"]],
            where:{categoryid}
        });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({ category });
    } catch (error: unknown) {
        next(error as Error);
    }
};

export const createCategory = async (
    req: Request<{}, {}, CategoryCreationAttributes>,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log(req.body)
        const { categoryName, categoryPrefix, categoryDescription } = req.body;

        if (!categoryName) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const category = await Category.create({
            categoryName,
            categoryPrefix,
            categoryDescription
        });

        return res.status(201).json({
            message: "Category created successfully",
            category
        });
    } catch (error: unknown) {
        console.log(error)

        next(error as Error);
    }
};

export const updateCategory = async (
    req: Request<{ categoryid: string }, {}, CategoryCreationAttributes>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { categoryid } = req.params;

        const updateData = Object.fromEntries(
            Object.entries(req.body).filter(([_, v]) => v !== undefined)
        );

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No data received to update" });
        }

        const [updatedRows] = await Category.update(updateData, {
            where: { categoryid }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({ message: "Category updated successfully" });
    } catch (error: unknown) {
        next(error as Error);
    }
};

export const deleteCategory = async (
    req: Request<{ categoryid: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { categoryid } = req.params;
        const products = await Product.findAll({ where: { categoryid } });

        if (products.length > 0) {
            return res.status(409).json({
                message: "Cannot delete category: products are referencing this category"
            });
        }

        const deleted = await Category.destroy({ where: { categoryid } });

        if (deleted === 0) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error: unknown) {
        next(error as Error);
    }
};