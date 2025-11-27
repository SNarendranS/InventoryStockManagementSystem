import React, { useState } from "react";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import { useDeleteTransactionMutation, useGetTransactionsQuery } from "../../Services/transactionApi";
import type { Transaction } from "../../Interfaces/ITransaction";
import DataTable from "../../Components/DataTable";
import EditPopup from "../../Components/EditPopup/EditPopup";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";
import { Delete, Edit } from "@mui/icons-material";
import type { RootState } from "../../Store/store";
import { useSelector } from "react-redux";

const Transactions: React.FC = () => {
    const { data, error, isLoading } = useGetTransactionsQuery();
    const user = useSelector((state: RootState) => state.userToken.user);

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    const [deleteTransaction] = useDeleteTransactionMutation();

    const handleDelete = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setOpenDelete(true);
    };

    const handleEdit = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setOpenEdit(true);
    };

    const confirmDelete = () => {
        console.log("hello") //not printing
        if (selectedTransaction) {
            deleteTransaction({ id: selectedTransaction.transactionid });
            setOpenDelete(false);
        }
    };

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
            render: (row: Transaction) => new Date(row.createdAt).toLocaleDateString(),
        },
        {
            key: "time",
            label: "Time",
            render: (row: Transaction) => new Date(row.createdAt).toLocaleTimeString(),
        },
        {
            key: "edit",
            label: "Edit",
            icon: (row: Transaction) => (
                <IconButton onClick={() => handleEdit(row)}>
                    <Edit sx={{ color: "blue" }} />
                </IconButton>
            )
        }
        ,
        ...(user.role !== "employee"
            ? [{
                key: "delete",
                label: "Delete",
                icon: (row: Transaction) => (
                    <IconButton onClick={() => handleDelete(row)}>
                        <Delete sx={{ color: "red" }} />
                    </IconButton>
                )
            }]
            : []),
    ];

    return (
        <>
            <DataTable
                columns={columns}
                count={data?.count || 0}
                rows={data?.transactions || []}
                title="Transactions"
            />

            <EditPopup
                open={openEdit}
                onClose={() => setOpenEdit(false)}
            // transaction={selectedTransaction}
            />

            <DeletePopup
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                deleteCallback={confirmDelete}
            />
        </>
    );
};

export default Transactions;