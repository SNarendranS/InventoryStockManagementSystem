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
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, void>({
      query: () => "/product",
      providesTags: ["Products"],
    }),
    getProductsByCategory: builder.query<GetProductsResponse, { categoryid: number }>({
      query: ({ categoryid }) => `/product/category/${categoryid}`,
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "/product",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    getLowStockProducts: builder.query<GetProductsResponse, void>({
      query: () => "/product/stock/low",
      providesTags: ["Products"],
    }),
    editProduct: builder.mutation<any, { id: number; body: Partial<Product> }>({
      query: ({ id, body }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});


export const { useGetProductsQuery, useCreateProductMutation, useGetProductsByCategoryQuery, useGetLowStockProductsQuery,useEditProductMutation, useDeleteProductMutation } = productApi;
