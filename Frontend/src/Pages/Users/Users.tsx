import React, { useState } from "react";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import { useDeleteUserMutation, useGetUsersQuery, useGetUsersByManagerQuery, useGetManagersQuery ,useEditUserMutation} from "../../Services/userApi";
import type { User } from "../../Interfaces/IUser";
import DataTable from "../../Components/DataTable";
import EditPopup, { type FieldConfig } from "../../Components/EditPopup/EditPopup";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";
import { Delete, Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";
import type { RootState } from "../../Store/store";
import { useNavigate } from "react-router-dom";

const Users: React.FC = () => {
    const user = useSelector((state: RootState) => state.userToken.user);
    const { data, error, isLoading } = user?.role === "admin"
        ? useGetUsersQuery()
        : useGetUsersByManagerQuery(user?.userid!);
    const { data: managersRes } = useGetManagersQuery();
    const managers = managersRes?.users || [];
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [deleteUser] = useDeleteUserMutation();
    const [editUser]= useEditUserMutation();
    const navigate = useNavigate();

    const handleEdit = (u: User) => {
        if (user?.userid === u.userid) navigate("/profile");
        else {
            setSelectedUser(u);
            setOpenEdit(true);
        }
    };
    const confirmEdit = (values: Partial<User>) => {
        if (selectedUser) {
            console.log(values)
            editUser({ id: selectedUser.userid, body: { ...values } });
            setOpenEdit(false);
        }
    };
    const handleDelete = (u: User) => {
        setSelectedUser(u);
        setOpenDelete(true);
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
        ...(user?.role === "admin" ? [
            {
                key: "edit",
                label: "Edit",
                icon: (row: User) => (
                    <IconButton onClick={() => handleEdit(row)}>
                        <Edit sx={{ color: "#8592afff" }} />
                    </IconButton>
                )
            },
            {
                key: "delete",
                label: "Delete",
                icon: (row: User) => (
                    user.userid !== row.userid ? (
                        <IconButton onClick={() => handleDelete(row)}>
                            <Delete sx={{ color: "#c9371dff" }} />
                        </IconButton>
                    ) : null
                )
            }
        ] : [])
    ];

    const userFields: FieldConfig[] = [
        { name: "name", label: "Name", type: "text" },
        { name: "email", label: "Email", type: "text" },
        {
            name: "managerid", label: "Manager", type: "select", options: managers?.map(m => ({
                label: m.name,
                value: m.userid
            }))

        },
        {
            name: "role", label: "Role", type: "select", options: [
                { label: "Admin", value: "admin" },
                { label: "Manager", value: "manager" },
                { label: "Employee", value: "employee" }
            ]
        },
    ];

    return (
        <>
            <DataTable
                columns={columns}
                count={data?.count || 0}
                rows={data?.users || []}
                title="Employees"
            />

            <EditPopup
                popupName="Employee"
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                fields={userFields}
                initialData={{
                    ...selectedUser,
                    manager: selectedUser?.managerid || ""
                }}
                onSubmit={(values) => {
                    confirmEdit(values);
                }}
            />

            <DeletePopup
                popupName="Employee"
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                deleteCallback={confirmDelete}
            />
        </>
    );
};

export default Users;