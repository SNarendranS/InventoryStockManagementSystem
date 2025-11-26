import { NextFunction, Request, Response } from "express";
import { sequelize } from "../config/database";
import { Transaction } from "../models/Transaction";
import { Product } from "../models/Product";
import { TransactionCreationAttributes } from "../interfaces/ITransaction";
import { TransactionType } from "../enums/EtransactionType";

export const getAllTransactions = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const { count, rows: transactions } = await Transaction.findAndCountAll({
            include: [
                {
                    model: Product,
                    as: "product",
                    attributes: ["productName", "sku", "price", "quantity"]
                }
            ]
        });

        if (count === 0) {
            return res.status(404).json({ message: "No transactions found" });
        }

        return res.status(200).json({ count, transactions });
    } catch (error: unknown) {
        next(error as Error);
    }
};

export const getTransactionById = async (
    req: Request<{ transactionid: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { transactionid } = req.params;

        const transaction = await Transaction.findByPk(transactionid, {
            include: [
                {
                    model: Product,
                    as: "product",
                    attributes: ["productName", "sku", "price", "quantity"]
                }
            ]
        });

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        return res.status(200).json({ transaction });
    } catch (error: unknown) {
        next(error as Error);
    }
};

export const getTransactionsByProductId = async (
    req: Request<{ productid: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { productid } = req.params;

        const { count, rows: transactions } = await Transaction.findAndCountAll({
            where: { productid: productid },
            include: [
                {
                    model: Product,
                    as: "product",
                    attributes: []
                }
            ]
        });

        if (count === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        return res.status(200).json({ count, transactions });
    } catch (error: unknown) {
        next(error as Error);
    }
};

export const getTransactionsByCategoryId = async (
    req: Request<{ categoryid: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { categoryid } = req.params;

        const { count, rows: transactions } = await Transaction.findAndCountAll({
            include: [
                {
                    model: Product,
                    as: "product",
                    where: { categoryid },
                    attributes: []
                }
            ]
        });
        if (count === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        return res.status(200).json({
            count,
            transactions
        });
    } catch (error: unknown) {
        next(error as Error);
    }
};

export const createTransaction = async (
    req: Request<{}, {}, TransactionCreationAttributes>,
    res: Response,
    next: NextFunction
) => {
    const t = await sequelize.transaction();

    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            await t.rollback();
            return res.status(400).json({ message: "No data received" });
        }

        const { productid, type, quantity, note } = req.body;

        const product = await Product.findByPk(productid, { transaction: t });

        if (!product) {
            await t.rollback();
            return res.status(400).json({ message: "Invalid product ID" });
        }

        if (quantity <= 0) {
            await t.rollback();
            return res.status(400).json({ message: "Quantity must be more than 0" });
        }

        if (type === TransactionType.OUT && product.quantity < quantity) {
            await t.rollback();
            return res.status(400).json({ message: "Insufficient stock" });
        }

        const updatedQuantity =
            type === TransactionType.IN
                ? product.quantity + quantity
                : product.quantity - quantity;

        await product.update({ quantity: updatedQuantity }, { transaction: t });

        const transaction = await Transaction.create(
            { productid, type, quantity, note },
            { transaction: t }
        );

        await t.commit();

        return res.status(201).json({
            message: "Transaction created successfully",
            transaction
        });
    } catch (error: unknown) {
        await t.rollback();
        next(error as Error);
    }
};

