import React, { useMemo, useState } from "react";
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
  TextField,
  Pagination,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  icon?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  title?: string;
  count?: number;
  maxWidth?: number;

  /** Optional initial page size */
  defaultPageSize?: number;

  /** Page size options */
  pageSizeOptions?: number[];
}

function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  title,
  count,
  maxWidth = 1000,
  defaultPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50, 100],
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // ---- SEARCH FILTER ----
  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;

    const lower = search.toLowerCase();
    return rows.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(lower)
    );
  }, [search, rows]);

  // ---- PAGINATION ----
  const totalPages = Math.ceil(filteredRows.length / pageSize);

  const currentRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, page, pageSize]);

  return (
    <Box sx={{ width: "100%", maxWidth, margin: "0 auto", mb: 5 }}>
      <Card elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <CardContent sx={{ pb: 2 }}>
          {/* Title */}
          {title && (
            <>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
                {title}
              </Typography>
              {count !== undefined && (
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                  Total {title}: {count}
                </Typography>
              )}
            </>
          )}

          {/* Search + Page Size */}
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="Search…"
              size="small"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // reset page
              }}
              sx={{ flex: 1, background: "#f8f8f8ff" }}
            />

            <Select
              size="small"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              {pageSizeOptions.map((size) => (
                <MenuItem key={size} value={size}>
                  {size} / page
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </CardContent>

        <TableContainer sx={{ maxHeight: 400, borderTop: "1px solid #eee" }}>
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
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {currentRows.length > 0 ? (
                currentRows.map((row, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                      "&:hover": { backgroundColor: "#f1f5f9", cursor: "pointer" },
                    }}
                  >
                    {columns.map((col) => (
                      <TableCell key={String(col.key)}>
                        {col.icon ? col.icon(row) : (col.render ? col.render(row) : row[col.key])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} sx={{ textAlign: "center", py: 4 }}>
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {totalPages > 1 && <Box sx={{ py: 2, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages || 1}
            page={page}
            onChange={(_, p) => setPage(p)}
            color="primary"
            size="small"
          />
        </Box>}
      </Card>
    </Box>
  );
}

export default DataTable;
