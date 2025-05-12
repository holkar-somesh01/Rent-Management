import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const premiumApi = createApi({
    reducerPath: "premiumApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL + "/api/v1/premium", credentials: "include" }),
    tagTypes: ["premium"],
    endpoints: (builder) => {
        return {
            getPremiumUsers: builder.query({
                query: () => {
                    return {
                        url: "/Get-Premium-Users",
                        method: "GET"
                    }
                },
                providesTags: ["premium"],
                transformResponse: data => data.result
            }),
            LandlordPremiumDetails: builder.query({
                query: () => {
                    return {
                        url: "/Landlord-Premium-Details",
                        method: "GET"
                    }
                },
                providesTags: ["premium"],
                transformResponse: data => data.result
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

export const {
    useLandlordPremiumDetailsQuery,
    useGetPremiumUsersQuery,
    useVerifyPremiumPaymentMutation,
    useCreatePremiumOrderMutation,
} = premiumApi
