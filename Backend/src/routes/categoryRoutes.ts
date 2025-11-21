import { Router } from "express";
import { createCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from "../controllers/categoryController";
import { UserRole } from "../enums/EuserRoles";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();

router.get("/", getAllCategory);
router.get("/:categoryid", getCategoryById);
router.post("/", authMiddleware, roleMiddleware([UserRole.ADMIN]), createCategory);
router.put("/:categoryid", authMiddleware, roleMiddleware([UserRole.ADMIN, UserRole.EMPLOYEE]), updateCategory);
router.delete("/:categoryid", authMiddleware, roleMiddleware([UserRole.ADMIN]), deleteCategory);

export default router;