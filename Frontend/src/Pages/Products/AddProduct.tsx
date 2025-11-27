import React, { useState } from "react";
import FormWrapper from "../../Components/DynamicForm/FormWrapper";
import DynamicForm from "../../Components/DynamicForm//DynamicForm";
import { useGetCategoriesQuery } from "../../Services/categoryApi";
import { useCreateProductMutation } from "../../Services/productApi";
import { Alert, Box, TextField } from "@mui/material";
import type { ErrorResponse } from "react-router-dom";

const AddProduct: React.FC = () => {
    const { data } = useGetCategoriesQuery();
    const categories = data?.categories || [];

    const [createProduct, { isLoading }] = useCreateProductMutation();

    const [values, setValues] = useState({
        categoryid: 0,
        productName: "",
        productDescription: "",
        price: "",
        quantity: 1,
        restockLevel: 5,
        skuMid: "",
        skuSuffix: ""
    });

    const fields = [
        {
            name: "categoryid",
            label: "Category",
            type: "select",
            options: categories.map((c) => ({
                value: c.categoryid,
                label: `${c.categoryName} - ${c.categoryPrefix}`,
            }))
        },
        { name: "productName", label: "Product Name" },
        { name: "productDescription", label: "Description", multiline: true, rows: 2 },
        { name: "price", label: "Price", type: "number" },
        { name: "quantity", label: "Quantity", type: "number" },
        { name: "restockLevel", label: "Restock Level", type: "number" }
    ];

    const selectedCategory = categories.find((c) => c.categoryid == values.categoryid);

    const extra = (
        <Box sx={{ display: "flex", gap: 1, mt: 2, alignItems: "center" }}>
            SKU
            <TextField disabled value={selectedCategory?.categoryPrefix || "GEN"} size="small" sx={{ width: 80 }} />
            -
            <TextField value={values.skuMid} size="small" onChange={(e) => setValues({ ...values, skuMid: e.target.value })} sx={{ width: 80 }} />
            -
            <TextField value={values.skuSuffix} size="small" onChange={(e) => setValues({ ...values, skuSuffix: e.target.value })} sx={{ width: 80 }} />
        </Box>
    );
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        const sku = `${selectedCategory?.categoryPrefix}-${values.skuMid}-${values.skuSuffix}`;

        const payload = {
            categoryid: values.categoryid,
            productName: values.productName,
            productDescription: values.productDescription,
            price: values.price,
            quantity: values.quantity,
            restockLevel: values.restockLevel,
            sku: sku
        };
        console.log(payload)
        try {
            await createProduct(payload).unwrap();
            alert("Product created successfully!");

            // Reset form
            setValues({
                categoryid: 0,
                productName: "",
                productDescription: "",
                price: "",
                quantity: 1,
                restockLevel: 5,
                skuMid: "",
                skuSuffix: ""
            });

            setError("");
        } catch(e) {
            setError((e as ErrorResponse)?.data?.message);
        }

    };


    return (
        <FormWrapper title="Add New Product">
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <DynamicForm
                fields={fields}
                values={values}
                setValues={setValues}
                onSubmit={handleSubmit}
                loading={isLoading}
                extra={extra}
            />
        </FormWrapper>
    );
};

export default AddProduct;
