import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Products from "../Pages/Products/Products";
import Transactions from "../Pages/Transaction/Transactions";
import Categories from "../Pages/Category/Categories";
import AddTransaction from "../Pages/Transaction/AddTransaction";
import AddProduct from "../Pages/Products/AddProduct";
import AddCategory from "../Pages/Category/AddCategory";
import Users from "../Pages/Users/Users";
import AddUser from "../Pages/Users/AddUser";
import Profile from "../Pages/Profile";
import ReportsPage from "../Pages/ReportsPage";
import { useSelector } from "react-redux";
import type { RootState } from "../Store/store";

const Body: React.FC = () => {
    const { pathname } = useLocation();
    const user = useSelector((state: RootState) => state.userToken.user);

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
                    path="/profile"
                    element={
                        <Profile />
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
                    path={user?.role === "admin" ? "/view-employees" : "/your-team"}
                    element={
                        <Users />
                    }
                />
                <Route
                    path="/make-transaction"
                    element={
                        <AddTransaction />
                    }
                />
                <Route
                    path="/add-product"
                    element={
                        <AddProduct />
                    }
                />
                <Route
                    path="/add-category"
                    element={
                        <AddCategory />
                    }
                />
                <Route
                    path="/add-employee"
                    element={
                        <AddUser />
                    }
                />
                <Route
                    path="/reports"
                    element={
                        <ReportsPage />
                    }
                />

            </Routes>

        </Box>
    );
};

export default Body;
