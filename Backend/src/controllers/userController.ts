import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import { UserResponseTemplate } from "../interfaces/IUser";

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { count, rows:users} = await User.findAndCountAll({
      attributes: UserResponseTemplate,
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
