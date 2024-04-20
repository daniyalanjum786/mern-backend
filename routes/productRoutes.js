import express from "express";
import {
  createProductController,
  allProductsController,
  singleProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create", createProductController);
router.put("/update/:id", updateProductController);
router.delete("/delete/:id", deleteProductController);

router.get("/all", allProductsController);
router.get("/product/:id", singleProductController);
export default router;
