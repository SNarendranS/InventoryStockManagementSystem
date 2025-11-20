import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { UserRole } from "../enums/EuserRoles"
import { toUserResponse } from "../interfaces/IUser"
import { LoginBody, RegisterBody, JWTPayload } from "../interfaces/IAuth"
const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (req: Request<{}, {}, RegisterBody>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ message: "Name, email, and password are required" });
            return;
        }
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: "User already exists." });
            return;
        }

        const newUser = await User.create({
            name,
            email,
            password,
            role: role || UserRole.EMPLOYEE,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: toUserResponse(newUser),
        });
    } catch (error: unknown) {
        next(error as Error)
    }
};

export const login = async (req: Request<{}, {}, LoginBody>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const isMatch = await user.checkPassword(password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const payload: JWTPayload = {
            userid: user.userid,
            email: user.email,
            role: user.role,
        };
        const token: string = jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            token,
            user: toUserResponse(user),
        });
    } catch (error: unknown) {
        next(error as Error)
    }
};
