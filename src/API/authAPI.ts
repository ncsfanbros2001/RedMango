import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { url } from "inspector";

const authAPI = createApi({
    reducerPath: "authAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44363/api/"
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "auth/register",
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: userData
            })
        }),
        loginUser: builder.mutation({
            query: (userCredentials) => ({
                url: "auth/login",
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: userCredentials
            })
        })
    })
})

export const { useRegisterUserMutation, useLoginUserMutation } = authAPI

export default authAPI