import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../Store/store";
import type { GetDemandSalesResponse, GetTransactionsResponse } from "../Interfaces/ITransaction";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userToken.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Transactions", "Products"],   // ⭐ Add this
  endpoints: (builder) => ({
    getTransactions: builder.query<GetTransactionsResponse, void>({
      query: () => "/transaction",
      providesTags: ["Transactions"],       // ⭐ Mark data source
    }),

    createTransaction: builder.mutation<any, { productid: number; type: "IN" | "OUT"; quantity: number; note?: string }>({
      query: (body) => ({
        url: "/transaction",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Transactions", "Products"],  // ⭐ Auto-refresh after mutation
    }),
    getRecentTransactionByType: builder.query<GetTransactionsResponse, { type: string; limit: number }>({
      query: ({ type, limit }) => `/transaction/recent/desc?type=${type}&limit=${limit}`,
    }),
    getDemandSalesTransactions: builder.query<GetDemandSalesResponse, void>({
  query: () => `/transaction/demand/sales`,
  transformResponse: (response: any) => ({
    count: response.count,
    transactions: response.transactions.map((t: any) => ({
      productid: t.productid,
      total_transactions: Number(t.total_transactions),
      total_quantity: Number(t.total_quantity),
      total_sales: t.total_sales,
      productName: t.product.productName,
      sku: t.product.sku,
      price: t.product.price,
    }))
  })
})
  })
})

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useGetDemandSalesTransactionsQuery,
  useGetRecentTransactionByTypeQuery
} = transactionApi;
