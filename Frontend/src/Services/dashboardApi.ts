import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../Store/store";
import type { GetProductsResponse } from "../Interfaces/IProduct";
import type { GetTransactionsResponse } from "../Interfaces/ITransaction";

export interface DashboardSummary {
    productCount: number;
    categoryCount: number;
    lowStock: number;
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
    endpoints: (builder) => ({
        getDashboardSummary: builder.query<DashboardSummary, void>({
            query: () => "/dashboard/summary",
            transformResponse: (response: any) => ({
                productCount: response.productCount,
                categoryCount: response.categoryCount,
                lowStock: response.lowStock,
                salesCount: response.salesCount,
                newStockCount: response.newStockCount,
                totalSales: Number(response.totalSales.totalSales),
                totalPurchase: Number(response.totalPurchase.totalPurchase),
            }),
        }),
        getLowStockProducts: builder.query<GetProductsResponse, void>({
            query: () => "/product/stock/low"
        }),
         getRecentTransactionByType: builder.query<GetTransactionsResponse, { type: string; limit: number }>({
            query: ({type,limit}) => `/transaction/recent/desc?type=${type}&limit=${limit}`,
            
        }),
    }),
});

export const { useGetDashboardSummaryQuery, useGetLowStockProductsQuery,useGetRecentTransactionByTypeQuery } = dashboardApi;