import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../Store/store";
import type { GetUserResponse, User } from "../Interfaces/IUser";
interface userRes{
  user: User
}
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
    //get all managers
    getManagers: builder.query<GetUserResponse, void>({
      query: () => "/user/manager",
    }),
    // GET user by manager ID
    getUsersByManager: builder.query<GetUserResponse, number>({
      query: (managerid) => `/user/manager/${managerid}`,
    }),


    // GET single user by id
    getUserById: builder.query<userRes, number>({
      query: (id) => `/user/id/${id}`,
    }),
        editUser: builder.mutation<
          any,
          { id: number; body: Partial<User> }
        >({
          query: ({ id, body }) => ({
            url: `/user/${id}`,
            method: "PUT", 
            body,
          }),
          // invalidatesTags: ["Products"], // invalidate relevant cache
        }),
    deleteUser: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
    })
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
