import express from "express";
import protectRoute from "../middlewares/authmiddlewares.js";
import { getUserProfile, updateUserProfile } from "../controllers/usercontrollers.js";


const router = express.Router();

router.get("/profile", protectRoute, getUserProfile);
router.put("/profile", protectRoute, updateUserProfile);

export default router;
