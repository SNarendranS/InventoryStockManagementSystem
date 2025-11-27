import React, { useState } from "react";
import FormWrapper from "../../Components/DynamicForm/FormWrapper";
import DynamicForm from "../../Components/DynamicForm/DynamicForm";
import { useCreateCategoryMutation } from "../../Services/categoryApi";
import { Alert } from "@mui/material";
import type { ErrorResponse } from "react-router-dom";

const AddCategory: React.FC = () => {

    const [createCategory, { isLoading }] = useCreateCategoryMutation();

    const [values, setValues] = useState({
        categoryName: "",
        categoryDescription: "",
        categoryPrefix: "",
    });

    const fields = [

        { name: "categoryName", label: "Category Name" },
        { name: "categoryPrefix", label: "Category Prefix" },
        { name: "categoryDescription", label: "Description", multiline: true, rows: 2 },

    ];

    const [error, setError] = useState("");

    const handleSubmit = async () => {

        const payload = {
            categoryName: values.categoryName,
            categoryDescription: values.categoryDescription,
            categoryPrefix: values.categoryPrefix,
        };
        console.log(payload)
        try {
            await createCategory(payload).unwrap();
            alert("Category created successfully!");

            // Reset form
            setValues({
                categoryName: "",
                categoryDescription: "",
                categoryPrefix: "",
            });

            setError("");
        } catch (e) {
            setError((e as ErrorResponse)?.data?.message);
        }

    };


    return (
        <FormWrapper title="Add New Category">
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <DynamicForm
                fields={fields}
                values={values}
                setValues={setValues}
                onSubmit={handleSubmit}
                loading={isLoading}
            />
        </FormWrapper>
    );
};

export default AddCategory;