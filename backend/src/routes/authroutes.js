import express from "express";
import { registerUser } from "../controllers/authcontrollers.js";
import {loginUser} from "../controllers/authcontrollers.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login",loginUser);

export default router;
