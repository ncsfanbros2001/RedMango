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
                url: "Order",
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: orderDetails
            }),
            invalidatesTags: ["Orders"]
        }),
        getAllOrders: builder.query({
            query: (userId) => ({
                url: "Order",
                params: {
                    userId: userId
                }
            }),
            providesTags: ["Orders"]
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `Order/${id}`
            }),
            providesTags: ["Orders"]
        }),
        updateOrderHeader: builder.mutation({
            query: (orderDetails) => ({
                url: "Order/" + orderDetails.orderHeaderId,
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: orderDetails
            }),
            invalidatesTags: ["Orders"]
        })
    })
})

export const { useCreateOrderMutation, useGetAllOrdersQuery, useGetOrderDetailsQuery, useUpdateOrderHeaderMutation } = orderAPI

export default orderAPI