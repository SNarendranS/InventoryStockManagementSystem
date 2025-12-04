import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import { UserRole } from "../enums/EuserRoles";

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { count, rows: users } = await User.findAndCountAll({
      attributes: ["userid", "name", "email", "role", "managerid", "createdAt"],
      include: [{ model: User, as: "manager", attributes: ["name", "email", "role"] }],
      order: [["createdAt", "DESC"]]
    });
    res.status(200).json({
      count,
      users
    }
    );

  } catch (error: unknown) {
    console.log(error)
    next(error as Error)
  }
};
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {userid}=req.params
    const user  = await User.findOne({
      where:{userid},
      attributes: ["userid", "name", "email", "role", "managerid", "createdAt"],
      include: [{ model: User, as: "manager", attributes: ["name", "email", "role"] }],
      order: [["createdAt", "DESC"]]
    });
    res.status(200).json({
      user
    }
    );

  } catch (error: unknown) {
    console.log(error)
    next(error as Error)
  }
};
export const getAllManagers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { count, rows: users } = await User.findAndCountAll({
      attributes: ["userid", "name", "email", "role", "managerid", "createdAt"],
      include: [{ model: User, as: "manager", attributes: ["name", "email", "role"] }],
      order: [["createdAt", "DESC"]],
      where:{role:[UserRole.ADMIN,UserRole.MANAGER]}
    });
    res.status(200).json({
      count,
      users
    }
    );

  } catch (error: unknown) {
    console.log(error)
    next(error as Error)
  }
};
export const getEmployeesByManager = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { managerid } = req.params
    const { count, rows: users } = await User.findAndCountAll({
      attributes: ["userid", "name", "email", "role", "createdAt"],
      include: [{ model: User, as: "manager", attributes: ["name", "email", "role"] }],
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