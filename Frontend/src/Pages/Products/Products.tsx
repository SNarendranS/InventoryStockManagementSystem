import React, { useState } from "react";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import { useDeleteProductMutation, useGetProductsQuery } from "../../Services/productApi";
import { useGetCategoriesQuery } from "../../Services/categoryApi";
import type { Product } from "../../Interfaces/IProduct";
import DataTable from "../../Components/DataTable";
import { Delete, Edit } from "@mui/icons-material";
import EditPopup, { type FieldConfig } from "../../Components/EditPopup/EditPopup";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";
import { useSelector } from "react-redux";
import type { RootState } from "../../Store/store";

const Products: React.FC = () => {
    const { data, error, isLoading } = useGetProductsQuery();
    const { data: categories } = useGetCategoriesQuery();
    const user = useSelector((state: RootState) => state.userToken.user);

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
                        <Edit sx={{ color: "#8592afff" }} />
                    </IconButton>
                )
            }]
            : []),

        ...(user.role === "admin"
            ? [{
                key: "delete",
                label: "Delete",
                icon: (row: Product) => (
                    <IconButton onClick={() => handleDelete(row)}>
                        <Delete sx={{ color: "#c9371dff" }} />
                    </IconButton>
                )
            }]
            : []),
    ];

    // 🔹 Fields for EditPopup
    const productFields: FieldConfig[] = [
        { name: "sku", label: "SKU", type: "text" },
        { name: "productName", label: "Name", type: "text" },
        { name: "price", label: "Price", type: "number" },
        { name: "quantity", label: "Stock Qty", type: "number" },
        {
            name: "category",
            label: "Category",
            type: "select",
            options: categories?.categories.map(c => ({
                label: c.categoryName,
                value: c.categoryid
            }))
        },
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
                popupName="Product"
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                fields={productFields}
                initialData={selectedProduct}
                onSubmit={(values) => {
                    console.log("Updated product:", values);
                    // Call your update API here
                }}
            />

            <DeletePopup
                popupName="Product"
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                deleteCallback={confirmDelete}
            />
        </>
    );
};

export default Products;