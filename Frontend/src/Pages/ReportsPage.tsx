import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Stack,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { useGetProductsQuery } from "../Services/productApi";
import { useGetCategoriesQuery } from "../Services/categoryApi";
import { useGetTransactionsQuery } from "../Services/transactionApi";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#A569BD", "#5DADE2", "#48C9B0", "#F4D03F",
  "#DC7633", "#EC7063", "#AF7AC5", "#5499C7",
  "#48C9B0", "#F5B041", "#EB984E", "#F1948A",
  "#7FB3D5", "#76D7C4", "#F9E79F", "#EDBB99"
];

export default function ReportsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: products, isLoading: productsLoading } = useGetProductsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: transactions } = useGetTransactionsQuery();

  if (productsLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const categoryCounts =
    categories?.categories.map((cat) => ({
      name: cat.categoryName,
      value: products?.products.filter((p) => p.categoryid === cat.categoryid)
        .length,
    })) || [];

  const productTransactionMap: Record<string, number> = {};
  transactions?.transactions.forEach((t) => {
    const pname = t.product.productName;
    productTransactionMap[pname] =
      (productTransactionMap[pname] || 0) + t.quantity;
  });

  const transactionBarData = Object.entries(productTransactionMap).map(
    ([productName, qty]) => ({ productName, qty })
  );

  const salesTrend =
    transactions?.transactions.map((t) => ({
      date: new Date(t.createdAt).toLocaleDateString(),
      qty: t.quantity,
    })) || [];

  return (
    <Box p={isMobile ? 1.5 : 3} sx={{width:"75%"}}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        📊 Reports & Analytics
      </Typography>

      {/* Use Stack instead of Grid for responsive layout */}
      <Stack spacing={isMobile ? 2 : 3}>
        {/* PIE CHART */}
        <Card>
          <CardContent>
            <Typography fontWeight={600} mb={2}>
              Products by Category
            </Typography>
            <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
              <PieChart>
                <Pie
                  data={categoryCounts}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={isMobile ? 80 : 120}
                  label
                >
                  {categoryCounts.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* BAR CHART */}
        <Card>
          <CardContent>
            <Typography fontWeight={600} mb={2}>
              Transactions Quantity by Product
            </Typography>
            <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
              <BarChart data={transactionBarData}>
                <XAxis
                  dataKey="productName"
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  interval={0}
                  angle={isMobile ? -30 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="qty" fill="#509709" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* LINE CHART */}
        <Card>
          <CardContent>
            <Typography fontWeight={600} mb={2}>
              Sales Trend Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
              <LineChart data={salesTrend}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  interval={0}
                />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="qty" stroke="#1976d2" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
