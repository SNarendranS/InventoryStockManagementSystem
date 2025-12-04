import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import { UserRole } from "../enums/EuserRoles";
import { UserCreationAttributes } from "../interfaces/IUser";

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
    const { userid } = req.params
    const user = await User.findOne({
      where: { userid },
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
      where: { role: [UserRole.ADMIN, UserRole.MANAGER] }
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

export const updateUser = async (
  req: Request<{ userid: string }, {}, UserCreationAttributes>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data received to update" });
    }

    const { userid } = req.params;
    const fieldsToUpdate: Partial<UserCreationAttributes> = Object.fromEntries(
      Object.entries(req.body).filter(([_, value]) => value !== undefined)
    );

    const [updatedRows] = await User.update(fieldsToUpdate, {
      where: { userid }
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    next(error as Error);
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