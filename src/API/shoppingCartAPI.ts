import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const shoppingCartAPI = createApi({
    reducerPath: "shoppingCartAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44363/api/",
        prepareHeaders: (headers: Headers, api) => {
            const token = localStorage.getItem("token")
            token && headers.append("Authorization", "Bearer " + token)
        }
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
            query: ({ menuItemId, updateQuantityBy, userId }) => ({
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