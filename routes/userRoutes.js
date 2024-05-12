import express from "express";
import {
  signUpController,
  loginController,
  logoutController,
  profileController,
  updateProfileController,
  allUsersController,
} from "../controllers/userController.js";
import { isAuthorized, isAdmin } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/create", signUpController);
router.post("/login", loginController);
router.get("/profile", isAuthorized, profileController);
router.put("/profile/update", isAuthorized, updateProfileController);
router.get("/logout", logoutController);

// Admin Routes - Protected
router.get("/admin/all-users", isAuthorized, isAdmin, allUsersController);

export default router;
