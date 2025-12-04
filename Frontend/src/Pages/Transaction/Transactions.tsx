import React, { useState } from "react";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import { useDeleteTransactionMutation, useGetTransactionsQuery, useEditTransactionMutation } from "../../Services/transactionApi";
import type { Transaction, TransactionType } from "../../Interfaces/ITransaction";
import DataTable from "../../Components/DataTable";
import EditPopup, { type FieldConfig } from "../../Components/EditPopup/EditPopup";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";
import { Delete, Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";
import type { RootState } from "../../Store/store";

const Transactions: React.FC = () => {
    const { data, error, isLoading } = useGetTransactionsQuery();
    const user = useSelector((state: RootState) => state.userToken.user);

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    const [deleteTransaction] = useDeleteTransactionMutation();
    const [editTransaction] = useEditTransactionMutation();

    const handleEdit = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setOpenEdit(true);
    };
    const confirmEdit = (values: { type?: TransactionType; quantity?: number; note?: string }) => {
        if (selectedTransaction) {
            editTransaction({ id: selectedTransaction.transactionid, body: { ...values } });
            setOpenEdit(false);
        }
    };
    const handleDelete = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setOpenDelete(true);
    };

    const confirmDelete = () => {
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
        { key: "type", label: "Type", render: (row: Transaction) => row.type },
        { key: "quantity", label: "Quantity", render: (row: Transaction) => row.quantity },
        { key: "price", label: "Price", render: (row: Transaction) => `₹${row.product.price}` },
        { key: "note", label: "Note", render: (row: Transaction) => row.note || "-" },
        { key: "date", label: "Date", render: (row: Transaction) => new Date(row.createdAt).toLocaleDateString() },
        { key: "time", label: "Time", render: (row: Transaction) => new Date(row.createdAt).toLocaleTimeString() },
        {
            key: "edit",
            label: "Edit",
            icon: (row: Transaction) => (
                <IconButton onClick={() => handleEdit(row)}>
                    <Edit sx={{ color: "#8592afff" }} />
                </IconButton>
            )
        },
        ...(user.role !== "employee"
            ? [{
                key: "delete",
                label: "Delete",
                icon: (row: Transaction) => (
                    <IconButton onClick={() => handleDelete(row)}>
                        <Delete sx={{ color: "#c9371dff" }} />
                    </IconButton>
                )
            }]
            : [])
    ];

    // Dynamic fields for editing transactions
    const transactionFields: FieldConfig[] = [
        { name: "type", label: "Type", type: "select", options: [{ label: "IN", value: "IN" }, { label: "OUT", value: "OUT" }] },
        { name: "quantity", label: "Quantity", type: "number" },
        { name: "note", label: "Note", type: "text" },
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
                popupName="Transaction"
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                fields={transactionFields}
                initialData={selectedTransaction}
                onSubmit={(values) => {
                    confirmEdit(values);
                }}
            />

            <DeletePopup
                popupName="Transaction"
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                deleteCallback={confirmDelete}
            />
        </>
    );
};

export default Transactions;