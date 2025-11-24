import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
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
                        <Dashboard />
                    }
                />
                <Route
                    path="/products"
                    element={
                        <Products />
                    }
                />
                <Route
                    path="/stock"
                    element={
                        <Stock />
                    }
                />
                <Route
                    path="/transactions"
                    element={
                        <Transactions />
                    }
                />
                <Route
                    path="/reports"
                    element={
                        <Reports />
                    }
                />
            </Routes>

        </Box>
    );
};

export default Body;
