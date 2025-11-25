import React from "react";
import { Grid, CircularProgress, Alert } from "@mui/material";
import GenericCard from "../../Components/GenericCard";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CategoryIcon from '@mui/icons-material/Category';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PaidIcon from '@mui/icons-material/Paid';
import { useNavigate } from "react-router-dom";
import { useGetDashboardSummaryQuery } from "../../Services/dashboardApi";

type Props = {
    onLowStockClick?: () => void;
    inTransactionClick?: () => void;
    outTransactionClick?: () => void;
};

const Summary: React.FC<Props> = ({ onLowStockClick, inTransactionClick, outTransactionClick }) => {
    const { data, isLoading, isError, error } = useGetDashboardSummaryQuery();
    const navigate = useNavigate();

    if (isLoading)
        return <CircularProgress sx={{ margin: "4rem auto", display: "block" }} />;

    if (isError)
        return (
            <Alert severity="error">
                {(error as any)?.data?.message || "Error fetching dashboard"}
            </Alert>
        );

    const metrics = [
        { label: "Total Products", value: data?.productCount, icon: <Inventory2Icon />, bg: "#E3F2FD", iconColor: "#1976D2", onClick: () => navigate('/products') },
        { label: "Total Categories", value: data?.categoryCount, icon: <CategoryIcon />, bg: "#F3E5F5", iconColor: "#9C27B0", onClick: () => navigate('/products') },
        { label: "Low Stock Products", value: data?.lowStock, icon: <LocalShippingIcon />, bg: "#FFEBEE", iconColor: "#D32F2F", onClick: onLowStockClick },
        { label: "Sales Count", value: data?.salesCount, icon: <ShoppingCartIcon />, bg: "#E8F5E9", iconColor: "#388E3C", onClick: () => navigate('/transactions') },
        { label: "Total Sales", value: `₹${data?.totalSales.toLocaleString()}`, icon: <MonetizationOnIcon />, bg: "#FFF3E0", iconColor: "#F57C00", onClick: outTransactionClick },
        { label: "New Stock Count", value: data?.newStockCount, icon: <AddBoxIcon />, bg: "#E1F5FE", iconColor: "#0288D1", onClick: () => navigate('/transactions') },
        { label: "Total Purchase", value: `₹${data?.totalPurchase.toLocaleString()}`, icon: <PaidIcon />, bg: "#F3E5F5", iconColor: "#7B1FA2", onClick: inTransactionClick },
    ];

    return (
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {metrics.map(metric => (
                <Grid key={metric.label}>
                    <GenericCard
                        title={metric.label}
                        value={metric.value}
                        icon={metric.icon}
                        bgColor={metric.bg}
                        iconColor={metric.iconColor}
                        onClick={metric.onClick}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default Summary;