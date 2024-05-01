import express from "express";
import {
  addOrderItemsController,
  getMyOrdersController,
  getAllOrdersController,
  getOrderByIdController,
} from "../controllers/orderController.js";
import { isAdmin, isAuthorized } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/new", isAuthorized, addOrderItemsController);
router.post("/my-orders", isAuthorized, getMyOrdersController);
router.post("/order/:id", isAuthorized, getOrderByIdController);

router.post("/admin/all-orders", isAuthorized, isAdmin, getAllOrdersController);

export default router;
