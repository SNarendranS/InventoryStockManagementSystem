import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../Store/store";
import type { GetUserResponse, User } from "../Interfaces/IUser";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userToken.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<GetUserResponse, void>({
      query: () => "/user",
      providesTags: ["Users"],
    }),
    getManagers: builder.query<GetUserResponse, void>({
      query: () => "/user/manager",
      providesTags: ["Users"],
    }),
    getUsersByManager: builder.query<GetUserResponse, number>({
      query: (managerid) => `/user/manager/${managerid}`,
      providesTags: ["Users"],
    }),
    getUserById: builder.query<{ user: User }, number>({
      query: (id) => `/user/id/${id}`,
      providesTags: ["Users"],
    }),
    editUser: builder.mutation<any, { id: number; body: Partial<User> }>({
      query: ({ id, body }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetManagersQuery,
  useGetUsersByManagerQuery,
  useGetUserByIdQuery,
  useEditUserMutation,
  useDeleteUserMutation
} = userApi;
