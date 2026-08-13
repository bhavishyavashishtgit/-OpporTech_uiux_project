import { Request, Response } from "express";
import mongoose from "mongoose";
import { getUseMemoryFallback } from "../repository/userRepository.js";

const connectionStates: Record<number, string> = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

export const getHealth = (_req: Request, res: Response) => {
  const dbState = mongoose.connection.readyState;

  return res.status(200).json({
    status: "ok",
    uptimeSeconds: process.uptime(),
    environment: process.env.NODE_ENV ?? "development",
    timestamp: new Date().toISOString(),
    database: {
      state: connectionStates[dbState] ?? "unknown",
      isFallback: getUseMemoryFallback(),
    },
  });
};
