import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import User, { IUser } from "../models/User.js";

let useMemoryFallback = false;

export const setUseMemoryFallback = (value: boolean) => {
  useMemoryFallback = value;
};

export const getUseMemoryFallback = () => useMemoryFallback;

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  password: string;
  skills: string[];
  interests: string[];
  role: "user" | "admin";
};

const memoryUsers: UserRecord[] = [];

export const findUserByEmail = async (email: string): Promise<IUser | UserRecord | null> => {
  if (!useMemoryFallback) {
    return User.findOne({ email });
  }

  return memoryUsers.find((user) => user.email === email) ?? null;
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  skills: string[];
  interests: string[];
  role: "user" | "admin";
}): Promise<IUser | UserRecord> => {
  if (!useMemoryFallback) {
    const user = new User(data);
    return user.save();
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user: UserRecord = {
    id: randomUUID(),
    name: data.name,
    email: data.email,
    password: hashedPassword,
    skills: data.skills,
    interests: data.interests,
    role: data.role,
  };

  memoryUsers.push(user);
  return user;
};

export const comparePassword = async (candidatePassword: string, user: IUser | UserRecord) => {
  if (!useMemoryFallback && typeof (user as IUser).comparePassword === "function") {
    return (user as IUser).comparePassword(candidatePassword);
  }

  return bcrypt.compare(candidatePassword, user.password);
};
