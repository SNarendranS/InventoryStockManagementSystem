import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getdashboardSummary } from "../controllers/dashboardController";

const router = Router();

router.get("/summary",authMiddleware, getdashboardSummary);

export default router;