import { Router } from "express";
import { getAllUsers } from "../controllers/userController";
import  {authMiddleware}  from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { UserRole } from "../enums/EuserRoles";

const router = Router();

router.get("/", authMiddleware, roleMiddleware([UserRole.ADMIN, UserRole.MANAGER]), getAllUsers);

export default router;
