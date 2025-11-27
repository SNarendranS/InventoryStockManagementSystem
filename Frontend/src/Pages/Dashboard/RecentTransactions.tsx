import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import type { Transaction } from "../../Interfaces/ITransaction";
import DataTable from "../../Components/DataTable";
import { useGetRecentTransactionByTypeQuery } from "../../Services/transactionApi";

type Props = {
    transactionType: string
}
const RecentTransactions: React.FC<Props> = (props) => {
    const { data, error, isLoading } = useGetRecentTransactionByTypeQuery({ type: props.transactionType, limit: 10 });

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Failed to load transactions</Typography>;

    const columns = [
        { key: "transactionid", label: "ID" },
        { key: "product", label: "Product", render: (row: Transaction) => row.product.productName },
        { key: "sku", label: "SKU", render: (row: Transaction) => row.product.sku },
        {
            key: "type", label: "Type",
            render: (row: Transaction) => (
                <Typography
                    sx={{

                        color: row.type === "IN" ? "#256029" : "#B71C1C",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: 600,
                        fontSize: "14px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                        height: 34,
                        width: 34,
                        borderRadius: "50%",
                        backgroundColor: row.type === "IN" ? "#C8E6C9" : "#FFCDD2",
                    }}
                >
                    {row.type}
                </Typography>
            )
        },
        {
            key: "quantity",
            label: "Quantity",
            render: (row: Transaction) => (
                <Typography
                    sx={{
                        color: row.type === "IN" ? "#256029" : "#B71C1C",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: 600,
                    }}
                >
                    {row.type === "IN" ? "+" : "-"}
                    {row.quantity}
                </Typography>
            )
        },
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

    return <DataTable columns={columns} count={data?.count || 0} rows={data?.transactions || []} title={`${props.transactionType} Transactions`} />;
};

export default RecentTransactions;