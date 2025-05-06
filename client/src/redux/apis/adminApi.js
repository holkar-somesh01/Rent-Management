import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/admin', credentials: "include" }),
    tagTypes: ['Tenant', 'Landlord', 'Payment', 'Property', 'User'],
    endpoints: (builder) => ({
        getAllTenants: builder.query({
            query: (userId) => ({
                url: '/get-all-tenants',
                method: 'GET',
                params: userId
            }),
            providesTags: ['Tenant'],
        }),
        getAllLandlords: builder.query({
            query: () => ({
                url: '/get-all-landlords',
                method: 'GET'
            }),
            providesTags: ['Landlord'],
        }),
        getPayments: builder.query({
            query: () => ({
                url: '/get-payment',
                method: 'GET'
            }),
            providesTags: ['Payment'],
        }),
        getProperties: builder.query({
            query: (data) => ({
                url: '/get-properties',
                method: 'GET',
                params: data
            }),
            providesTags: ['Property'],
        }),
        findUserById: builder.query({
            query: (id) => ({
                url: `/find-users-details/${id}`,
                method: 'GET'
            }),
            providesTags: ['User'],
        }),
        PropertyFindById: builder.query({
            query: (id) => ({
                url: `/find-property-details/${id}`,
                method: 'GET'
            }),
            providesTags: ['User'],
            transformResponse: data => data.result
        }),
        AddProperties: builder.mutation({
            query: (userData) => ({
                url: "/add-properties",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["admin"],
        }),
        updateProperties: builder.mutation({
            query: (userData) => ({
                url: `/update-properties/${userData.id}`,
                method: "PUT",
                body: userData.data,
            }),
            invalidatesTags: ["admin"],
        }),
        changeStatus: builder.mutation({
            query: (userData) => {
                console.log(userData)
                return {
                    url: `/change-status/${userData.id}`,
                    method: "PUT",
                    body: userData,
                }
            },
            invalidatesTags: ["admin"],
        }),
        deleteProperties: builder.mutation({
            query: (id) => ({
                url: `/delete-properties/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["admin"],
        }),
        DeleteLandlord: builder.mutation({
            query: (id) => ({
                url: `/delete-landlord/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["admin"],
        }),
    }),
});

export const {
    useGetAllTenantsQuery,
    useGetAllLandlordsQuery,
    useLazyGetAllLandlordsQuery,
    useGetPaymentsQuery,
    useGetPropertiesQuery,
    useFindUserByIdQuery,
    usePropertyFindByIdQuery,
    useAddPropertiesMutation,
    useUpdatePropertiesMutation,
    useDeletePropertiesMutation,
    useDeleteLandlordMutation,
    useChangeStatusMutation,
} = adminApi;