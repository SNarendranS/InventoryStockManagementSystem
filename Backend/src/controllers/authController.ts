import { Request, Response } from "express";
import { User, UserRole } from "../models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// ✅ Register new user
export const register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    try {
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
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Login
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await user.checkPassword(password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { userid: user.userid, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            token,
            user: { userid: user.userid, name: user.name, email: user.email, role: user.role },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
