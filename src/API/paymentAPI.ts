import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const paymentAPI = createApi({
    reducerPath: "paymentAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44363/api/"
    }),
    endpoints: (builder) => ({
        initiatePayment: builder.mutation({
            query: (userId) => ({
                url: "payment",
                method: "POST",
                params: {
                    userId: userId
                }
            })
        })
    })
})

export const { useInitiatePaymentMutation } = paymentAPI

export default paymentAPI