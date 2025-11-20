import { Request, Response, NextFunction } from "express";

interface ErrorWithStatus extends Error {
    statusCode?: number;
}

export const errorHandler = (
    err: ErrorWithStatus,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    const status = err.statusCode || 500;

    console.error("Error:", err.message);

    res.status(status).json({
        success: false,
        message: err.message+"error middle" || "Internal server error",
    });
};