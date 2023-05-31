import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const menuItemAPI = createApi({
    reducerPath: "menuItemAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44363/api/"
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
        })
    })
})

export const { useGetMenuItemsQuery, useGetMenuItemByIdQuery } = menuItemAPI

export default menuItemAPI