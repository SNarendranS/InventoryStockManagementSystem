import { NextFunction, Request, Response } from "express";
import { Category } from "../models/Category";
import { categoryBody, toCategoryResponse } from "../interfaces/ICategory";

export const getAllCategory = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const categories = await Category.findAll();
        res.json(toCategoryResponse(categories));
    } catch (error: unknown) {
        next(error as Error)
    }
};

export const createCategory = async (req: Request<{}, {}, categoryBody>, res: Response, next: NextFunction): Promise<void> => {

    try {
        if (!req.body.categoryName) {
            res.status(400).json({ message: "no data recevied" });
        }

        const { categoryName, categoryDescription } = req.body;

        const category = await Category.create({
            categoryName, categoryDescription
        });

        res.status(201).json({
            message: "Category created successfully",
            category: toCategoryResponse(category),
        });
    } catch (error: unknown) {
        next(error as Error)
    }
};

export const updateCategory = async (req: Request<{ categoryid: string }, {}, categoryBody>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const categoryid = Number(req.params.categoryid);
        const { categoryName, categoryDescription } = req.body;

        if (!categoryName && !categoryDescription) {
            res.status(400).json({ message: "No data received to update" });
            return;
        }

        const [updatedRows] = await Category.update(
            { categoryName, categoryDescription },
            { where: { categoryid } }
        );

        if (updatedRows === 0) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json({ message: "Category updated successfully", });
    } catch (error: unknown) {
        next(error as Error);
    }
};