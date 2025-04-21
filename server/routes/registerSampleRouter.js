import express from 'express';
import {registerSample,getRegsteredSample,getSample,updateSample,searchSample} from '../controller/registerSampleController.js';
import verifyToken from '../middleware/verifyToken.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
const router = express.Router();


router.post("/register-sample", verifyToken,authorizeRoles("admin", "receptionist"),registerSample);
router.patch("/update-sample/:id",verifyToken, authorizeRoles("admin"),updateSample)
router.get("/samples",getRegsteredSample);
router.get("/sample/:id",getSample);
router.get("/search",searchSample)

export default router;