import express from "express";
import {
  signUpController,
  loginController,
  logoutController,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/create", signUpController);
router.post("/login", loginController);
router.get("/logout", logoutController);
export default router;
