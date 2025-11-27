import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../Store/store";
import type { GetProductsResponse, Product } from "../Interfaces/IProduct";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userToken.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, void>({
      query: () => "/product",
    }),
    getProductsByCategory: builder.query<GetProductsResponse, { categoryid: number }>({
      query: ({ categoryid }) => `/product/category/${categoryid}`,
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "/product",
        method: "POST",
        body,
      }),
    }),
    getLowStockProducts: builder.query<GetProductsResponse, void>({
      query: () => "/product/stock/low"
    }),
    deleteProduct: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
    })
  }),
});

export const { useGetProductsQuery, useCreateProductMutation, useGetProductsByCategoryQuery, useGetLowStockProductsQuery ,useDeleteProductMutation} = productApi;
