import express from "express";
import { signUpController } from "../controllers/userController.js";

const router = express.Router();

router.post("/create", signUpController);
export default router;
