import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Products from "../Pages/Products";
import Transactions from "../Pages/Transactions";
import Categories from "../Pages/Categories";
import AddTransaction from "../Pages/AddTransaction";

const Reports = () => <h1>Reports</h1>;

const Body: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0)

    }, [pathname]);
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
                    path="/view-products"
                    element={
                        <Products />
                    }
                />
                <Route
                    path="/view-categories"
                    element={
                        <Categories />
                    }
                />
                <Route
                    path="/view-transactions"
                    element={
                        <Transactions />
                    }
                />
                <Route
                    path="/make-transaction"
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
