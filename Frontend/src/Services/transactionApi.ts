import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../Store/store";
import type { GetDemandSalesResponse, GetTransactionsResponse, TransactionType } from "../Interfaces/ITransaction";

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
  tagTypes: ["Transactions", "Products"], // needed for auto refresh
  endpoints: (builder) => ({

    getTransactions: builder.query<GetTransactionsResponse, void>({
      query: () => "/transaction",
      providesTags: ["Transactions"],
    }),

    createTransaction: builder.mutation({
      query: (body) => ({
        url: "/transaction",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Transactions", "Products"],
    }),

    getRecentTransactionByType: builder.query({
      query: ({ type, limit }) =>
        `/transaction/recent/desc?type=${type}&limit=${limit}`,
    }),

    getDemandSalesTransactions: builder.query({
      query: () => "/transaction/demand/sales",
    }),

    editTransaction: builder.mutation({
      query: ({ id, body }) => ({
        url: `/transaction/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Transactions", "Products"],
    }),

    deleteTransaction: builder.mutation({
      query: ({ id }) => ({
        url: `/transaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transactions"],
    }),

  }),
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useGetDemandSalesTransactionsQuery,
  useGetRecentTransactionByTypeQuery,
  useEditTransactionMutation,
  useDeleteTransactionMutation
} = transactionApi;