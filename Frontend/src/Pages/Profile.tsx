import React, { useState } from "react";
import FormWrapper from "../Components/DynamicForm/FormWrapper";
import { Typography, Alert, Box, TextField } from "@mui/material";
import { useGetUserByIdQuery } from "../Services/userApi";
import '../Utils/StringFunctions';
import { useSelector } from "react-redux";
import type { RootState } from "../Store/store";

const Profile: React.FC = () => {
    const user = useSelector((state: RootState) => state.userToken.user);
    const { data: userRes, isLoading } = useGetUserByIdQuery(user.userid);
    const { data: ManagerRes, isLoading: managerLoading } =
        useGetUserByIdQuery(user.managerid!, { skip: !user.managerid });

    console.log("ress", userRes, "manager", ManagerRes)
    const [error] = useState("");

    if (isLoading || managerLoading) {
        return <Typography sx={{ mt: 5, textAlign: "center" }}>Loading...</Typography>;
    }

    return (
        <FormWrapper title="Profile">
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
                <TextField
                    fullWidth
                    size="small"
                    value={userRes?.user?.name}
                    label="Name"
                />
                <TextField
                    fullWidth
                    size="small"
                    value={userRes?.user?.email}
                    label="Email"
                />
                <TextField
                    fullWidth
                    size="small"
                    value={
                        userRes?.user?.createdAt
                            ? new Date(userRes.user.createdAt).toLocaleDateString()
                            : ""
                    }
                    label="Joined Date"
                />
                <TextField
                    fullWidth
                    size="small"
                    value={userRes?.user?.role}
                    label="Designation"
                />
                {ManagerRes && <TextField
                    fullWidth
                    size="small"
                    value={ManagerRes?.user?.name}
                    label="Manager"
                />}
            </Box>
        </FormWrapper>
    );
};

export default Profile;