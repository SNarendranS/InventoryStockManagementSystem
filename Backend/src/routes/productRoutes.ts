import { Router } from "express";
import { createBulkProducts, createProduct, deleteProduct, getAllProducts, getAllProductsByCategoryId, getLowStockProducts, getProductById, updateProduct } from "../controllers/productController";
import { UserRole } from "../enums/EuserRoles";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();

router.get("/", getAllProducts);
router.get("/:productid", getProductById);
router.get("/category/:categoryid", getAllProductsByCategoryId);
router.post("/", authMiddleware, roleMiddleware([UserRole.ADMIN]), createProduct);
router.post("/bulk", authMiddleware, roleMiddleware([UserRole.ADMIN]), createBulkProducts);
router.put("/:productid", authMiddleware, roleMiddleware([UserRole.ADMIN,UserRole.MANAGER]), updateProduct);
router.delete("/:productid", authMiddleware, roleMiddleware([UserRole.ADMIN]), deleteProduct);
router.get("/stock/low",authMiddleware, getLowStockProducts);

export default router;