import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthTokenPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthTokenPayload;
}

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

export const verifyToken: RequestHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = typeof authHeader === "string" && authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      iat: decoded.iat,
      exp: decoded.exp,
    };
    return next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
