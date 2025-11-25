import { NextFunction, Request, Response } from "express";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { col, fn, literal, Op, where } from "sequelize";
import { Transaction } from "../models/Transaction";
import { TransactionType } from "../enums/EtransactionType";

export const getdashboardSummary = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const productCount: number = await Product.count();

        const categoryCount: number = await Category.count();

        const lowStock = await Product.count({
            where: where(
                col("quantity"),
                { [Op.lte]: col("restockLevel") }
            )
        });

        const salesCount = await Transaction.count({
            where: { type: TransactionType.OUT }
        });

        const newStockCount = await Transaction.count({
            where: { type: TransactionType.IN }
        });

        const totalSales = await Transaction.findOne({
            attributes: [
                [fn("SUM", literal(`"Transaction"."quantity" * "product"."price"`)), "totalSales"]
            ],
            include: [
                {
                    model: Product,
                    as: "product",
                    attributes: [],
                }
            ],
            where: { type: TransactionType.OUT },
            raw: true
        });

        const totalPurchase = await Transaction.findOne({
            attributes: [
                [fn("SUM", literal(`"Transaction"."quantity" * "product"."price"`)), "totalPurchase"]
            ],
            include: [
                {
                    model: Product,
                    as: "product",
                    attributes: [],
                }
            ],
            where: { type: TransactionType.IN },
            raw: true
        })


        return res.status(200).json({
            productCount,
            categoryCount,
            lowStock,
            salesCount,
            newStockCount,
            totalSales: totalSales ?? 0,
            totalPurchase: totalPurchase ?? 0,
        });

    } catch (error) {
        next(error as Error);
    }
};