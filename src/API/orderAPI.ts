import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const orderAPI = createApi({
    reducerPath: "orderAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44363/api/"
    }),
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderDetails) => ({
                url: "order",
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: orderDetails
            })
        }),
        getAllOrders: builder.query({
            query: (userId) => ({
                url: "order",
                params: {
                    userId: userId
                }
            }),
            providesTags: ["Orders"]
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `order/${id}`
            }),
            providesTags: ["Orders"]
        })
    })
})

export const { useCreateOrderMutation, useGetAllOrdersQuery, useGetOrderDetailsQuery } = orderAPI

export default orderAPI