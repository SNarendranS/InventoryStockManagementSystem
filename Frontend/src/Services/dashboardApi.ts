import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../Store/store";

export interface DashboardSummary {
    productCount: number;
    categoryCount: number;
    lowStock: number;
    topSeller: string;
    salesCount: number;
    newStockCount: number;
    totalSales: number;
    totalPurchase: number;
}

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userToken.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Dashboard"],
  endpoints: (builder) => ({
    getDashboardSummary: builder.query<DashboardSummary, void>({
      query: () => "/dashboard/summary",
      transformResponse: (response: any) => ({
        productCount: response.productCount,
        categoryCount: response.categoryCount,
        lowStock: response.lowStock,
        topSeller: response.topSeller?.product?.productName,
        salesCount: response.salesCount,
        newStockCount: response.newStockCount,
        totalSales: Number(response.totalSales.totalSales),
        totalPurchase: Number(response.totalPurchase.totalPurchase),
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardSummaryQuery } = dashboardApi;