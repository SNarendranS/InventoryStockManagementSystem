import React from "react";
import { useGetDashboardSummaryQuery } from "../../Services/dashboardApi";
import {
    Grid,
    CircularProgress,
    Alert,
} from "@mui/material";

import GenericCard from "../../Components/GenericCard";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CategoryIcon from '@mui/icons-material/Category';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PaidIcon from '@mui/icons-material/Paid';
import { useNavigate } from "react-router-dom";

type Props = {
    onLowStockClick?: () => void;
};
const Summary: React.FC<Props> = (props) => {
    const { data, isLoading, isError, error } = useGetDashboardSummaryQuery();
    const navigate = useNavigate()

    if (isLoading)
        return <CircularProgress sx={{ margin: "4rem auto", display: "block" }} />;

    if (isError)
        return (
            <Alert severity="error">
                {(error as any)?.data?.message || "Error fetching dashboard"}
            </Alert>
        );
    const metrics = [
        { label: "Total Products", value: data?.productCount, icon: <Inventory2Icon fontSize="large" />, bg: "#E3F2FD", color: "#1976D2", onCardClick: () => navigate('/products') },
        { label: "Total Categories", value: data?.categoryCount, icon: <CategoryIcon fontSize="large" />, bg: "#F3E5F5", color: "#9C27B0", onCardClick: () => navigate('/products') },
        { label: "Low Stock Products", value: data?.lowStock, icon: <LocalShippingIcon fontSize="large" />, bg: "#FFEBEE", color: "#D32F2F", onCardClick: () => props.onLowStockClick?.() },
        { label: "Sales Count", value: data?.salesCount, icon: <ShoppingCartIcon fontSize="large" />, bg: "#E8F5E9", color: "#388E3C", onCardClick: () => navigate('/transactions') },
        { label: "Total Sales", value: `₹${data?.totalSales.toLocaleString()}`, icon: <MonetizationOnIcon fontSize="large" />, bg: "#FFF3E0", color: "#F57C00", onCardClick: () => navigate('/transactions') },
        { label: "New Stock Count", value: data?.newStockCount, icon: <AddBoxIcon fontSize="large" />, bg: "#E1F5FE", color: "#0288D1", onCardClick: () => navigate('/transactions') },
        { label: "Total Purchase", value: `₹${data?.totalPurchase.toLocaleString()}`, icon: <PaidIcon fontSize="large" />, bg: "#F3E5F5", color: "#7B1FA2", onCardClick: () => navigate('/transactions') },
    ];

    return (
        <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
            {metrics.map((metric) => (
                <Grid key={metric.label}>
                    <GenericCard
                        title={metric.label}
                        value={metric.value}
                        icon={metric.icon}
                        bgColor={metric.bg}
                        iconColor={metric.color}
                        onClick={metric.onCardClick}
                    />
                </Grid>

            ))}
        </Grid>
    );
};

export default Summary;