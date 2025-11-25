import React, { useRef } from "react";
import {
    Typography,
    Box,
} from "@mui/material";
import Summary from "./Summary";
import LowStock from "./LowStock";

const Dashboard: React.FC = () => {
    const lowStockRef = useRef<HTMLDivElement | null>(null);

    const scrollToLowStock = () => {
        lowStockRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <Box sx={{ padding: 4, width: "100%", background: "rgba(194, 194, 194, 0.07)", display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                Dashboard
            </Typography>
            <Summary onLowStockClick={scrollToLowStock} />
            <Box sx={{ pt: 10, m: "auto", minWidth: "80%" }} ref={lowStockRef}>
                {/* scroll here */}
                <LowStock />
            </Box>
        </Box>
    );
};

export default Dashboard;
