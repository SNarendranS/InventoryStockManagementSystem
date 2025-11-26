import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import { useGetTransactionsQuery } from "../../Services/transactionApi";
import type { Transaction } from "../../Interfaces/ITransaction";
import DataTable from "../../Components/DataTable";

const Transactions: React.FC = () => {
    const { data, error, isLoading } = useGetTransactionsQuery();

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Failed to load transactions</Typography>;

    const columns = [
        { key: "transactionid", label: "ID" },
        { key: "product", label: "Product", render: (row: Transaction) => row.product.productName },
        { key: "sku", label: "SKU", render: (row: Transaction) => row.product.sku },
        { key: "type", label: "Type" },
        { key: "quantity", label: "Quantity" },
        { key: "price", label: "Price", render: (row: Transaction) => `₹${row.product.price}` },
        { key: "note", label: "Note", render: (row: Transaction) => row.note || "-" },
        {
            key: "date",
            label: "Date",
            render: (row: Transaction) => new Date(row.createdAt).toLocaleDateString()
        },
        {
            key: "time",
            label: "Time",
            render: (row: Transaction) => new Date(row.createdAt).toLocaleTimeString()
        }
    ];

    return <DataTable columns={columns} count={data?.count || 0} rows={data?.transactions || []} title="Transactions" />;
};

export default Transactions;
