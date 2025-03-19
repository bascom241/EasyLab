import express from 'express';
import {register, verifyEmail,login,forgotPassword,resetPassword,checkAuth} from '../controller/AuthController.js';
import verifyToken from '../middleware/verifyToken.js';
const router = express.Router();

router.post("/create-account", register );
router.post("/verify-email", verifyEmail)
router.post("/login", login );
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword);
router.get("/check-auth", verifyToken,checkAuth);

export default router;