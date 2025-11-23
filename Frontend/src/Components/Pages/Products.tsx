import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import { useGetProductsQuery } from "../../Store/apiSlice";
import type { Product } from "../../Interfaces/IProduct";
import DataTable from "./DataTable";

const Products: React.FC = () => {
    const { data, error, isLoading } = useGetProductsQuery();

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Failed to load products</Typography>;

    const columns = [
        { key: "productid", label: "ID" },
        { key: "productName", label: "Name" },
        { key: "price", label: "Price", render: (row: Product) => `₹${row.price}` },
        { key: "quantity", label: "Stock" },
        { key: "category", label: "Category", render: (row: Product) => row.category.categoryName }
    ];

    return <DataTable columns={columns} count={data?.count || 0} rows={data?.products || []} title="Products" />;
};

export default Products;
