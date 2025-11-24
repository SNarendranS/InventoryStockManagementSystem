import React from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Box
} from "@mui/material";

export interface Column<T> {
    key: keyof T | string; // field in data or custom
    label: string;
    render?: (row: T) => React.ReactNode; // optional custom render
}

interface DataTableProps<T> {
    columns: Column<T>[];
    count?: number
    rows: T[];
    title?: string;
    maxWidth?: number;
}
function DataTable<T extends { [key: string]: any }>({
    columns,
    rows,
    title,
    count,
    maxWidth = 900
}: DataTableProps<T>) {
    return (
        <Box sx={{ width: "100%", maxWidth, mb: 4 }}>
            {title && (
                <>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        {title}
                    </Typography>
                    {count !== undefined && (
                        <Typography variant="subtitle1" sx={{ mb: 3 }}>
                            Total {title}: {count}
                        </Typography>
                    )}
                </>
            )}

            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell key={String(col.key)}>{col.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row, idx) => (
                        <TableRow key={idx}>
                            {columns.map((col) => (
                                <TableCell key={String(col.key)}>
                                    {col.render ? col.render(row) : row[col.key as keyof T]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}
export default DataTable