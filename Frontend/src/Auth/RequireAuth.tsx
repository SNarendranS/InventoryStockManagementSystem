import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../Store/store";
import { parseJwt } from "./Jwt";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = useSelector((state: RootState) => state.userToken.token);
    const location = useLocation();

    const isValid = (() => {
        if (!token) return false;
        try {
            const payload = parseJwt(token);
            if (!payload?.exp) return true; // no exp means default allow
            return payload.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    })();

    if (!isValid) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
};

export default RequireAuth;
