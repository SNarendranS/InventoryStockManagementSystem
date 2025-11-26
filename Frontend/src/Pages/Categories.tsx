import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import DataTable from "../Components/DataTable";
import { useGetCategoriesQuery } from "../Services/categoryApi";

const Categories: React.FC = () => {
    const { data, error, isLoading } = useGetCategoriesQuery();
    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Failed to load categories</Typography>;

    const columns = [
        { key: "categoryid", label: "ID" },
        { key: "categoryName", label: "Name" },
        { key: "categoryPrefix", label: "Prefix" },
        { key: "categoryDescription", label: "Description" }
    ];

    return <DataTable columns={columns} count={data?.count || 0} rows={data?.categories || []} title="Categories" />;
};

export default Categories;