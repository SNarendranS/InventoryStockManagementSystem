import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import { useGetUsersQuery } from "../../Services/userApi";
import DataTable from "../../Components/DataTable";
import type { User } from "../../Interfaces/IUser";

const Users: React.FC = () => {
    const { data, error, isLoading } = useGetUsersQuery();

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Failed to load transactions</Typography>;
    console.log("data ", data)
    const columns = [
        { key: "userid", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
        { key: "manager.name", label: "Manager", render: (row: User) => row.manager?.name || "-" },
        { key: "manager.email", label: "Manager Email", render: (row: User) => row.manager?.email || "-" },
        { key: "createdAt", label: "Joining Date", render: (row: User) => new Date(row.createdAt).toLocaleDateString() }
    ];

    return <DataTable columns={columns} count={data?.count || 0} rows={data?.users || []} title="Employees" />;
};

export default Users;
