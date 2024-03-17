import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { REACT_APP_API_URL_DEV, REACT_APP_API_URL_PROD } = process.env;

console.log("REACT_APP_API_URL", process.env);

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

// const baseUrl = "https://logo01001-559a553141ed.herokuapp.com/api";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? REACT_APP_API_URL_PROD
    : REACT_APP_API_URL_DEV;

const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().data;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // Auth
    authUsers: builder.mutation({
      query: ({ body }) => ({
        url: `/auth/signin`,
        method: "POST",
        body,
      }),
    }),

    // Users
    getAllUsers: builder.query({
      query: () => `/users`,
    }),
    getUserById: builder.query({
      query: ({ userId }) => `/users/${userId}`,
    }),
    setNewUser: builder.mutation({
      query: ({ body }) => ({
        url: `/users`,
        method: "POST",
        body,
      }),
    }),
    editUser: builder.mutation({
      query: ({ userId, body }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body,
      }),
    }),
    // deleteUser: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `/sessions/${id}`,
    //     method: "DELETE",
    //   }),
    // }),

    // Sessions
    getSessionsList: builder.query({
      query: ({ page, size }) => `/sessions/page?page=${page}&size=${size}`,
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
    getAttemptBySessionId: builder.query({
      query: ({ sessionId }) => `/attempts/session/${sessionId}`,
    }),

    // Members_selects
    postMembersSelects: builder.mutation({
      query: ({ body }) => ({
        url: `/members_selects`,
        method: "POST",
        body,
      }),
    }),

    getMembersSelectsBySessionId: builder.query({
      query: (sessionId) => `/members_selects/session/${sessionId}`,
    }),
  }),
});

export const {
  useAuthUsersMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useSetNewUserMutation,
  useEditUserMutation,
  useGetSessionsListQuery,
  useSetNewSessionMutation,
  useGetSessionByIdQuery,
  useEditSessionByIdMutation,
  useDeleteSessionByIdMutation,
  useGetMembersListQuery,
  usePostNewMemberMutation,
  useGetAttemptByIdQuery,
  useGetAttemptBySessionIdQuery,
  usePostNewAttemptMutation,
  usePostMembersSelectsMutation,
  useGetMembersSelectsBySessionIdQuery,
} = dataApi;
export default dataApi;
