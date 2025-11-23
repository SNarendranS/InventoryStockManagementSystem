import { Router } from "express";
import {
    getAllTransactions,
    getTransactionById,
    getTransactionsByProductId,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByCategoryId
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

export default router;
