import React, { useState } from "react";
import {
    Button,
    TextField,
    MenuItem,
    CircularProgress,
    Card,
    CardContent,
    Typography,
    Box,
    Alert,
    Divider,
} from "@mui/material";

import { useCreateProductMutation } from "../../Services/productApi";
import { useGetCategoriesQuery } from "../../Services/categoryApi";
import type { Category } from "../../Interfaces/ICategory";

const AddProduct: React.FC = () => {
    // Fetch categories
    const { data, isLoading: loadingCategories } = useGetCategoriesQuery();
    const categories: Category[] = data?.categories || [];

    // States
    const [categoryid, setCategoryid] = useState<number | "">("");
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [price, setPrice] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [restockLevel, setRestockLevel] = useState<number>(5);
    const [skuMid, setSkuMid] = useState("");
    const [skuSuffix, setSkuSuffix] = useState("");
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const [createProduct, { isLoading }] = useCreateProductMutation();
    const cat = categories.find((c) => c.categoryid === categoryid);
    const prefix = cat?.categoryPrefix;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMsg("");
        setError("");

        if (!categoryid) return setError("Please select a category");
        if (!productName) return setError("Product Name is required");
        if (!price || Number(price) <= 0) return setError("Price must be greater than 0");
        if (quantity <= 0) return setError("Quantity must be greater than 0");
        if (restockLevel <= 0) return setError("Restock Level must be greater than 0");

        // Get selected category prefix

        if (!skuMid || !skuSuffix) {
            return setError("SKU Mid and SKU Suffix are required");
        }

        const sku = `${prefix}-${skuMid}-${skuSuffix}`;

        try {
            await createProduct({
                productName,
                productDescription,
                price,
                quantity,
                restockLevel,
                sku,
                categoryid,
            }).unwrap();

            setSuccessMsg("Product created successfully!");
            setProductName("");
            setProductDescription("");
            setPrice("");
            setQuantity(1);
            setRestockLevel(5);
            setSkuMid("");
            setSkuSuffix("");
            setCategoryid("");
        } catch (error) {
            setError("Failed to create product");
        }
    };

    if (loadingCategories) {
        return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
    }

    return (
        <Card sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3, borderRadius: 3, boxShadow: 4 }}>
            <CardContent>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                    Add New Product
                </Typography>

                <Typography variant="body2" mb={2}>
                    Enter product details to add a new item to your inventory.
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Box component="form" onSubmit={handleSubmit}>
                    {/* Category */}
                    <TextField
                        select
                        fullWidth
                        label="Category"
                        value={categoryid}
                        onChange={(e) => setCategoryid(Number(e.target.value))}
                        margin="normal"
                        size="small"
                    >
                        <MenuItem value="">Select Category</MenuItem>
                        {categories.map((c) => (
                            <MenuItem key={c.categoryid} value={c.categoryid}>
                                {`${c.categoryName} - ${c.categoryPrefix}`}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Product Name */}
                    <TextField
                        fullWidth
                        label="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        margin="normal"
                        size="small"
                    />

                    {/* Description */}
                    <TextField
                        fullWidth
                        label="Description"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        margin="normal"
                        size="small"
                        multiline
                        rows={2}
                    />

                    {/* Price */}
                    <TextField
                        fullWidth
                        label="Price"
                        value={price}
                        onChange={(e) => setPrice((Number(e.target.value)).toString())}
                        margin="normal"
                        size="small"
                        inputProps={{ min: 0 }}
                    />

                    {/* Quantity */}
                    <TextField
                        fullWidth
                        type="number"
                        label="Initial Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        margin="normal"
                        size="small"
                        inputProps={{ min: 1 }}
                    />

                    {/* Restock Level */}
                    <TextField
                        fullWidth
                        type="number"
                        label="Restock Level"
                        value={restockLevel}
                        onChange={(e) => setRestockLevel(Number(e.target.value))}
                        margin="normal"
                        size="small"
                        inputProps={{ min: 1 }}
                    />

                    {/* SKU Fields */}

                    <Box sx={{ display: "flex", gap: 1, mt: 2, alignItems: "center" }}>
                        <Typography>
                            SKU
                        </Typography>
                        <TextField
                            value={prefix||"GEN"}
                            size="small"
                            disabled
                            sx={{ color: "black", width: 80 }}

                        />
                        <Typography>
                            -
                        </Typography>
                        <TextField
                            label="Mid"
                            value={skuMid}
                            onChange={(e) => setSkuMid(e.target.value)}
                            size="small"
                            sx={{ color: "black", width: 80 }}

                        />
                        <Typography>
                            -
                        </Typography>

                        <TextField
                            label="Suffix"
                            value={skuSuffix}
                            onChange={(e) => setSkuSuffix(e.target.value)}
                            size="small"
                            sx={{ color: "black", width: 80 }}

                        />
                    </Box>

                    {/* Error */}
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {/* Success */}
                    {successMsg && (
                        <Alert severity="success" sx={{ mt: 2 }}>
                            {successMsg}
                        </Alert>
                    )}

                    {/* Submit */}
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{ mt: 3, py: 1.4, fontWeight: 600 ,background:"goldenrod"}}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={22} /> : "Add Product"}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AddProduct;