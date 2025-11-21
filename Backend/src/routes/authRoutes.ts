import { Router } from "express";
import { register, login } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { UserRole } from "../enums/EuserRoles";

const router = Router();

router.post("/register",authMiddleware,roleMiddleware([UserRole.ADMIN]), register);
router.post("/login", login);

export default router;
