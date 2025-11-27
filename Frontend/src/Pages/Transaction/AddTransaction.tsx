import React, { useState, useEffect } from "react";
import FormWrapper from "../../Components/DynamicForm/FormWrapper";
import DynamicForm from "../../Components/DynamicForm/DynamicForm";
import { useGetCategoriesQuery } from "../../Services/categoryApi";
import { useGetProductsByCategoryQuery } from "../../Services/productApi";
import { useCreateTransactionMutation } from "../../Services/transactionApi";
import { Box, Typography, Alert } from "@mui/material";
import { Info, Error as ErrorIcon } from "@mui/icons-material";

interface TransactionInput {
    categoryid: number;
    productid: number;
    type: "IN" | "OUT";
    quantity: number;
    note: string;
}

const AddTransaction: React.FC = () => {

    // Fetch Categories
    const { data: categoryRes, isLoading: loadingCategories } = useGetCategoriesQuery();
    const categories = categoryRes?.categories || [];

    // State
    const [values, setValues] = useState<TransactionInput>({
        categoryid: 0,
        productid: 0,
        type: "IN",
        quantity: 1,
        note: ""
    });

    // Fetch Products based on selected Category
    const { data: productRes, isLoading: loadingProducts } = useGetProductsByCategoryQuery(
        { categoryid: values.categoryid },
        { skip: values.categoryid === 0 }
    );
    const products = productRes?.products || [];

    const [createTransaction, { isLoading }] = useCreateTransactionMutation();
    const [error, setError] = useState("");

    // Currently selected product
    const selectedProduct =
        products.find((p: any) => p.productid === values.productid) || null;

    // Low stock warning
    const isLowStock =
        selectedProduct &&
        values.type === "OUT" &&
        selectedProduct.quantity <= selectedProduct.restockLevel;

    // Validation when quantity/type changes
    useEffect(() => {
        if (values.type === "OUT" && selectedProduct) {
            if (values.quantity > selectedProduct.quantity) {
                setError(`Only ${selectedProduct.quantity} in stock`);
            } else {
                setError("");
            }
        } else {
            setError("");
        }
    }, [values.quantity, values.type, selectedProduct]);

    // Dynamic Form Field Schema
    const fields = [
        {
            name: "categoryid",
            label: "Category",
            type: "select",
            options: categories.map((c: any) => ({
                value: c.categoryid,
                label: `${c.categoryName} - ${c.categoryPrefix}`,
            })),
            onChange: (v: number) => {
                setValues({ ...values, categoryid: v, productid: 0 });
            }
        },
        {
            name: "productid",
            label: "Product",
            type: "select",
            disabled: values.categoryid === 0 || products.length === 0,
            options: products.map((p: any) => ({
                value: p.productid,
                label: `${p.productName} - ${p.sku}`,
            })),
        },
        {
            name: "type",
            label: "Transaction Type",
            type: "select",
            options: [
                { value: "IN", label: "IN (Stock In)" },
                { value: "OUT", label: "OUT (Stock Out)" }
            ]
        },
        {
            name: "quantity",
            label: "Quantity",
            type: "number"
        },
        {
            name: "note",
            label: "Note (Optional)"
        }
    ];

    // Extra UI below fields — stock box
    const extra = selectedProduct && (
        <Box
            sx={{
                mt: 2,
                p: 1.2,
                borderRadius: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: isLowStock ? "warning.light" : "info.light",
                border: "1px solid",
                borderColor: isLowStock ? "warning.main" : "info.main",
            }}
        >
            {isLowStock ? <ErrorIcon color="warning" /> : <Info color="info" />}
            <Typography fontSize={14}>
                Stock: <b>{selectedProduct.quantity}</b> |
                Re-Stock Level: <b>{selectedProduct.restockLevel}</b>
            </Typography>
        </Box>
    );

    const handleSubmit = async () => {
        if (!values.categoryid) return setError("Please select a category");
        if (!values.productid) return setError("Please select a product");
        if (values.quantity <= 0) return setError("Quantity must be greater than 0");

        if (isLowStock && values.quantity > selectedProduct!.quantity) {
            return setError("Not enough stock available!");
        }

        try {
            await createTransaction(values).unwrap();
            alert("Transaction created successfully!");

            // Reset form
            setValues({
                categoryid: 0,
                productid: 0,
                type: "IN",
                quantity: 1,
                note: ""
            });

            setError("");
        } catch {
            setError("Failed to create transaction");
        }
    };

    if (loadingCategories || loadingProducts) {
        return <Typography sx={{ mt: 5, textAlign: "center" }}>Loading...</Typography>;
    }

    return (
        <FormWrapper title="Create New Transaction">
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

export default AddTransaction;