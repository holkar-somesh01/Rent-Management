import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const landlordApi = createApi({
    reducerPath: "landlordApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1", credentials: "include" }),
    tagTypes: ["landlord"],
    endpoints: (builder) => {
        return {
            registerTenant: builder.mutation({
                query: (userData) => ({
                    url: "/landlord/register-tenant",
                    method: "POST",
                    body: userData,
                }),
                invalidatesTags: ["landlord"],
                transformResponse: data => data.result
            }),
            getProfile: builder.query({
                query: (userId) => ({
                    url: `/landlord/get-profile/${userId}`,
                    method: 'GET',
                    params: userId
                }),
                transformResponse: data => data.result,
                providesTags: ['landlord'],
            }),
            getLandlordProperty: builder.query({
                query: (userId) => ({
                    url: `/landlord/get-landlord-property`,
                    method: 'GET',
                }),
                transformResponse: data => data.result,
                providesTags: ['landlord'],
            }),
            tenantDetails: builder.query({
                query: (userId) => ({
                    url: `/landlord/tenant-details/${userId}`,
                    method: 'GET',
                    // params: userId
                }),
                transformResponse: data => data.result,
                providesTags: ['landlord'],
            }),
            UpdateProfile: builder.mutation({
                query: (userId) => ({
                    url: `/landlord/update-profile/${userId.id}`,
                    method: 'PUT',
                    body: userId.formData
                }),
                transformResponse: data => data.result,
                providesTags: ['landlord'],
            }),
            UpdateTenant: builder.mutation({
                query: (userId) => ({
                    url: `/landlord/update-tenant/${userId._id}`,
                    method: 'PUT',
                    body: userId.formData
                }),
                transformResponse: data => data.result,
                providesTags: ['landlord'],
            }),
            getBookedProperty: builder.query({
                query: (userId) => ({
                    url: `/landlord/get-booked-property/${userId}`,
                    method: 'GET',
                }),
                transformResponse: data => data.result,
                providesTags: ['landlord'],
            }),
            getPayment: builder.query({
                query: (userId) => ({
                    url: `/landlord/get-payment`,
                    method: 'GET',
                }),
                transformResponse: data => data.result,
                providesTags: ['landlord'],
            }),
            getDashboardData: builder.query({
                query: (userId) => ({
                    url: `/landlord/dashboard-recent-activity`,
                    method: 'GET',
                }),
                transformResponse: data => data.result,
                providesTags: ['landlord'],
            }),
        }
    }
})

export const {
    useRegisterTenantMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUpdateTenantMutation,
    useTenantDetailsQuery,
    useGetLandlordPropertyQuery,
    useGetBookedPropertyQuery,
    useGetPaymentQuery,
    useGetDashboardDataQuery
} = landlordApi
