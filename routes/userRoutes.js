import express from "express";
import {
  signUpController,
  loginController,
  logoutController,
  profileController,
  updateProfileController,
} from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/create", signUpController);
router.post("/login", loginController);
router.get("/profile", isAuthorized, profileController);
router.post("/profile/update", isAuthorized, updateProfileController);
router.get("/logout", logoutController);
export default router;
