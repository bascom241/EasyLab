import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { initializePayment, verifyPayment } from '../controller/paymentContoller.js';
const router = express.Router();


router.post("/initialize-payment", verifyToken,initializePayment);
router.get("/verify/:reference", verifyToken, verifyPayment);

export default router