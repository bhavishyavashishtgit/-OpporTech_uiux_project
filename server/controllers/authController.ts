import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, comparePassword } from "../repository/userRepository.js";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

const isDuplicateEmailError = (error: unknown): boolean => {
  return (
    typeof error === "object" &&
    error !== null &&
    (("code" in error && (error as any).code === 11000) ||
      (("name" in error && (error as any).name === "MongoServerError") &&
        ("code" in error && (error as any).code === 11000)))
  );
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, skills = [], interests = [], role = "user" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Invalid input types." });
    }

    if (!Array.isArray(skills) || !skills.every((item) => typeof item === "string")) {
      return res.status(400).json({ message: "Skills must be an array of strings." });
    }

    if (!Array.isArray(interests) || !interests.every((item) => typeof item === "string")) {
      return res.status(400).json({ message: "Interests must be an array of strings." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await findUserByEmail(normalizedEmail);

    if (existingUser) {
      return res.status(409).json({ message: "A user with that email already exists." });
    }

    await createUser({
      name: name.trim(),
      email: normalizedEmail,
      password,
      skills,
      interests,
      role: role === "admin" ? "admin" : "user",
    });

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    if (isDuplicateEmailError(error)) {
      console.error("Duplicate signup error:", error);
      return res.status(409).json({ message: "A user with that email already exists." });
    }

    console.error("Signup error:", error);
    return res.status(500).json({ message: error instanceof Error ? error.message : "An unexpected error occurred." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await comparePassword(password, user);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: (user as any)._id?.toString?.() ?? (user as any).id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      token,
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
    console.error("Login error:", error);
    return res.status(500).json({ message: error instanceof Error ? error.message : "An unexpected error occurred." });
  }
};
