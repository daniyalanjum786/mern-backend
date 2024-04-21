import express from "express";
import {
  signUpController,
  loginController,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/create", signUpController);
router.post("/login", loginController);
export default router;
