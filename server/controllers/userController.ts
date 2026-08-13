import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.js";

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  try {
    const { findUserByEmail } = await import("../repository/userRepository.js");
    const user = await findUserByEmail(req.user.email);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "Profile data retrieved successfully.",
      user: {
        id: (user as any)._id ?? (user as any).id,
        name: user.name,
        email: user.email,
        role: user.role,
        skills: user.skills,
        interests: user.interests,
      },
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return res.status(500).json({ message: "Failed to retrieve profile." });
  }
};
