import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", verifyToken, getProfile);

export default router;
