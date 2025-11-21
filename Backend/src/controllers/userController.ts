import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { count, rows: users } = await User.findAndCountAll({
      attributes: ["userid", "name", "email", "password", "role"]
    });
    res.status(200).json({
      count,
      users
    }
    );

  } catch (error: unknown) {
    next(error as Error)
  }
};
