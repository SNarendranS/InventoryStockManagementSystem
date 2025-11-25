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
                minHeight: 80,
                minWidth,
                display: "flex",
                alignItems: "center",
                padding: 2,
                transition: "0.3s",
                cursor: onClick ? "pointer" : "default",
                ":hover": onClick
                    ? {
                        transform: "translateY(-5px)",
                        boxShadow: 6,
                    }
                    : {},
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
                        fontSize: "1.5rem",
                    }}
                >
                    {icon}
                </Box>
            )}

            {/* If custom children content exists, render it instead of default structure */}
            {children ? (
                <Box sx={{ flexGrow: 1 }}>{children}</Box>
            ) : (
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" fontWeight="bold">
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
