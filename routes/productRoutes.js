import express from "express";
import {
  createProductController,
  allProductsController,
  singleProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController.js";
import { isAuthorized, isAdmin } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/admin/create", isAuthorized, isAdmin, createProductController);
router.put("/admin/update/:id", isAuthorized, isAdmin, updateProductController);
router.delete(
  "/admin/delete/:id",
  isAuthorized,
  isAdmin,
  deleteProductController
);

router.get("/all", allProductsController);
router.get("/product/:id", singleProductController);
export default router;
