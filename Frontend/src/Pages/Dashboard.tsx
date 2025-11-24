import React from "react";
import { useGetDashboardSummaryQuery } from "../Services/dashboardApi";
import {
    Grid,
    Card,
    Typography,
    CircularProgress,
    Alert,
    Box,
} from "@mui/material";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CategoryIcon from '@mui/icons-material/Category';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PaidIcon from '@mui/icons-material/Paid';

const Dashboard: React.FC = () => {
    const { data, isLoading, isError, error } = useGetDashboardSummaryQuery();

    if (isLoading)
        return <CircularProgress sx={{ margin: "4rem auto", display: "block" }} />;

    if (isError)
        return <Alert severity="error">{(error as any)?.data?.message || "Error fetching dashboard"}</Alert>;

    const metrics = [
        { label: "Total Products", value: data?.productCount, icon: <Inventory2Icon fontSize="large" />, bg: "#E3F2FD", color: "#1976D2" },
        { label: "Total Categories", value: data?.categoryCount, icon: <CategoryIcon fontSize="large" />, bg: "#F3E5F5", color: "#9C27B0" },
        { label: "Low Stock Products", value: data?.lowStock, icon: <LocalShippingIcon fontSize="large" />, bg: "#FFEBEE", color: "#D32F2F" },
        { label: "Sales Count", value: data?.salesCount, icon: <ShoppingCartIcon fontSize="large" />, bg: "#E8F5E9", color: "#388E3C" },
        { label: "New Stock Count", value: data?.newStockCount, icon: <AddBoxIcon fontSize="large" />, bg: "#E1F5FE", color: "#0288D1" },
        { label: "Total Sales", value: `₹${data?.totalSales.toLocaleString()}`, icon: <MonetizationOnIcon fontSize="large" />, bg: "#FFF3E0", color: "#F57C00" },
        { label: "Total Purchase", value: `₹${data?.totalPurchase.toLocaleString()}`, icon: <PaidIcon fontSize="large" />, bg: "#F3E5F5", color: "#7B1FA2" },
    ];

    return (
        <Box sx={{ padding: 4, width:"100%", background:"rgba(194, 194, 194, 0.07)"}}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                Dashboard
            </Typography>
            <Grid container spacing={3} sx={{display:"flex",justifyContent:"center"}}>
                {metrics.map((metric) => (
                    <Grid key={metric.label}>
                        <Card
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: 2,
                                transition: "0.3s",
                                ":hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: 60,
                                    height: 60,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "50%",
                                    background: metric.bg,
                                    color: metric.color,
                                    mr: 2,
                                    fontSize: "1.5rem",
                                }}
                            >
                                {metric.icon}
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight="bold">
                                    {metric.value}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary">
                                    {metric.label}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Dashboard;
