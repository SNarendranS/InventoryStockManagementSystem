import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  title?: string;
  count?: number;
  maxWidth?: number;
}

function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  title,
  count,
  maxWidth = 1000,
}: DataTableProps<T>) {
  return (
    <Box sx={{ width: "100%", maxWidth, margin: "0 auto", mb: 5 }}>
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent sx={{ pb: 2 }}>
          {title && (
            <>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 0.5 }}>
                {title}
              </Typography>
              {count !== undefined && (
                <Typography variant="subtitle2" color="text.secondary">
                  Total {title}: {count}
                </Typography>
              )}
            </>
          )}
        </CardContent>

        <TableContainer
          sx={{
            maxHeight: 400,
            borderTop: "1px solid #eee",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={String(col.key)}
                    sx={{
                      backgroundColor: "#f4f6f8",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      "&:hover": { cursor: "pointer" },
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.length > 0 ? (
                rows.map((row, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                      "&:hover": { backgroundColor: "#f1f5f9", cursor: "pointer" },
                    }}
                  >
                    {columns.map((col) => (
                      <TableCell key={String(col.key)}>
                        {col.render ? col.render(row) : row[col.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    sx={{
                      textAlign: "center",
                      py: 4,
                      color: "text.secondary",
                    }}
                  >
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

export default DataTable;