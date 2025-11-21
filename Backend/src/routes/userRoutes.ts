import { Router } from "express";
import { getAllUsers, getEmployeesByManager } from "../controllers/userController";
import  {authMiddleware}  from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { UserRole } from "../enums/EuserRoles";

const router = Router();

router.get("/", authMiddleware, roleMiddleware([UserRole.ADMIN]), getAllUsers);
router.get("/manager/:managerid", authMiddleware, roleMiddleware([UserRole.ADMIN,UserRole.MANAGER]), getEmployeesByManager);
router.delete("/:userid", authMiddleware, roleMiddleware([UserRole.ADMIN]), getEmployeesByManager);

export default router;
