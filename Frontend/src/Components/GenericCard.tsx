import React from "react";
import { Card, Box, Typography } from "@mui/material";

export interface GenericCardProps {
  title: string;
  value?: string | number;
  icon?: React.ReactNode;
  bgColor?: string;
  iconColor?: string;
  onClick?: () => void;
  minWidth?: number;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

const GenericCard: React.FC<GenericCardProps> = ({
  title,
  value,
  icon,
  bgColor = "#E3F2FD",
  iconColor = "#1976D2",
  onClick,
  minWidth = 220,
  footer,
  children,
}) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        minHeight: 100,
        minWidth,
        display: "flex",
        alignItems: "center",
        padding: 2.5,
        borderRadius: 3,
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick
          ? {
              transform: "translateY(-5px)",
              boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
            }
          : {},
        backgroundColor: "#fff",
      }}
    >
      {icon && (
        <Box
          sx={{
            width: 60,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: bgColor,
            color: iconColor,
            mr: 2,
            fontSize: "1.7rem",
          }}
        >
          {icon}
        </Box>
      )}

      {children ? (
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
            {value}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
        </Box>
      )}

      {footer && <Box ml={2}>{footer}</Box>}
    </Card>
  );
};

export default GenericCard;