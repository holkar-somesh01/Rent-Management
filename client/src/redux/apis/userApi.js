import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`, credentials: "include" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            getProperty: builder.query({
                query: () => {
                    return {
                        url: "/get-property",
                        method: "GET"
                    }
                },
                providesTags: ["user"],
                transformResponse: data => data.result
            }),
            GetPropertyById: builder.query({
                query: (user) => {
                    return {
                        url: `/get-property-details/${user._id}`,
                        method: "GET"
                    }
                },
                providesTags: ["user"],
                transformResponse: data => data.result
            }),
            addUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/get-property",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["user"]
            }),


        }
    }
})

export const { useGetPropertyQuery, useGetPropertyByIdQuery } = userApi
