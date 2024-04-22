import express from "express";
import {
  createProductController,
  allProductsController,
  singleProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController.js";
import { isAuthorized } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/create", createProductController);
router.put("/update/:id", updateProductController);
router.delete("/delete/:id", deleteProductController);

router.get("/all", isAuthorized, allProductsController);
router.get("/product/:id", singleProductController);
export default router;
