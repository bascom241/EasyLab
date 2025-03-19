import express from 'express';
import registerSample from '../controller/registerSampleController.js';
import verifyToken from '../middleware/verifyToken.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
const router = express.Router();


router.post("/register-sample", verifyToken,authorizeRoles("admin", "receptionist"),registerSample);

export default router;