import { Request, Response } from "express";
import { User } from "../models/User";

// ✅ List all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: ["userid", "name", "email", "role", "createdAt", "updatedAt"],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
