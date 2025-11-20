import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";

// ✅ List all users
export const getAllUsers = async (_req: Request, res: Response,next:NextFunction) => {
  try {
    const users = await User.findAll({
      attributes: ["userid", "name", "email", "role", "createdAt", "updatedAt"],
    });
    res.json(users);
  } catch (error) {
    next(error)
  }
};
