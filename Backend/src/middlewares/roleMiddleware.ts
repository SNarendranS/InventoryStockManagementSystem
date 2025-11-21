import { Response, NextFunction } from "express";
import { UserRole } from "../enums/EuserRoles";
import { AuthRequest } from "../interfaces/IAuth";

export const roleMiddleware = (roles: UserRole[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        if (!roles.includes(req.user.role as UserRole)) {
            return res.status(403).json({ message: "Access denied: insufficient role" });
        }

        next();
    };
};
