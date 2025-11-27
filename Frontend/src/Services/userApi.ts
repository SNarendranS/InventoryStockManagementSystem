import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../Store/store";
import type { GetUserResponse, User, CreateUserPayload } from "../Interfaces/IUser";

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

  endpoints: (builder) => ({
    // GET all users
    getUsers: builder.query<GetUserResponse, void>({
      query: () => "/user",
    }),

    // GET user by manager ID
    getUsersByManager: builder.query<GetUserResponse, number>({
      query: (managerid) => `/user/manager/${managerid}`,
    }),


    // GET single user by id
    getUserById: builder.query<User, number>({
      query: (id) => `/user/${id}`,
    }),

    // CREATE a new user
    createUser: builder.mutation<User, CreateUserPayload>({
      query: (body) => ({
        url: "/user",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUsersByManagerQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
} = userApi;
