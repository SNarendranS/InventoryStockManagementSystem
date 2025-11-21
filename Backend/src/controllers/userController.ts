import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { count, rows: users } = await User.findAndCountAll({
      attributes: ["userid", "name", "email", "role"],
      include: [{ model: User, as: "manager", attributes: ["userid", "name", "email"] }]
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

export const getEmployeesByManager = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { managerid } = req.params
    const { count, rows: users } = await User.findAndCountAll({
      attributes: ["userid", "name", "email", "password", "role"],
      where: { managerid }
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

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userid } = req.params
    const count = await User.destroy({
      where: { userid }
    });
    if (count === 0) {
      res.status(400).json({ message: "user not found" })
    }
    res.status(200).json({
      message: "Deleted user successfully"
    }
    );

  } catch (error: unknown) {
    next(error as Error)
  }
};