import { Router } from "express";
import * as userControllers from "../controllers/user-controller.js";
const router = Router();

router.post("/register", userControllers.registerUser);
router.post("/verify", userControllers.verification);
router.post("/login", userControllers.loginUser);
router.post("/forgot-password", userControllers.forgotPassword);

export default router;