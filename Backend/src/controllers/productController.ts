import { NextFunction, Request, Response } from "express";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { ProductCreationAttributes } from "../interfaces/IProduct";

export const getAllProducts = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const { count, rows: products } = await Product.findAndCountAll({
            attributes: [
                "productid",
                "productName",
                "productDescription",
                "sku",
                "price",
                "quantity",
                "categoryid"
            ],
            include: [{
                model: Category,
                as: "category",
                attributes: ["categoryName"]
            }],
        });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        return res.status(200).json({ count: products.length, products });
    } catch (error) {
        next(error as Error);
    }
};

export const getProductById = async (req: Request<{ productid: string }, {}, {}>, res: Response, next: NextFunction) => {
    try {
        const { productid } = req.params;

        const product = await Product.findByPk(productid, {
            attributes: [
                "productid",
                "productName",
                "productDescription",
                "sku",
                "price",
                "quantity",
                "categoryid"
            ],
            include: [{
                model: Category,
                as: "category",
                attributes: ["categoryName"]
            }],
        });
        if (!product) {
            return res.status(404).json({ message: "No product found" });
        }

        return res.status(200).json({ product });
    } catch (error: unknown) {
        next(error as Error);
    }
};

export const getAllProductsByCategoryId = async (req: Request<{ categoryid: string }, {}, {}>, res: Response, next: NextFunction) => {
    try {
        const { categoryid } = req.params
        const { count, rows: products } = await Product.findAndCountAll({
            attributes: [
                "productid",
                "productName",
                "productDescription",
                "sku",
                "price",
                "quantity",
                "categoryid"
            ],
            where: { categoryid },
            include: [{
                model: Category,
                as: "category",
                attributes: ["categoryName"]
            }],
        });

        return res.status(200).json({ count, products });
    } catch (error: unknown) {
        next(error as Error);
    }
};

export const createProduct = async (
    req: Request<{}, {}, ProductCreationAttributes>,
    res: Response,
    next: NextFunction
) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data received" });
        }

        const { productName, productDescription, sku, price, quantity, categoryid } = req.body;

        if (!productName || !sku || price == null || quantity == null) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const category = await Category.findByPk(categoryid);
        if (!category) {
            return res.status(400).json({ message: "Invalid category ID" });
        }
        const product = await Product.create({
            productName,
            productDescription,
            sku,
            price,
            quantity,
            categoryid
        });

        return res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (error: unknown) {
        next(error as Error);
    }
};

export const createBulkProducts = async (
    req: Request<{}, {}, ProductCreationAttributes[]>,
    res: Response,
    next: NextFunction
) => {
    try {
        const products = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "No data received" });
        }

        const categoryIds = [...new Set(products.map(p => p.categoryid).filter(id => id !== undefined))];

        const existingCategories = await Category.findAll({
            where: { categoryid: categoryIds }
        });
        const existingCategoryIds = new Set(existingCategories.map(c => c.categoryid));

        const validProducts: ProductCreationAttributes[] = [];
        const errors: Record<string, string[]> = {};

        for (const p of products) {
            const pErrors: string[] = [];

            if (!p.productName) pErrors.push("Missing productName");
            if (!p.sku) pErrors.push("Missing sku");
            if (p.price == null) pErrors.push("Missing price");
            if (p.quantity == null) pErrors.push("Missing quantity");

            if (p.categoryid != null && !existingCategoryIds.has(p.categoryid)) {
                pErrors.push("Invalid category ID");
            }

            if (pErrors.length > 0) {
                errors[p.productName ?? "unknown"] = pErrors;
            } else {
                validProducts.push(p);
            }
        }

        const created = await Product.bulkCreate(validProducts);

        return res.status(201).json({
            message: "Bulk product creation completed",
            createdCount: created.length,
            failedCount: Object.keys(errors).length,
            errors,
            created
        });
    } catch (error: unknown) {
        next(error as Error);
    }
};

export const updateProduct = async (
    req: Request<{ productid: string }, {}, ProductCreationAttributes>,
    res: Response,
    next: NextFunction
) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data received to update" });
        }

        const { productid } = req.params;
        const fieldsToUpdate:Partial<ProductCreationAttributes> = Object.fromEntries(
            Object.entries(req.body).filter(([_, value]) => value !== undefined)
        );

        // If category is updated, validate it
        if (fieldsToUpdate.categoryid) {
            const category = await Category.findByPk(fieldsToUpdate.categoryid);
            if (!category) {
                return res.status(400).json({ message: "Invalid category ID" });
            }
        }

        const [updatedRows] = await Product.update(fieldsToUpdate, {
            where: { productid }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        next(error as Error);
    }
};

export const deleteProduct = async (
    req: Request<{ productid: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { productid } = req.params;

        const deleted = await Product.destroy({ where: { productid } });

        if (deleted === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error: unknown) {
        next(error as Error);
    }
};