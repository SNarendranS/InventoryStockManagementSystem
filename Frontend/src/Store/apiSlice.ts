import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";
import type { LoginRequest, LoginResponse } from "../Interfaces/IAuth";
import type { GetProductsResponse, Product } from "../Interfaces/IProduct";
import type { GetTransactionsResponse } from "../Interfaces/ITransaction";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).userToken.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
        }),
        getProducts: builder.query<GetProductsResponse, void>({
            query: () => "/product",
        }),

        createProduct: builder.mutation<Product, Partial<Product>>({
            query: (body) => ({
                url: "/product",
                method: "POST",
                body,
            }),
        }),
        getTransactions: builder.query<GetTransactionsResponse, void>({
            query: () => "/transaction",
        }),
    }),
});

export const {
    useLoginMutation,
    useGetProductsQuery,
    useCreateProductMutation,
    useGetTransactionsQuery
} = apiSlice;
