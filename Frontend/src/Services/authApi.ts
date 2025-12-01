import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../Store/store";
import type { LoginRequest, LoginResponse } from "../Interfaces/IAuth";
import type { CreateUserPayload, User } from "../Interfaces/IUser";

export const authApi = createApi({
  reducerPath: "authApi",
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
        registerUser: builder.mutation<User, CreateUserPayload>({
          query: (body) => ({
            url: "/auth/register",
            method: "POST",
            body,
          }),
        }),
  }),
});

export const { useLoginMutation,useRegisterUserMutation } = authApi;
