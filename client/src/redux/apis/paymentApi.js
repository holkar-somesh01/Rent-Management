import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/payment' }),
    tagTypes: ['Payment'],
    endpoints: (builder) => ({
        getAllPayments: builder.query({
            query: () => ({
                url: '/get-all-payments',
                method: 'GET'
            }),
            providesTags: ['Payment'],
        }),
        getMonthlyPayment: builder.query({
            query: () => ({
                url: '/get-monthly-payment',
                method: 'GET'
            }),
            providesTags: ['Payment'],
        }),
        getPendingPayment: builder.query({
            query: () => ({
                url: '/get-pending-payment',
                method: 'GET'
            }),
            providesTags: ['Payment'],
        }),
        getPaymentById: builder.query({
            query: (id) => ({
                url: `/get-payment-details/${id}`,
                method: 'GET'
            }),
            providesTags: ['Payment'],
        }),
        addPayment: builder.mutation({
            query: (paymentData) => ({
                url: '/add-payment',
                method: 'POST',
                body: paymentData,
            }),
            invalidatesTags: ['Payment'],
        }),
        updatePayment: builder.mutation({
            query: ({ id, payload }) => ({
                url: `/update-payment/${id}`,
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: ['Payment'],
        }),
        softDeletePayment: builder.mutation({
            query: (id) => ({
                url: `/soft-delete-payment/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Payment'],
        }),
    }),
});

export const {
    useGetAllPaymentsQuery,
    useGetPaymentByIdQuery,
    useAddPaymentMutation,
    useUpdatePaymentMutation,
    useSoftDeletePaymentMutation,
    useGetMonthlyPaymentQuery,
    useGetPendingPaymentQuery
} = paymentApi;
