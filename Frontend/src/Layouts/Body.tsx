import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Products from "../Pages/Products";
import Transactions from "../Pages/Transactions";
import Categories from "../Pages/Categories";
import AddTransaction from "../Pages/AddTransaction";

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
                    path="/categories"
                    element={
                        <Categories />
                    }
                />
                <Route
                    path="/transactions"
                    element={
                        <Transactions />
                    }
                />
                <Route
                    path="/create-transaction"
                    element={
                        <AddTransaction />
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
