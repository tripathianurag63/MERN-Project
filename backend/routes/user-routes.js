import { Router } from "express";
import * as userControllers from "../controllers/user-controller.js";
import { isAuthenticated } from "../middleware/auth-middleware.js";

const router = Router();

router.post("/register", userControllers.registerUser);
router.post("/verify", userControllers.verification);
router.post("/login", userControllers.loginUser);
router.post("/forgot-password", userControllers.forgotPassword);
router.post("/verify-otp/:email", userControllers.verifyOtp);
router.post("/confirm-password/:email", userControllers.confirmPassword);

router.post("/logout", isAuthenticated, userControllers.logout);


export default router;