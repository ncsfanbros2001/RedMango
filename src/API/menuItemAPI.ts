import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const menuItemAPI = createApi({
    reducerPath: "menuItemAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44363/api/",
        prepareHeaders: (headers: Headers, api) => {
            const token = localStorage.getItem("token")
            token && headers.append("Authorization", "Bearer " + token)
        }
    }),
    tagTypes: ["MenuItems"],
    endpoints: (builder) => ({
        getMenuItems: builder.query({
            query: () => ({
                url: "menuItem"
            }),
            providesTags: ["MenuItems"]
        }),
        getMenuItemById: builder.query({
            query: (id) => ({
                url: `menuItem/${id}`
            }),
            providesTags: ["MenuItems"]
        }),
        updateMenuItem: builder.mutation({
            query: ({ data, id }) => ({
                url: "menuItem/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["MenuItems"]
        }),
        createMenuItem: builder.mutation({
            query: (data) => ({
                url: "menuItem",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["MenuItems"]
        }),
        deleteMenuItem: builder.mutation({
            query: (id) => ({
                url: "menuItem/" + id,
                method: "DELETE"
            }),
            invalidatesTags: ["MenuItems"]
        })
    })
})

export const { useGetMenuItemsQuery, useGetMenuItemByIdQuery, useCreateMenuItemMutation, useUpdateMenuItemMutation,
    useDeleteMenuItemMutation } = menuItemAPI

export default menuItemAPI