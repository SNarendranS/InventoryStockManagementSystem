import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import DataTable from "../../Components/DataTable";
import { useGetLowStockProductsQuery } from "../../Services/productApi";
import type { Product } from "../../Interfaces/IProduct";

const LowStock: React.FC = () => {
    const { data, error, isLoading } = useGetLowStockProductsQuery();

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Failed to load low stock products</Typography>;

    const columns = [
        { key: "productid", label: "ID" },
        { key: "productName", label: "Name" },
        { key: "price", label: "Price", render: (row: Product) => `₹${row.price}` },
        { key: "quantity", label: "Stock" },
        { key: "category", label: "Category", render: (row: Product) => row.category.categoryName }
    ];

    return <DataTable columns={columns} count={data?.count || 0} rows={data?.products || []} title="Low Stock Products" />;
};

export default LowStock;
