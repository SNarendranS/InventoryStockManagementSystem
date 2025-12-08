import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../Store/store";
import type { GetCategoryResponse, Category } from "../Interfaces/ICategory";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userToken.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<GetCategoryResponse, void>({
      query: () => "/category",
      providesTags: [{ type: "Category", id: "LIST" }],
    }),

    createCategory: builder.mutation<Category, Partial<Category>>({
      query: (body) => ({
        url: "/category",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } = categoryApi;