export const updateTransaction = async (
    req: Request<{ transactionid: string }, {}, TransactionCreationAttributes>,
    res: Response,
    next: NextFunction
) => {
    const t = await sequelize.transaction();

    try {
        const { transactionid } = req.params;
        const existing = await Transaction.findByPk(transactionid, { transaction: t });

        if (!existing) {
            await t.rollback();
            return res.status(404).json({ message: "Transaction not found" });
        }

        const oldProduct = await Product.findByPk(existing.productid, { transaction: t });
        if (!oldProduct) {
            await t.rollback();
            return res.status(400).json({ message: "Associated product not found" });
        }

        let revertedQuantity =
            existing.type === TransactionType.IN
                ? oldProduct.quantity - existing.quantity
                : oldProduct.quantity + existing.quantity;

        if (revertedQuantity < 0) revertedQuantity = 0;

        await oldProduct.update({ quantity: revertedQuantity }, { transaction: t });

        const newFields = Object.fromEntries(
            Object.entries(req.body).filter(([_, v]) => v !== undefined)
        ) as Partial<TransactionCreationAttributes>;

        let targetProduct = oldProduct;

        if (newFields.productid && newFields.productid !== existing.productid) {
            const newProduct = await Product.findByPk(newFields.productid, { transaction: t });
            if (!newProduct) {
                await t.rollback();
                return res.status(400).json({ message: "Invalid product ID" });
            }
            targetProduct = newProduct;
        }

        const newType = newFields.type ?? existing.type;
        const newQty = newFields.quantity ?? existing.quantity;

        if (newQty <= 0) {
            await t.rollback();
            return res.status(400).json({ message: "Quantity must be more than 0" });
        }

        if (newType === TransactionType.OUT && targetProduct.quantity < newQty) {
            await t.rollback();
            return res.status(400).json({ message: "Insufficient stock for update" });
        }

        const newFinalQuantity =
            newType === TransactionType.IN
                ? targetProduct.quantity + newQty
                : targetProduct.quantity - newQty;

        await targetProduct.update({ quantity: newFinalQuantity }, { transaction: t });

        await existing.update(newFields, { transaction: t });

        await t.commit();

        return res.status(200).json({ message: "Transaction updated successfully" });
    } catch (error: unknown) {
        await t.rollback();
        next(error as Error);
    }
};

export const deleteTransaction = async (
    req: Request<{ transactionid: string }>,
    res: Response,
    next: NextFunction
) => {
    const t = await sequelize.transaction();

    try {
        const { transactionid } = req.params;

        const transaction = await Transaction.findByPk(transactionid, { transaction: t });
        if (!transaction) {
            await t.rollback();
            return res.status(404).json({ message: "Transaction not found" });
        }

        const product = await Product.findByPk(transaction.productid, { transaction: t });
        if (!product) {
            await t.rollback();
            return res.status(400).json({ message: "Associated product not found" });
        }

        const updatedQty =
            transaction.type === TransactionType.IN
                ? product.quantity - transaction.quantity
                : product.quantity + transaction.quantity;

        await product.update({ quantity: updatedQty }, { transaction: t });

        await transaction.destroy({ transaction: t });

        await t.commit();

        return res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error: unknown) {
        await t.rollback();
        next(error as Error);
    }
};

export const getRecentTransactionsByType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type, limit } = req.query
        if (!type || (type !== "IN" && type !== "OUT")) {
            return res.status(400).json({ message: "Invalid or missing transaction type" });
        }

        const { count, rows: transactions } = await Transaction.findAndCountAll({
            where: { type: type == "IN" ? TransactionType.IN : TransactionType.OUT },
            limit: Number(limit),
            include: [
                {
                    model: Product,
                    as: "product",
                    attributes: ["productName", "sku", "price", "quantity"]
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        if (count === 0) {
            return res.status(404).json({ message: "No transactions found" });
        }

        return res.status(200).json({ count, transactions });
    } catch (error: unknown) {
        next(error as Error);
    }
};

export const getTopDemandTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transactions = await Transaction.findAll({
            attributes: [
                "productid",
                [sequelize.fn("COUNT", sequelize.col("Transaction.transactionid")), "total_transactions"],
                [sequelize.fn("SUM", sequelize.col("Transaction.quantity")), "total_quantity"],
                [sequelize.literal(`SUM("Transaction"."quantity") * "product"."price"`), "total_sales"],
            ],
            include: [
                {
                    model: Product,
                    as: "product",
                    attributes: ["productName", "sku", "price"],
                },
            ],
            where: {
                type: "OUT",
            },
            group: ["Transaction.productid", "product.productid"],
            having: sequelize.literal(`COUNT("Transaction"."transactionid") > 1`),
            order: [[sequelize.literal("total_transactions"), "DESC"]],
            limit: 10,
        });

        if (!transactions.length) {
            return res.status(404).json({ message: "No transactions found" });
        }

        return res.status(200).json({ count:transactions.length, transactions });
    } catch (error: unknown) {
        next(error as Error);
    }
};