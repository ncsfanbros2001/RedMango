import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const orderAPI = createApi({
    reducerPath: "orderAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44363/api/",
        prepareHeaders: (headers: Headers, api) => {
            const token = localStorage.getItem("token")
            token && headers.append("Authorization", "Bearer " + token)
        }
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
            query: ({ userId, searchString, status, pageSize, pageNumber }) => ({
                url: "Order",
                params: {
                    ...(userId && { userId }),
                    ...(searchString && { searchString }),
                    ...(status && { status }),
                    ...(pageSize && { pageSize }),
                    ...(pageNumber && { pageNumber })
                }
            }),
            transformResponse(apiResponse: { result: any }, meta: any) {
                return {
                    apiResponse,
                    totalRecords: meta.response.headers.get("X-Pagination")
                }
            },
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