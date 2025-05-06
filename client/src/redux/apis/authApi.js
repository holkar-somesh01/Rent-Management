import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1/auth",
        credentials: "include", // Ensures cookies are sent with requests
    }),
    tagTypes: ["auth"],
    endpoints: (builder) => ({
        registerAdmin: builder.mutation({
            query: (userData) => ({
                url: "/admin/register",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["auth"],
        }),
        loginAdmin: builder.mutation({
            query: (userData) => ({
                url: "/admin/login",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["auth"],
            transformResponse: (data) => {
                if (data?.result) {
                    localStorage.setItem("superAdmin", JSON.stringify(data.result));
                }
                return data.result;
            },
        }),
        logoutAdmin: builder.mutation({
            query: () => ({
                url: "/admin/logout",
                method: "POST",
            }),
            invalidatesTags: ["auth"],
            transformResponse: (data) => {
                localStorage.removeItem("superAdmin");
                return data.result;
            },
        }),
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/user/register",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["auth"],
            transformResponse: data => data.result
        }),
        loginUser: builder.mutation({
            query: (userData) => ({
                url: "/user/login",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["auth"],
            transformResponse: (data) => {
                if (data?.result) {
                    localStorage.setItem("user", JSON.stringify(data.result));
                }
                return data.result;
            },
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/user/logout",
                method: "POST",
            }),
            invalidatesTags: ["auth"],
            transformResponse: (data) => {
                localStorage.removeItem("user");
                return data.result;
            },
        }),
    }),
});

export const {
    useRegisterAdminMutation,
    useLoginAdminMutation,
    useLogoutAdminMutation,
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
} = authApi;








