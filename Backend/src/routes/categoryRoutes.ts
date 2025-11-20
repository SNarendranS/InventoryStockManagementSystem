import { Router } from "express";
import { createCategory, getAllCategory, updateCategory } from "../controllers/categoryController";
import { UserRole } from "../enums/EuserRoles";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();

router.get("/", getAllCategory);
router.post("/",authMiddleware, roleMiddleware([UserRole.ADMIN]), createCategory);
router.put("/:categoryid",authMiddleware, roleMiddleware([UserRole.ADMIN]), updateCategory);

export default router;