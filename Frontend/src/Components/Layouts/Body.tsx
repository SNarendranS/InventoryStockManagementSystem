import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import RequireAuth from "../../Auth/RequireAuth";
import Products from "../Pages/Products";
import Transactions from "../Pages/Transactions";

const Dashboard = () => <h1>Dashboard</h1>;
const Stock = () => <h1>Stock</h1>;
const Reports = () => <h1>Reports</h1>;

const Body: React.FC = () => {
    return (
        <Box
            sx={{
                p: 3,
                display: 'flex',
                justifyContent: 'center',
                minHeight: "calc(100vh - 64px)",
                backgroundColor: "#f9f9f9"
            }}
        >
            <Routes>
                <Route
                    path="/dashboard"
                    element={
                        <RequireAuth>
                            <Dashboard />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <RequireAuth>
                            <Products />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/stock"
                    element={
                        <RequireAuth>
                            <Stock />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/transactions"
                    element={
                        <RequireAuth>
                            <Transactions />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/reports"
                    element={
                        <RequireAuth>
                            <Reports />
                        </RequireAuth>
                    }
                />
            </Routes>

        </Box>
    );
};

export default Body;
