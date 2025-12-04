import { Router } from "express";
import { deleteUser, getAllUsers, getEmployeesByManager,getAllManagers, getUser } from "../controllers/userController";
import  {authMiddleware}  from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { UserRole } from "../enums/EuserRoles";

const router = Router();

router.get("/", authMiddleware, roleMiddleware([UserRole.ADMIN]), getAllUsers);
router.get("/id/:userid", authMiddleware, roleMiddleware([UserRole.ADMIN]), getUser);
router.get("/manager", authMiddleware, roleMiddleware([UserRole.ADMIN]), getAllManagers);
router.get("/manager/:managerid", authMiddleware, roleMiddleware([UserRole.ADMIN,UserRole.MANAGER]), getEmployeesByManager);
router.delete("/:userid", authMiddleware, roleMiddleware([UserRole.ADMIN]), deleteUser);

export default router;
