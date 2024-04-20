import express from "express";
import {
  createProductController,
  allProductsController,
  singleProductController,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create", createProductController);

router.get("/all", allProductsController);
router.get("/:id", singleProductController);
export default router;
