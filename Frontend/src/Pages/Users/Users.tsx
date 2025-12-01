import React, { useState } from "react";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import { useDeleteUserMutation, useGetUsersByManagerQuery, useGetUsersQuery } from "../../Services/userApi";
import DataTable from "../../Components/DataTable";
import type { User } from "../../Interfaces/IUser";
import { useSelector } from "react-redux";
import type { RootState } from "../../Store/store";
import { Delete, Edit } from "@mui/icons-material";
import EditPopup from "../../Components/EditPopup/EditPopup";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";

const Users: React.FC = () => {
    const user = useSelector((state: RootState) => state.userToken.user);

    const { data, error, isLoading } = user.role == "admin" ? useGetUsersQuery() : useGetUsersByManagerQuery(user.userid)

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = (user: User) => {
        setSelectedUser(user);
        setOpenDelete(true);
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setOpenEdit(true);
    };
    const confirmDelete = () => {
        if (selectedUser) {
            deleteUser({ id: selectedUser.userid });
            setOpenDelete(false);
        }
    };
    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Failed to load Employees</Typography>;

    const columns = [
        { key: "userid", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
        { key: "manager.name", label: "Manager", render: (row: User) => row.manager?.name || "-" },
        { key: "manager.email", label: "Manager Email", render: (row: User) => row.manager?.email || "-" },
        { key: "createdAt", label: "Joining Date", render: (row: User) => new Date(row.createdAt).toLocaleDateString() },
        ...(user.role === "admin" ? [{
            key: "edit",
            label: "Edit",
            icon: (row: User) => (
                <IconButton onClick={() => handleEdit(row)}>
                    <Edit sx={{ color: "#8592afff" }} />
                </IconButton>
            )
        }, {
            key: "delete",
            label: "Delete",
            icon: (row: User) => (
                <IconButton onClick={() => handleDelete(row)}>
                    <Delete sx={{ color: "#c9371dff" }} />
                </IconButton>
            )
        }]
            : []),

    ];

    return (
        <>
            <DataTable columns={columns} count={data?.count || 0} rows={data?.users || []} title="Employees" />;
            <EditPopup
                open={openEdit}
                onClose={() => setOpenEdit(false)}
            // transaction={selectedTransaction}
            />

            <DeletePopup
                popupName="Employee"
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                deleteCallback={confirmDelete}
            />
        </>
    )

};

export default Users;
