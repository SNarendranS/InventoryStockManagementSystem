import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import DataTable from "../../Components/DataTable";
import { useGetDemandSalesTransactionsQuery } from "../../Services/transactionApi";
import type { GetDemandSalesResponse } from "../../Interfaces/ITransaction";

type TransactionRow = GetDemandSalesResponse["transactions"][number];

const DemandSales: React.FC = () => {
    const { data, error, isLoading } = useGetDemandSalesTransactionsQuery();

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Failed to load Demand Sales</Typography>;

    const columns = [
        { key: "productid", label: "Product ID" },
        { key: "productName", label: "Product Name" },
        { key: "sku", label: "SKU" },
        {
            key: "price",
            label: "Price",
            render: (row: TransactionRow) => `₹${row.price}`
        },
        { key: "total_transactions", label: "Total Transactions" },
        { key: "total_quantity", label: "Total Quantity Sold" },
        {
            key: "total_sales", label: "Total Sales",
            render: (row: TransactionRow) => `₹${row.total_sales}`

        },
    ];

    return (
        <DataTable
            columns={columns}
            count={data?.count || 0}
            rows={data?.transactions || []}
            title="Demand Sales"
        />
    );
};

export default DemandSales;