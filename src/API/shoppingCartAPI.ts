import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { url } from "inspector";

const shoppingCartAPI = createApi({
    reducerPath: "shoppingCartAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44363/api/"
    }),
    tagTypes: ["ShoppingCarts"], 
    endpoints: (builder) => ({
        getShoppingCart: builder.query({
            query: (userId) => ({
                url: "ShoppingCart",
                params: {
                    userId: userId
                }
            }),
            providesTags: ["ShoppingCarts"]
        }),
        updateShoppingCart: builder.mutation({
            query: ({menuItemId, updateQuantityBy, userId}) => ({
                url: "ShoppingCart",
                method: "POST",
                params: {
                    menuItemId, updateQuantityBy, userId
                }
            }),
            invalidatesTags: ["ShoppingCarts"]
        })
    })
})

export const { useGetShoppingCartQuery, useUpdateShoppingCartMutation } = shoppingCartAPI

export default shoppingCartAPI