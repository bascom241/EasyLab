import express from 'express';
import {registerSample,getRegsteredSample,getSample,updateSample,searchSample,deleteSample,getNotifications,deleteNotification, createIssue,getIssues, fetchReports, markNotification} from '../controller/registerSampleController.js';
import verifyToken from '../middleware/verifyToken.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { checkimit } from '../middleware/sampleLimit.js';
const router = express.Router();


router.post("/register-sample", verifyToken,authorizeRoles("admin", "receptionist"),checkimit,registerSample);
router.patch("/update-sample/:id",verifyToken, authorizeRoles("admin"),updateSample)
router.get("/samples",getRegsteredSample);
router.get("/sample/:id",getSample);
router.get("/search",searchSample);
router.delete("/delete-sample/:id",verifyToken, authorizeRoles("admin"),deleteSample)
router.get("/notifications",verifyToken,authorizeRoles("admin", "receptionist"),getNotifications)
router.delete("/delete-notification/:id",verifyToken,authorizeRoles("admin"),deleteNotification)
router.patch("/update-notification/:id", verifyToken,authorizeRoles("admin"),markNotification )
// Issues Router
router.post("/create-issue",verifyToken,authorizeRoles("admin"),createIssue)
router.get("/issues",verifyToken,authorizeRoles("admin"),getIssues);
router.get("/reports", verifyToken, authorizeRoles("admin"),fetchReports )
export default router;