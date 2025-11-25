import { Router } from "express";
import {
    getAllTransactions,
    getTransactionById,
    getTransactionsByProductId,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByCategoryId,
    getRecentTransactionsByType
} from "../controllers/transactionController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getAllTransactions);
router.get("/:transactionid", getTransactionById);
router.get("/product/:productid", getTransactionsByProductId);
router.get("/category/:categoryid", getTransactionsByCategoryId);
router.post("/",authMiddleware, createTransaction);
router.put("/:transactionid",authMiddleware, updateTransaction);
router.delete("/:transactionid",authMiddleware, deleteTransaction);
router.get("/recent/desc", getRecentTransactionsByType);

export default router;
