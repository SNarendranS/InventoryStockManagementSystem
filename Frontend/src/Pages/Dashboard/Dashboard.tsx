import React, { useRef } from "react";
import { Typography, Box } from "@mui/material";
import Summary from "./Summary";
import LowStock from "./LowStock";
import RecentTransactions from "./RecentTransactions";

const Dashboard: React.FC = () => {
  const lowStockRef = useRef<HTMLDivElement | null>(null);
  const inTransactionRef = useRef<HTMLDivElement | null>(null);
  const outTransactionRef = useRef<HTMLDivElement | null>(null);

  const scrollToElement = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box
      sx={{
        padding: 4,
        width: "100%",
        background: "#F5F7FA",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
        Dashboard
      </Typography>

      <Summary
        onLowStockClick={() => scrollToElement(lowStockRef)}
        inTransactionClick={() => scrollToElement(inTransactionRef)}
        outTransactionClick={() => scrollToElement(outTransactionRef)}
      />

      <Box sx={{ pt: 6, display: "flex", flexDirection: "column", gap: 6 }}>
        <Box ref={lowStockRef}>
          <LowStock />
        </Box>
        <Box ref={inTransactionRef}>
          <RecentTransactions transactionType="IN" />
        </Box>
        <Box ref={outTransactionRef}>
          <RecentTransactions transactionType="OUT" />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;