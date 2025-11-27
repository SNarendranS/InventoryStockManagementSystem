import React, { useState } from "react";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import { useDeleteProductMutation, useGetProductsQuery } from "../../Services/productApi";
import type { Product } from "../../Interfaces/IProduct";
import DataTable from "../../Components/DataTable";
import { Delete, Edit } from "@mui/icons-material";
import EditPopup from "../../Components/EditPopup/EditPopup";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";
import { useSelector } from "react-redux";
import type { RootState } from "../../Store/store";

const Products: React.FC = () => {
    const { data, error, isLoading } = useGetProductsQuery();
    const user = useSelector((state: RootState) => state.userToken.user);

    // All hooks must be at the top (Rules of Hooks)
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const [deleteProduct] = useDeleteProductMutation();

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setOpenEdit(true);
    };

    const handleDelete = (product: Product) => {
        setSelectedProduct(product);
        setOpenDelete(true);
    };

    const confirmDelete = () => {
        if (selectedProduct) {
            deleteProduct({ id: selectedProduct.productid });
            setOpenDelete(false);
        }
    };

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Failed to load products</Typography>;

    const columns = [
        { key: "productid", label: "ID" },
        { key: "sku", label: "SKU" },
        { key: "productName", label: "Name" },
        { key: "price", label: "Price", render: (row: Product) => `₹${row.price}` },
        { key: "quantity", label: "Stock" },
        { key: "category", label: "Category", render: (row: Product) => row.category.categoryName },

        ...(user.role !== "employee"
            ? [{
                key: "edit",
                label: "Edit",
                icon: (row: Product) => (
                    <IconButton onClick={() => handleEdit(row)}>
                        <Edit sx={{ color: "blue" }} />
                    </IconButton>
                )
            }]
            : []),

        // ⭐ Show DELETE only for admin
        ...(user.role === "admin"
            ? [{
                key: "delete",
                label: "Delete",
                icon: (row: Product) => (
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
                rows={data?.products || []}
                title="Products"
            />

            <EditPopup
                open={openEdit}
                onClose={() => setOpenEdit(false)}
            //product={selectedProduct}
            />

            <DeletePopup
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                deleteCallback={confirmDelete}
            />
        </>
    );
};

export default Products;
