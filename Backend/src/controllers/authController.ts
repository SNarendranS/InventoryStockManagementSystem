import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { UserRole } from "../enums/EuserRoles"
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Register new user
export const register = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) return res.status(400).json({ message: "Name, email, and password are required" });
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: "User already exists." });

        const newUser = await User.create({
            name,
            email,
            password: password,
            role: role || UserRole.EMPLOYEE,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: { userid: newUser.userid, name: newUser.name, email: newUser.email, role: newUser.role },
        });
    } catch (error) {
        next(error)
    }
};

// ✅ Login
export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await user.checkPassword(password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { userid: user.userid, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            token,
            user: { userid: user.userid, name: user.name, email: user.email, role: user.role },
        });
    } catch (error) {
        next(error)
    }
};
