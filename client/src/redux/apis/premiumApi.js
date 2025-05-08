import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const premiumApi = createApi({
    reducerPath: "premiumApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL + "/api/v1/premium", credentials: "include" }),
    tagTypes: ["premium"],
    endpoints: (builder) => {
        return {
            getUsers: builder.query({
                query: () => {
                    return {
                        url: "/",
                        method: "GET"
                    }
                },
                providesTags: ["premium"]
            }),
            createPremiumOrder: builder.mutation({
                query: userData => {
                    return {
                        url: "/order",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["premium"]
            }),
            verifyPremiumPayment: builder.mutation({
                query: userData => {
                    return {
                        url: "/verify",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["premium"]
            }),

        }
    }
})

export const { useGetUsersQuery, useVerifyPremiumPaymentMutation, useCreatePremiumOrderMutation, } = premiumApi
