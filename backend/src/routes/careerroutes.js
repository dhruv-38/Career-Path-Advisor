import express from "express";
import protectRoute from "../middlewares/authmiddlewares.js";
import { getCareerRecommendations } from "../controllers/careercontrollers.js";

const router = express.Router();

// Protected route for career recommendations
router.get("/recommendations", protectRoute, getCareerRecommendations);

export default router;
