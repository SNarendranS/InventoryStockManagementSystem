import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getdashboardSummary, getLowStockProducts } from "../controllers/dashboardController";

const router = Router();

router.get("/summary",authMiddleware, getdashboardSummary);
router.get("/low-stock",authMiddleware, getLowStockProducts);

export default router;