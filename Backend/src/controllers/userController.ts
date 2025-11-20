import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import { toUserResponse } from "../interfaces/IUser";

export const getAllUsers = async (_req: Request, res: Response,next:NextFunction) => {
  try {
    const users = await User.findAll({
      attributes: ["userid", "name", "email", "role", "createdAt", "updatedAt"],
    });

    res.json(toUserResponse(users));
  } catch (error:unknown) {
    next(error as Error)
  }
};
