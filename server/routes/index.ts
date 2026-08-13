import express from "express";
import authRoutes from "./auth.js";
import healthRoutes from "./health.js";
import userRoutes from "./user.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/health", healthRoutes);

export default router;
