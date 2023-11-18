import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const { NEXT_PUBLIC_SERVER_API_URL } = process.env;

/*export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8881/api/" }),
  endpoints: (builder) => ({
    getProductBySlug: builder.query({
      query: (slug) =>
        `products?slug=pens-pencils%2Fpens-plastic%2Fbic-clic-stic-pen`,
    }),
  }),
});*/

const baseUrl = "https://logo01001-559a553141ed.herokuapp.com/api";

const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `/users`,
    }),
    setNewUser: builder.mutation({
      query: ({ body }) => ({
        url: `/users`,
        method: "POST",
        body,
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/sessions/${id}`,
        method: "DELETE",
      }),
    }),
    setNewSession: builder.mutation({
      query: ({ body }) => ({
        url: `/sessions`,
        method: "POST",
        body,
      }),
    }),
    getSessionById: builder.query({
      query: (id) => `/sessions/${id}`,
    }),
    editSessionById: builder.mutation({
      query: ({ id, body }) => ({
        url: `/sessions/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteSessionById: builder.mutation({
      query: ({ id }) => ({
        url: `/sessions/${id}`,
        method: "DELETE",
      }),
    }),

    // Members
    getMembersList: builder.query({
      query: () => `/members`,
    }),
    postNewMember: builder.mutation({
      query: ({ body }) => ({
        url: `/members`,
        method: "POST",
        body,
      }),
    }),

    // Attempts
    getAttemptById: builder.query({
      query: (id) => `/attempts/${id}`,
    }),
    postNewAttempt: builder.mutation({
      query: ({ body }) => ({
        url: `/attempts`,
        method: "POST",
        body,
      }),
    }),

    // Members_selects
    postMembersSelects: builder.mutation({
      query: ({ body }) => ({
        url: `/members_selects`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useSetNewUserMutation,
  useDeleteUserMutation,
  useSetNewSessionMutation,
  useGetSessionByIdQuery,
  useEditSessionByIdMutation,
  useDeleteSessionByIdMutation,
  useGetMembersListQuery,
  usePostNewMemberMutation,
  useGetAttemptByIdQuery,
  usePostNewAttemptMutation,
  usePostMembersSelectsMutation,
} = dataApi;
export default dataApi;
