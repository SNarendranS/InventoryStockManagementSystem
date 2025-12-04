import React, { useState } from "react";
import FormWrapper from "../../Components/DynamicForm/FormWrapper";
import DynamicForm from "../../Components/DynamicForm/DynamicForm";
import { Typography, Alert, Box, TextField } from "@mui/material";
import { useGetManagersQuery } from "../../Services/userApi";
import { useRegisterUserMutation } from "../../Services/authApi";
import { UserRole, type CreateUserPayload } from "../../Interfaces/IUser"
import '../../Utils/StringFunctions';

const AddUser: React.FC = () => {

    // Fetch managers
    const { data: managersRes, isLoading: loadingManagers } = useGetManagersQuery();
    const managers = managersRes?.users || [];

    // State
    const [values, setValues] = useState<CreateUserPayload>({
        managerid: 0,
        name: "",
        email: "",
        password: "",
        role: UserRole.EMPLOYEE,
    });


    const [createUser, { isLoading }] = useRegisterUserMutation();
    const [error, setError] = useState("");



    // Dynamic Form Field Schema
    const fields = [
        {
            name: "managerid",
            label: "Manager",
            type: "select",
            options: managers.map((c: any) => ({
                value: c.userid,
                label: `${c.name} - ${c.userid}`,
            })),
            onChange: (v: number) => {
                setValues({ ...values, managerid: v });
            }
        },
        {
            name: "name",
            label: "Name",

        },
        {
            name: "role",
            label: "Role",
            type: "select",
            options: [
                { value: UserRole.ADMIN, label: "Admin" },
                { value: UserRole.MANAGER, label: "Manager" },
                { value: UserRole.EMPLOYEE, label: "Employee" },

            ]
        },
    ];


    const extra = (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
            <TextField
                disabled
                fullWidth
                size="small"
                value={values.name ? values.name.replaceAll(" ", ".").toLowerCase() + "@gmail.com" : ""}
                label="Email"
            />

            <TextField
                disabled
                fullWidth
                size="small"
                value={values.name ? (values.name.split(/[.\s]/)[0].capitalize() + "@123") : ""}
                label="Default Password"
            />

        </Box>
    );


    const handleSubmit = async () => {
        if (!values.managerid) return setError("Please assign a Manager");
        if (!values.name) return setError("Please enter name");


        try {
            values.email = values.name.replaceAll(" ", ".").toLowerCase() + "@gmail.com";
            values.password = values.name.replaceAll(" ", ".").toLowerCase() + "@gmail.com";


            await createUser(values).unwrap();
            alert("User created successfully!");

            // Reset form
            setValues({
                managerid: 0,
                name: "",
                email: "",
                password: "",
                role: UserRole.EMPLOYEE,
            });

            setError("");
        } catch {
            setError("Failed to create user");
        }
    };

    if (loadingManagers) {
        return <Typography sx={{ mt: 5, textAlign: "center" }}>Loading...</Typography>;
    }

    return (
        <FormWrapper title="Create New User">
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

export default AddUser;