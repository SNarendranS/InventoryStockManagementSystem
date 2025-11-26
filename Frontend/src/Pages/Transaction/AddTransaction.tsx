import React, { useState, useEffect } from "react";
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
import { useCreateTransactionMutation } from "../../Services/transactionApi";
import { useGetCategoriesQuery } from "../../Services/categoryApi";
import { useGetProductsByCategoryQuery } from "../../Services/productApi";
import { Info, Error } from "@mui/icons-material";

const AddTransaction: React.FC = () => {
    const { data: categoriesData, isLoading: loadingCategories } = useGetCategoriesQuery();
    const categories = categoriesData?.categories || [];

    const [categoryid, setCategoryid] = useState<number | null>(null);
    const { data: productsData, isLoading: loadingProducts } = useGetProductsByCategoryQuery(
        { categoryid: categoryid! },
        { skip: categoryid === null }
    );
    const products = productsData?.products || [];

    const [createTransaction, { isLoading }] = useCreateTransactionMutation();

    const [productid, setProductid] = useState<number | null>(null);
    const [type, setType] = useState<"IN" | "OUT">("IN");
    const [quantity, setQuantity] = useState<number>(1);
    const [note, setNote] = useState("");
    const [error, setError] = useState<string>("");

    const selectedProduct = products.find((p: any) => p.productid === productid) || null;
    const isLowStock =
        selectedProduct && type === "OUT" && selectedProduct.quantity <= selectedProduct.restockLevel;

    useEffect(() => {
        if (type === "OUT" && selectedProduct) {
            if (quantity > selectedProduct.quantity) {
                setError(`Only ${selectedProduct.quantity} in stock`);
            } else {
                setError("");
            }
        } else {
            setError("");
        }
    }, [quantity, type, selectedProduct]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!categoryid) return setError("Please select a category");
        if (!productid) return setError("Please select a product");
        if (quantity <= 0) return setError("Quantity must be greater than 0");

        if (isLowStock && quantity > selectedProduct!.quantity) {
            return setError(`Not enough stock available!`);
        }

        setError("");

        try {
            await createTransaction({ productid, type, quantity, note }).unwrap();
            setCategoryid(null);
            setProductid(null);
            setQuantity(1);
            setType("IN");
            setNote("");
            alert("Transaction created successfully!");
        } catch (err) {
            setError("Failed to create transaction");
        }
    };

    if (loadingCategories || loadingProducts) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

    return (
        <Card sx={{ maxWidth: 500, margin: "40px auto", p: 3, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Create New Transaction
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                    Record stock IN or OUT movement for a product.
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Box component="form" onSubmit={handleSubmit}>
                    {/* Category */}
                    <TextField
                        select
                        label="Category"
                        fullWidth
                        margin="normal"
                        value={categoryid ?? ""}
                        onChange={(e) => {
                            setCategoryid(Number(e.target.value));
                            setProductid(null);
                        }}
                        size="small"
                    >
                        <MenuItem value="">Select Category</MenuItem>
                        {categories.map((c: any) => (
                            <MenuItem key={c.categoryid} value={c.categoryid}>
                                {`${c.categoryName} - ${c.categoryPrefix}`}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Product */}
                    <TextField
                        select
                        label="Product"
                        fullWidth
                        margin="normal"
                        value={productid ?? ""}
                        onChange={(e) => setProductid(Number(e.target.value))}
                        disabled={!categoryid || products.length === 0}
                        size="small"
                    >
                        {products.length ? (
                            products.map((p: any) => (
                                <MenuItem key={p.productid} value={p.productid}>
                                    {p.productName} (Stock: {p.quantity}, SKU: {p.sku})
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>
                                {categoryid ? "No products found" : "Select a category first"}
                            </MenuItem>
                        )}
                    </TextField>

                    {/* Stock Info */}
                    {selectedProduct && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mt: 1,
                                p: 1,
                                border: "1px solid",
                                borderColor: isLowStock ? "warning.main" : "info.main",
                                borderRadius: 1,
                                bgcolor: isLowStock ? "warning.light" : "info.light",
                            }}
                        >
                            {isLowStock ? <Error color="warning" /> : <Info color="info" />}
                            <Typography variant="body2">
                                Stock: <strong>{selectedProduct.quantity}</strong> | Re-stock Level:{" "}
                                <strong>{selectedProduct.restockLevel}</strong>
                            </Typography>
                        </Box>
                    )}

                    {/* Type */}
                    <TextField
                        select
                        label="Transaction Type"
                        fullWidth
                        margin="normal"
                        value={type}
                        onChange={(e) => setType(e.target.value as "IN" | "OUT")}
                        size="small"
                    >
                        <MenuItem value="IN">IN (Stock In)</MenuItem>
                        <MenuItem value="OUT">OUT (Stock Out)</MenuItem>
                    </TextField>

                    {/* Quantity */}
                    <TextField
                        label="Quantity"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        inputProps={{ min: 1 }}
                        size="small"
                    />

                    {/* Note */}
                    <TextField
                        label="Note (Optional)"
                        fullWidth
                        margin="normal"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        size="small"
                    />

                    {/* Error */}
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {/* Submit */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isLoading || error !== ""}
                        sx={{ mt: 3, py: 1.5, fontWeight: "bold",background:"goldenrod" }}
                    >
                        {isLoading ? <CircularProgress size={22} /> : "Create Transaction"}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AddTransaction;